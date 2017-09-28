var express = require('express')
var session = require('express-session')
var app = express()
var connection = require('./hive-sql.js')
var courseQueryPrepare = require('./utilities/courseQueryPrepare.js')
var queryCallbacks = require('./utilities/queryCallbacks.js')
var gradeQueries = require('./components/Mastery/utilities/gradeQueries2b.js')
var bdrQueries = require('./components/BDRs/utilities/bdrQueries.js')
var assessGradeQueries = require('./components/Mastery/utilities/assessGradeQueries.js')
//var parseAssessment = require('./components/Mastery/utilities/parseAssessment.js')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var passportConfig = require('./utilities/passportConfig.js')
var passport = passportConfig.passport

app.use(function (req, res, next) {
  console.log(req.originalUrl)
  next()
})

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


  app.use(bodyParser.json())
  //app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
  secret: 'cris1s',
  resave: true,
  saveUninitialized: true
}))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use('/public',express.static('public'))
  app.use('/public/img',express.static(__dirname +  'public/img'))

passportConfig.strategyConfig(connection)
passport.serializeUser(function(user, done) {
    console.log(user)
    console.log('userrrr')
    done(null, user.emailID)
  }
)
passport.deserializeUser(function(emailID,done){
    passportConfig.queryUD(connection,emailID,done,{})()
  }
)
  




app.get('/', function (req, res) {
    //console.log(req)
    if(req.user){console.log('got a user')
    console.log(req.user.emailID)
      //res.send(req.session)
      //res.redirect('/users')
      switch(req.user.courseStr.substring(0,1)){
        case 't':
          res.sendFile(__dirname + '/public/index.html')
          break
        default:
          res.sendFile(__dirname + '/public/index.html')
          //res.send(doggo)
      }
    }
    else{res.sendFile(__dirname + '/public/img/google_signin_buttons/btn_google_signin_dark_normal_web.png')}
})

app.get('/bdrsplusc/:queryStr',function(req, res) {
  if(req.user && req.user.courseStr.substring(0,1) != 's'){
    var query = [bdrQueries(req.params.queryStr.split("n")).query,'select bc.*, u.title, u.lastName from hive1718.bdrComments bc left join hive1718.userDirectory u on bc.commenterID=u.entryID where bc.bdrID in (select entryID from hive1718.bdrs where staffUDID in (' + req.params.queryStr.split("n").join(", ") + ') or studentUDID in (' + req.params.queryStr.split("n").join(", ") + '))'].join("; ")
    connection.query(query,queryCallbacks.default(req,res))}
  else if (req.user && req.user.courseStr.substring(0,1) == 's'){
    var queryS = [bdrQueries(req.params.queryStr.split("n")).queryS,'select bc.*, u.title, u.lastName from hive1718.bdrComments bc left join hive1718.userDirectory u on bc.commenterID=u.entryID where bc.bdrID in (select entryID from hive1718.bdrs where staffUDID in (' + req.params.queryStr.split("n").join(", ") + ') or studentUDID in (' + req.params.queryStr.split("n").join(", ") + '))'].join("; ")
    connection.query(queryS,queryCallbacks.default(req,res))}
  else {res.send('[]')}
  }
  
)

app.get('/bdrs/:queryStr',function(req, res) {
  console.log(bdrQueries(req.params.queryStr.split("n")))
  connection.query(bdrQueries(req.params.queryStr.split("n")).query,queryCallbacks.default(req,res))
})

