function parseMastery(mArr){
    const sMasteryArr = mArr[0]
    const masteryArr = mArr[1]
    const courseStrArr = mArr[2].split('|')
    
    
    var columns = {}
    
    var LOs = masteryArr.map((mRecord) => {
      columns[mRecord.courseStrLOID] = null
      return mRecord.courseStrLOID
    })
    
    var rowsByStu = {}
    
    function sFit(obj){
      var cLstr = obj.courseStrLOIDsID.split('-')
      var cL = cLstr[0] + '-' + cLstr[1]
      var objC = Object.assign({},obj)
      
      if(!rowsByStu.hasOwnProperty(obj.stuUDID)){
        rowsByStu[obj.stuUDID] = Object.assign({},columns)
      }
      rowsByStu[obj.stuUDID][cL] = Object.assign({},objC)
    }
    
    sMasteryArr.forEach(sFit)
    
    return {sMasteryArr: sMasteryArr, masteryArr: masteryArr, courseStrArr: courseStrArr, rowsByStu:rowsByStu, LOs:LOs}
  }
  
module.exports = parseMastery