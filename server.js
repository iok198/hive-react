var express = require('express')
var app = express()
var connection = require('./hive-sql.js')
var courseQueryPrepare = require('./utilities/courseQueryPrepare.js')
var gradeQueries = require('./components/Mastery/utilities/gradeQueries.js')

app.use(express.static('public'))

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
  res.send('Hello World!')
})

function defaultQueryCallback(req,res){
  return function (err,rsl,fds){
    if(err){console.log(err)}
    res.send(JSON.stringify(rsl))
}
}

function masteryQueryCallback(req,res){
  return function (err,rsl,fds){
    if(err){console.log(err)}
    rsl.push(req.params.courseStr)
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

app.get('/bdrs',function(req, res) {
  connection.query('SELECT b.*, CONCAT(u.firstName, " ", u.lastName) as studentName, CONCAT(u2.title, " ", u2.lastName) as staffName FROM bdrs b JOIN userDirectory u ON b.studentUDID=u.entryID JOIN userDirectory u2 ON b.staffUDID=u2.entryID WHERE (b.staffUDID IN ( 1 ) )',defaultQueryCallback(req,res))
})

app.get('/users',function(req, res){
  connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(req,res))
})

app.get('/mastery/:courseStr',function(req,res){
  var queries = gradeQueries(connection.escape(req.params.courseStr));
  connection.query([queries.studentRatingQuery, queries.studentBulkQuery].join("; "),masteryQueryCallback(req,res))
})

app.get('/los/:courseQueryStr',function(req, res){
  console.log('SELECT * FROM LOs WHERE courseStr REGEXP ' + req.params.courseQueryStr.toString())
  connection.query('SELECT * FROM LOs WHERE courseStr REGEXP \'' + req.params.courseQueryStr.toString() + '\'', defaultQueryCallback(req,res))
})

app.get('/grades/:courseQueryStr',function(req,res){
  console.log(req.params.courseQueryStr.toString())
  connection.query('select concat(courseStr,\'-\',LOID) as courseStrLOID, group_concat(distinct LOText) as LOText, group_concat(if(recentrating REGEXP concat(\'m\', LOID, \':1n\'), stuUDID, null) ' + 
  'separator \', \') as mstudentsN, group_concat(if(recentrating REGEXP concat(\'m\', LOID, \':2n\'), stuUDID, null) separator \', \') ' + 
  'as mstudentsA, group_concat(if(recentrating REGEXP concat(\'m\', LOID, \':3n\'), stuUDID, null) separator \', \') as mstudentsM, ' +
  'group_concat(if(recentrating REGEXP concat(\'m\', LOID, \':4n\'), stuUDID, null) separator \', \') as mstudentsE, ' + 
  'sum(recentrating REGEXP concat(\'m\', LOID, \':1n\')) as mcountN, sum(recentrating REGEXP concat(\'m\', LOID, \':2n\')) as mcountA, ' +
  'sum(recentrating REGEXP concat(\'m\', LOID, \':3n\')) as mcountM, sum(recentrating REGEXP concat(\'m\', LOID, \':4n\')) as mcountE from ' +
  '(select * from (select entryID as LOID, LOText from hive1617.LOs where courseStr REGEXP \'' + req.params.courseQueryStr.toString() + '\') L ' +
  'left join (select courseStr, recentrating, stuUDID, assessID from (select * from (select * from (select * from hive1617.assessments ' +
  'where courseStr REGEXP \'' + req.params.courseQueryStr.toString() + '\') a RIGHT JOIN (select max(entryID) as maxID, ' + 
  'group_concat(distinct studentUDID) as stuUDID, group_concat(distinct assessmentID) as assessID, ' + 
  'substring_index(group_concat(ratings order by entryID desc SEPARATOR \'|\'), \'|\', 1) as recentrating from hive1617.assessmentRatings ' + 
  'group by concat(studentUDID, \':\', assessmentID) order by group_concat(entryID separator \' \')) aR on a.entryID=aR.assessID) aRJ ' +
  'where MRatings=\'y\') aRC) aRC2 on aRC2.recentrating REGEXP concat(\'m\', L.LOID, \':.n\')) aRC3 group by ' + 
  'concat(courseStr,\'-\',LOID)',defaultQueryCallback(req,res))
})

app.post("/hola",function(req,res){res.send("hallo")})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
