function parseMastery2(mArr){
  var mRatingsY = mArr[0]
  var mRatingsA = mArr[3]
  var LOs = mArr[1]
  var students = mArr[2]
  
  var LOtemplate = {}
  LOs.forEach((LOrow,id) => {
        var LOel = {courseStr:LOrow.courseStr,LOCode:LOrow.LOCode,LOText:LOrow.LOText,LOID:LOrow.entryID,
        mRatingO:0,
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
  
  var mRatingItemizer = (mRow) => {
    var myRe = /\d{1,}:\d/g;
      var str = mRow.recentrating;
      var myArray = [];
      while ((myArray = myRe.exec(str)) !== null) {
        var ratArr = myArray[0].split(":")
        var loid = ratArr[0]
        var rating = ratArr[1]
        console.log('stu: ' + mRow.stuUDID + ' loid: ' + loid + ' rating: ' + rating)
        studentRows[mRow.stuUDID][loid].mRatingO = rating
    }
  }
  
  mRatingsY.forEach(mRatingItemizer
        //var msg = 'Found ' + myArray[0] + '. ';
        //msg += 'Next match starts at ' + myRe.lastIndex;
        //console.log(msg);
  )
  return studentRows
}
module.exports = parseMastery2