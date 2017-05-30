var express = require('express')
var session = require('express-session')
var app = express()
var connection = require('./hive-sql.js')
var courseQueryPrepare = require('./utilities/courseQueryPrepare.js')
var queryCallbacks = require('./utilities/queryCallbacks.js')
var gradeQueries = require('./components/Mastery/utilities/gradeQueries2.js')
var bdrQueries = require('./components/BDRs/utilities/bdrQueries.js')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var passportConfig = require('./utilities/passportConfig.js')
var passport = passportConfig.passport



  app.use(bodyParser.json())
  app.use(cookieParser)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({ secret: Math.random().toString(), resave: true, saveUninitialized: true }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use('/public',express.static('public'))
  
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://jaredasutton.com:3000')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
  })


  




app.get('/', function (req, res) {
    console.log(req)
    if(req.user){console.log('got a user')
    console.log(req.user.emailID)
      res.sendFile(__dirname + "/public/index.html")
    }
    else{res.sendFile(__dirname + '/public/img/google_signin_buttons/btn_google_signin_dark_normal_web.png')}
})


app.get('/bdrs/:queryStr',function(req, res) {
  connection.query(bdrQueries(req.params.queryStr.split("n")).query,queryCallbacks.default(req,res))
})

app.get('/users',function(req, res){
  if(req.user){console.log('user request from:')
    console.log(req.user)
    res.send(JSON.stringify([req.user]))
  }
  //connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
  //connection.query('SELECT * FROM userDirectory where emailID REGEXP ' + req.user,usersQueryCallback(req,res))
})

app.get('/mastery/:courseStr',function(req,res){
  var queries = gradeQueries(connection.escape(req.params.courseStr))
  connection.query([queries.studentRatingQuery, queries.studentBulkQuery].join("; "),queryCallbacks.mastery(req,res,req.params.courseStr))
})

app.get('/mymastery',function(req,res){
  if(req.user){
    console.log('mastery request from:')
    console.log(req.user)
    var courseStr = req.user.courseStr.replace(/[at]/,"s").replace(/[0]/g,".")
    var queries = gradeQueries(connection.escape(courseStr))
    console.log(queries)
    connection.query([queries.studentRatingQuery, queries.studentBulkQuery].join("; "),queryCallbacks.mastery(req,res,courseStr))
  }  else{res.send("[,,,]")}
})

app.get('/mybdrs',function(req, res) {
  if(req.user){
    console.log('bdr request from:')
    console.log(req.user)
    connection.query(bdrQueries(req.user.entryID.toString().split("n")).query,queryCallbacks.default(req,res))
  } else {res.send("[]")}
}
)


app.get('/los/:courseQueryStr',function(req, res){
  console.log('SELECT * FROM LOs WHERE courseStr REGEXP ' + req.params.courseQueryStr.toString())
  connection.query('SELECT * FROM LOs WHERE courseStr REGEXP \'' + req.params.courseQueryStr.toString() + '\'', queryCallbacks.default(req,res))
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







app.get('/authd',
  passport.authenticate('google', { scope: ['email'] }));
  
app.get('/authd/callback', 
  passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login',failureFlash: true }))
  

  
app.get('/login', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})