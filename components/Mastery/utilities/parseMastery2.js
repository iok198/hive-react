function parseMastery2(mArr){
  var mRatingsY = mArr[0]
  var mRatingsA = mArr[3]
  var LOs = mArr[1]
  var students = mArr[2]
  
  var LOtemplate = {}
  LOs.forEach((LOrow,id) => {
      var LOel = Object.assign({},LOrow)
      LOel.mCountU = 0
      LOel.mCountN = 0
      LOel.mCountA = 0
      LOel.mCountM = 0
      LOel.mCountE = 0
      LOtemplate[LOrow.entryID] = LOel
    })
  
  //var studentRows = students.map(() => ())
  return LOtemplate
}
module.exports = parseMastery2