app.get('/swips/:threshold',function(req,res){
  var ops = {'lt':'<','le':'<=','eq':'=','ge':'>=','gt':'>'}
  var op = req.params.threshold.substring(0,2)
  var num = req.params.threshold.substring(2)
  var threshold = ops[op] + num
  var addlcon = ""
  connection.query('SELECT concat(u.title," ",u.lastName) name, u.classNo classNo, IF(s.SWIPS,s.SWIPS,20) AS swips, u.entryID stuUDID '
        + 'FROM hive1718.userDirectory AS u '
        + 'LEFT JOIN ( SELECT studentUDID, (20 - SUM(CASE WHEN ((swipCode >= 1)) THEN swipCode ELSE 0 END)) as SWIPS FROM hive1718.bdrs GROUP BY hive1718.bdrs.studentUDID ) as s '
        + 'ON u.entryID=s.studentUDID '
        + 'WHERE ( (u.courseStr REGEXP \'s\') AND ((s.SWIPS' + threshold + ') OR IF(20' + threshold +',ISNULL(s.SWIPS),FALSE)) ) ' + addlcon + ' ORDER BY u.classNo, u.lastName ', queryCallbacks.default(req,res))
})

app.get('/users',function(req, res){
  if(req.user){console.log('user request from:')
    console.log(req.user)
    res.send(JSON.stringify([req.user]))
  }
  //connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
  //connection.query('SELECT * FROM userDirectory where emailID REGEXP ' + req.user,usersQueryCallback(req,res))
})

app.get('/users/:udid',function(req, res){
  if(req.user){console.log('user request from:')
    console.log(req.user)
    connection.query('SELECT * FROM hive1718.userDirectory where entryID in (' + req.params.udid.replace(/n/g,',') + ')',queryCallbacks.default(req,res,req.params.udid))
  }
  //connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
  //connection.query('SELECT * FROM userDirectory where emailID REGEXP ' + req.user,usersQueryCallback(req,res))
})

app.get('/allstudents',function(req, res){
  if(req.user){console.log('user request from:')
    console.log(req.user)
    connection.query('SELECT concat(title,\' \',lastName) as name, entryID, concat(emailID,\', \',IFNULL(altEmailStr,\'\')) as emails FROM hive1718.userDirectory where courseStr REGEXP \'s\'',queryCallbacks.default(req,res,req.params.udid))
  }
  //connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
  //connection.query('SELECT * FROM userDirectory where emailID REGEXP ' + req.user,usersQueryCallback(req,res))
})

app.get('/coursestudents/:courseStr', function(req, res){
  if(req.user){console.log('user request from:')
    console.log(req.user)
    connection.query('SELECT concat(title,\' \',lastName) as name, entryID, concat(emailID,\', \',IFNULL(altEmailStr,\'\')) as emails FROM hive1718.userDirectory where courseStr REGEXP ?',[req.params.courseStr],queryCallbacks.default(req,res,req.params.courseStr))
  }
  //connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
  //connection.query('SELECT * FROM userDirectory where emailID REGEXP ' + req.user,usersQueryCallback(req,res))
}) //need to leverage to populate assessmentratings

app.get('/mentees/:udid',function(req, res){
  if(req.user){console.log('mentee request from:')
    console.log(req.user)
    connection.query('SELECT * FROM hive1718.userDirectory where mentoringStr=' + req.params.udid,queryCallbacks.default(req,res,req.params.udid))
  }
  //connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
  //connection.query('SELECT * FROM userDirectory where emailID REGEXP ' + req.user,usersQueryCallback(req,res))
})

app.get('/goals/:udid',function(req,res){
  if(req.user){console.log('goal request from:')
    console.log(req.user.emailID)
    connection.query('SELECT * FROM hive1718.goals where studentUDID=' + req.params.udid,queryCallbacks.default(req,res,req.params.udid))
  }
})

app.get('/goalsplusc/:udid',function(req,res){
  if(req.user){console.log('goal & comments request from:')
    console.log(req.user.emailID)
    connection.query('SELECT * FROM hive1718.goals where studentUDID=' + req.params.udid + ' order by entryID desc; SELECT gc.*, u.title,u.lastName FROM hive1718.goalComments gc left join hive1718.userDirectory u on gc.commenterUDID=u.entryID where gc.goalID in (SELECT entryID from hive1718.goals where studentUDID=' + req.params.udid+ ' order by entryID desc);',queryCallbacks.default(req,res,req.params.udid))
  }
})

