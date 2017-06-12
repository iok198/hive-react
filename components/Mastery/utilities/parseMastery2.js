function parseMastery2(mArr){
  var mRatingsY = mArr[0]
  var mRatingsA = mArr[3]
  var LOs = mArr[1]
  var students = mArr[2]
  
  var LOtemplate = {}
  LOs.forEach((LOrow,id) => {
        var LOel = {courseStr:LOrow.courseStr,LOCode:LOrow.LOCode,LOText:LOrow.LOText,
        mCountU:0,
        mCountN:0,
        mCountA:0,
        mCountM:0,
        mCountE:0, LORowsID: id}

      LOtemplate[LOrow.entryID] = LOel
    }
  )
  
  var studentRows = {}
  students.forEach((stuRow,id) => {
    var stuEl = Object.assign({stuRowsID: id,stuUDID:stuRow.entryID,name:stuRow.title + ' ' + stuRow.lastName},LOtemplate)
    studentRows[stuRow.entryID] = stuEl
    }
  )
  return studentRows
}
module.exports = parseMastery2