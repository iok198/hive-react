var express = require('express')
var app = express()
var connection = require('./hive-sql.js')
var courseQueryPrepare = require('./utilities/courseQueryPrepare.js')

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

function defaultQueryCallback(res){
  return function (err,rsl,fds){
    if(err){console.log(err)}
    res.send(JSON.stringify(rsl))
}
}

function usersQueryCallback(res){
  return function (err,rsl,fds){
    
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
  connection.query('SELECT b.*, CONCAT(u.firstName, " ", u.lastName) as studentName, CONCAT(u2.title, " ", u2.lastName) as staffName FROM bdrs b JOIN userDirectory u ON b.studentUDID=u.entryID JOIN userDirectory u2 ON b.staffUDID=u2.entryID WHERE (b.staffUDID IN ( 1 ) )',defaultQueryCallback(res))
})

app.get('/users',function(req, res){
  connection.query('SELECT * FROM userDirectory where entryID=1',usersQueryCallback(res))
})

app.get('/los/:courseQueryStr',function(req, res){
  connection.query('SELECT * FROM LOs WHERE courseStr REGEXP ' + req.params.courseQueryStr, defaultQueryCallback(res))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
