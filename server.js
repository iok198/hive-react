var express = require('express')
var session = require('express-session')
var app = express()
var connection = require('./hive-sql.js')
var courseQueryPrepare = require('./utilities/courseQueryPrepare.js')
var gradeQueries = require('./components/Mastery/utilities/gradeQueries2.js')
var bdrQueries = require('./components/BDRs/utilities/bdrQueries.js')
var bodyParser = require('body-parser')

var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var googPassCred = require('./googPassCred.js')



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({ secret: 'anything' }))
app.use(passport.initialize());
app.use(passport.session());
app.use('/public',express.static('public'))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://jaredasutton.com:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
    if(req.user){console.log('got a user')
    console.log(req.user.emailID)
      res.sendFile(__dirname + "/public/index.html")
    }
    else{res.send("Please login.")}
})

function defaultQueryCallback(req,res){
  return function (err,rsl,fds){
    if(err){console.log(err)}
    res.send(JSON.stringify(rsl))
}
}

function masteryQueryCallback(req,res,courseStr){
  return function (err,rsl,fds){
    if(err){console.log(err)}
    rsl.push(courseStr)
    res.send(JSON.stringify(rsl))
}
}

function usersQueryCallback(req,res){
  return function (err,rsl,fds){
    if(err) console.log(err);
    rsl[0].stuCourseQuObj = courseQueryPrepare(rsl[0])
    var courseQuery = JSON.stringify(rsl[0].stuCourseObj)
    
    var rslStr = JSON.stringify(rsl)
    res.writeHead(200, {
    'Content-Length': Buffer.byteLength(rslStr),
    'Content-Type': 'text/plain' })
    res.write(rslStr)
    /* res.write(courseQuery) */

  res.end()
}
}

app.get('/bdrs/:queryStr',function(req, res) {
  connection.query(bdrQueries(req.params.queryStr.split("n")).query,defaultQueryCallback(req,res))
})

app.get('/users/',function(req, res){
  if(req.user){console.log('got a user')
    console.log(req.user)}
  connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
  //connection.query('SELECT * FROM userDirectory where emailID REGEXP ' + req.user,usersQueryCallback(req,res))
})

app.get('/mastery/:courseStr',function(req,res){
  var queries = gradeQueries(connection.escape(req.params.courseStr))
  connection.query([queries.studentRatingQuery, queries.studentBulkQuery].join("; "),masteryQueryCallback(req,res,req.params.courseStr))
})

app.get('/mymastery',function(req,res){
  if(req.user){
    console.log(req.user)
    var courseStr = req.user.courseStr.replace(/[at]/,"s").replace(/[0]/g,".")
    var queries = gradeQueries(connection.escape(courseStr))
    console.log(queries)
    connection.query([queries.studentRatingQuery, queries.studentBulkQuery].join("; "),masteryQueryCallback(req,res,courseStr))
  }  else(res.send("[,,,]"))
})

app.get('/mybdrs',function(req, res) {
  connection.query('SELECT b.*, CONCAT(u.firstName, " ", u.lastName) as studentName, CONCAT(u2.title, " ", u2.lastName) as staffName FROM bdrs b JOIN userDirectory u ON b.studentUDID=u.entryID JOIN userDirectory u2 ON b.staffUDID=u2.entryID WHERE (b.staffUDID IN ( 1 ) )',defaultQueryCallback(req,res))
}
)

app.get('/mymastery',function(req,res){
  if(req.user){
    console.log(req.user)
    var courseStr = req.user.courseStr.replace(/[at]/,"s").replace(/[0]/g,".")
    var queries = gradeQueries(connection.escape(courseStr))
    console.log(queries)
    connection.query([queries.studentRatingQuery, queries.studentBulkQuery].join("; "),masteryQueryCallback(req,res,courseStr))
  }  else(res.send("[,,,]"))
})


app.get('/los/:courseQueryStr',function(req, res){
  console.log('SELECT * FROM LOs WHERE courseStr REGEXP ' + req.params.courseQueryStr.toString())
  connection.query('SELECT * FROM LOs WHERE courseStr REGEXP \'' + req.params.courseQueryStr.toString() + '\'', defaultQueryCallback(req,res))
})



app.post("/sendgrades",function(req,res){
    console.log(req.body)
    var reqjson = req.body
    if(reqjson.hasOwnProperty("string") && reqjson.hasOwnProperty("assessRatingID")){
    connection.query('UPDATE hive1617.assessmentRatings SET ratings = ? WHERE entryID = ?', [reqjson.string,reqjson.assessRatingID], function (error, results, fields) {
    if (error) throw error;
    
    })}
    res.send(JSON.stringify(req.body))
  
  }
)




function extractProfile (profile) {
  var imageUrl = '';
  if (profile.photos && profile.photos[0] && profile.photos[0].value) {
    imageUrl = profile.photos[0].value
  }
  return {
    id: profile.id,
    email: profile.emails[0].value,
    image: imageUrl
  };
}
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy(googPassCred,
  function(accessToken, refreshToken, profile, done) {
       console.log(extractProfile(profile))
       console.log("SELECT * FROM hive1617.userDirectory WHERE emailID REGEXP " + "'" + profile.emails[0].value +  + "' OR altEmailStr REGEXP '" + profile.emails[0].value + "'")
       connection.query("SELECT * FROM hive1617.userDirectory WHERE emailID REGEXP " + "'" + profile.emails[0].value + "' OR altEmailStr REGEXP '" + profile.emails[0].value + "'",
       function (err,rsl,fds){
         //done(err,rsl[0])
         if(err) throw err
         if(rsl.length > 0){
         console.log(rsl)
         done(null,rsl[0])} else { done(null,extractProfile(profile))}
         
       })
       
       
  }
))

app.get('/authd',
  passport.authenticate('google', { scope: ['email'] }));
  
app.get('/authd/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  })
  
passport.serializeUser(function(user, done) {
  done(null, user.entryID)
});

passport.deserializeUser(function(entryID, done) {
  connection.query('SELECT * FROM userDirectory where entryID=' + entryID,function (err,userArr) {
    if(err) throw err
    done(null,userArr[0])
    
  })
})
  
app.get('/login', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})