app.get(['/mastery/:courseStr','/mastery/:courseStr/:stuUDID'],function(req,res){
  if(req.user && req.user.courseStr.substring(0,1) != 's'){
    if(!!req.params.stuUDID && !!req.params.courseStr){
      var stuUDID = req.params.stuUDID
      var queries = gradeQueries(connection.escape(req.params.courseStr),connection.escape(stuUDID))
      connection.query(["SET @@group_concat_max_len = 8000",queries.studentRatingQuery, queries.studentBulkQuery].join("; "),queryCallbacks.mastery(req,res,req.params.courseStr))
    }
    else {
      var queries = gradeQueries(connection.escape(req.params.courseStr))
      connection.query(["SET @@group_concat_max_len = 8000",queries.studentRatingQuery, queries.studentBulkQuery].join("; "),queryCallbacks.mastery(req,res,req.params.courseStr))
    }
  }
  else if (req.user && (req.user.courseStr.substring(0,1) == 's')){
    var stuUDID = req.user.entryID
    var queries = gradeQueries(connection.escape(req.params.courseStr),connection.escape(stuUDID))
    //console.log(queries)
    connection.query(["SET @@group_concat_max_len = 8000",queries.studentRatingQuery, queries.studentBulkQuery].join("; "),queryCallbacks.mastery(req,res,req.params.courseStr))
  }
})

app.get('/assessments/:courseStr/:assessID',function(req,res){
  var queries = assessGradeQueries({courseStr:connection.escape(req.params.courseStr),assessID:connection.escape(req.params.assessID)})
  console.log("assess query:")
  console.log([queries.studentRatingQuery, queries.LOQuery, queries.assessQuery].join("; "))
  connection.query([queries.studentRatingQuery, queries.LOQuery, queries.assessQuery].join("; "),queryCallbacks.default(req,res,req.params.courseStr))
})

app.get('/assessments/:courseStr',function(req,res){
  var queries = "select * from hive1718.assessments where courseStr regexp " + connection.escape(req.params.courseStr)
  connection.query(queries, queryCallbacks.default(req,res,req.params.courseStr))
})

app.post("/newassessment",function(req,res){
    console.log(req.body)
    var reqjson = req.body
    if(reqjson.hasOwnProperty("courseStr") && reqjson.hasOwnProperty("LOAlign")){
      connection.query('insert into hive1718.assessments (courseStr,LOAlign,AssessTitle,MRatings,AssessDate,AssessDesc,AssessLink) values (?,?,?,?,?,?,?)', [reqjson.courseStr,reqjson.LOAlign,reqjson.AssessTitle,"",reqjson.AssessDate,reqjson.AssessDesc,reqjson.AssessLink], queryCallbacks.insert(req,res))
    }
    //res.send(JSON.stringify(req.body))
  
  }
)

app.post("/newlo",function(req,res){
    console.log(req.body)
    var reqjson = req.body
    /*if(reqjson.hasOwnProperty("courseStr") && reqjson.hasOwnProperty("LOAlign")){
    connection.query('insert into hive1718.assessments (courseStr,LOAlign,AssessTitle,MRatings,AssessDate,AssessDesc,AssessLink) values (?,?,?,?,?,?,?)', [reqjson.string,reqjson.assessRatingID], function (error, results, fields) {
    if (error) throw error;
    
    })}*/
    if(reqjson.hasOwnProperty("courseStr") && reqjson.hasOwnProperty("LOCode") && reqjson.hasOwnProperty("LOText")){
      connection.query('insert into hive1718.LOs (courseStr,LOCode,LOText) values (?,?,?)', [reqjson.courseStr,reqjson.LOCode,reqjson.LOText], queryCallbacks.insert(req,res))
    }
    //res.send(JSON.stringify(req.body))
  
  }
)

