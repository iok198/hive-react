function parseMastery(mArr){
    const sMasteryArr = mArr[0]
    const masteryArr = mArr[1]
    const courseStrArr = mArr[2].split('|')
    
    
    var columns = {}
    
    var LOs = masteryArr.map((mRecord) => {
      columns[mRecord.courseStrLOID] = null
      return mRecord.courseStrLOID
    })
    var mRating0s = {}
    var mRatingStrs = {}
    var rowsByStu = {}
    
    function sFit(obj){
      var cLstr = obj.courseStrLOIDsID.split('-')
      var cL = cLstr[0] + '-' + cLstr[1]
      var objC = Object.assign({},obj)
      if(!mRating0s.hasOwnProperty(obj.stuUDID)){
        mRating0s[obj.stuUDID] = [0,0,0,0,0]
      }
      if(obj.mcountN + obj.mcountA + obj.mcountM + obj.mcountE > 0){mRating0s[obj.stuUDID][obj.mRating0]++}
      else{mRating0s[obj.stuUDID][0]++}
      
      if(!mRatingStrs.hasOwnProperty(obj.stuUDID)){
        mRatingStrs[obj.stuUDID] = ""
      }
      mRatingStrs[obj.stuUDID] += "m" + obj.LOID + ":" + obj.mRating0 + "n"
      
      if(!rowsByStu.hasOwnProperty(obj.stuUDID)){
        rowsByStu[obj.stuUDID] = Object.assign({},columns)
      }
      rowsByStu[obj.stuUDID][cL] = Object.assign({},objC)
    }
    
    sMasteryArr.forEach(sFit)
    
    return {sMasteryArr: sMasteryArr, masteryArr: masteryArr, courseStrArr: courseStrArr, rowsByStu:rowsByStu, LOs:LOs,mRating0s:mRating0s,mRatingStrs:mRatingStrs}
  }
  
module.exports = parseMastery