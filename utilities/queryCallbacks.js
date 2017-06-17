var courseQueryPrepare = require('./courseQueryPrepare.js')

function defaultQueryCallback(req,res){
  return function (err,rsl,fds){
    if(err){console.log(err)}
    res.send(JSON.stringify(rsl))
}
}

function masteryQueryCallback(req,res,courseStr){
  return function (err,rsl,fds){
    if(err){console.log(err)}
    rsl.shift()
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
  res.end()
}
}

module.exports = {default: defaultQueryCallback,mastery:masteryQueryCallback,
    users:usersQueryCallback
}