app.get('/mymastery',function(req,res){
  if(req.user && !(req.user.courseStr.indexOf('s') + 1)){
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
    connection.query('UPDATE hive1718.assessmentRatings SET ratings = ? WHERE entryID = ?', [reqjson.string,reqjson.assessRatingID], function (error, results, fields) {
    if (error) throw error;
    
    })}
    res.send(JSON.stringify(req.body))
  
  }
)

app.post("/sendgoalcomment",function(req,res){
    var reqjson =req.body
    var commenterUDID = req.user.entryID
    if(req.user){
      console.log('goalComment')
      console.log(commenterUDID)
      console.log(reqjson)
      connection.query('INSERT INTO hive1718.goalComments (commenterUDID,goalID,submissionDateTime,commentText,goalMR) values (' + [commenterUDID,reqjson.goalID,"NOW()","'" + reqjson.commentText + "'","'" + reqjson.goalMR + "'"].join(", ") + ')',function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    })
      //res.send('goal commented')
    }
  }
)

app.post("/sendgoal",function(req,res){
    var reqjson =req.body
    var goalerUDID = req.user.entryID
    if(req.user){
      console.log('goal')
      console.log(goalerUDID)
      console.log(reqjson)
      connection.query('INSERT INTO hive1718.goals (studentUDID,goalText,submissionDateTime,masteryReflection,behaviorReflection,personalReflection,goalStrategy) values (' + [reqjson.studentUDID,"'" + reqjson.goalText + "'","NOW()","'" + reqjson.masteryReflection + "'","'" + reqjson.behaviorReflection + "'","'" + reqjson.personalReflection + "'","'" + reqjson.goalStrategy + "'"].join(", ") + ')',function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    })
      //res.send('goal commented')
    }
  }
)

app.post("/sendbdr",function(req,res){
    var reqjson =req.body
    if(req.user){
      console.log('new bdr')
      console.log(reqjson)
      connection.query('INSERT INTO hive1718.bdrs (studentUDID,incidentDateTime,incidentPeriod,othersInvolved,problemBehavior,behaviorAnecdote, teacherResponse,possibleMotivation,location,staffUDID,swipCode,submissionDateTime) values (?,?,?,?,?,?,?,?,?,?,?,NOW())',[reqjson.studentUDID,reqjson.incidentDateTime,reqjson.incidentPeriod,reqjson.othersInvolved,reqjson.problemBehavior,reqjson.behaviorAnecdote,reqjson. teacherResponse,reqjson.possibleMotivation,reqjson.location,reqjson.staffUDID,reqjson.swipCode],function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    })
      //res.send('goal commented')
    }
  }
)

app.post("/sendbdrcomment",function(req,res){
    var reqjson =req.body
    if(req.user){
      console.log('new bdr')
      console.log(reqjson)
      connection.query('INSERT INTO hive1718.bdrComments (bdrID,commenterID,commentText,commentDT) values (?,?,?,NOW());' + (!!reqjson.restoring ? 'UPDATE hive1718.bdrs SET swipCode=(-1*swipCode), restoreDateTime=NOW() WHERE entryID=' + connection.escape(reqjson.bdrID) : ''),[reqjson.bdrID,reqjson.commenterID,reqjson.commentText],function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    })
      //res.send('goal commented')
    }
  }
)

app.post("/sendnewgrade",function(req,res){
    var reqjson =req.body
    if(req.user){
      console.log('new grades')
      console.log(reqjson)
      if(reqjson.hasOwnProperty('assessmentID')){
      connection.query('INSERT INTO hive1718.assessmentRatings (assessmentID,studentUDID,ratings) values (?,?,?)',[reqjson.assessmentID,reqjson.studentUDID,reqjson.ratings],function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    })}
      else {
        console.log('new mratings')
        connection.query('INSERT INTO hive1718.assessmentRatings (studentUDID,ratings,assessmentID) values (?,?,(select entryID from hive1718.assessments where courseStr regexp ? and MRatings = \'y\'))',[reqjson.studentUDID,reqjson.ratings,reqjson.courseStr],function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    })
      }
      //res.send('grade added')
    }
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