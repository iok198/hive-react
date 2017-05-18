function parseMastery(mArr){
    const sMasteryArr = mArr[0]
    const masteryArr = mArr[1]
    const courseStrArr = mArr[2].split('|')
    
    
    var columns = {}
    var masteryArrS = {}
    
    var LOs = masteryArr.map((mRecord,id) => {
      columns[mRecord.courseStrLOID] = null
      masteryArrS[mRecord.courseStrLOID] = {masteryArrSKey:id,LOID:mRecord.LOID,LOText:mRecord.LOText,courseStrLOID:mRecord.courseStrLOID,mcountA:0,mcountE:0,mcountM:0,mcountN:0,mstudentsA:[],mstudentsE:[],mstudentsM:[],mstudentsN:[]}
      return mRecord.courseStrLOID
    })
    var mRating0s = {}
    var mRatingStrs = {}
    var rowsByStu = {}
    var LOIDsIDkeys = {}
    var stuBios = {}
    
    function sFit(obj,id){
      if(!obj.courseStrLOIDsID){return}
      var cLstr = obj.courseStrLOIDsID.split('-')
      var cL = cLstr[0] + '-' + cLstr[1]
      var objC = Object.assign({},obj)
      objC.mArrKey = id
      
      if(!stuBios.hasOwnProperty(obj.stuUDID)){
        stuBios[obj.stuUDID] = {name:obj.title + " " + obj.firstName}
      }
      
      if(!mRating0s.hasOwnProperty(obj.stuUDID)){
        mRating0s[obj.stuUDID] = [0,0,0,0,0]
      }
      if(obj.mcountN + obj.mcountA + obj.mcountM + obj.mcountE > 0){mRating0s[obj.stuUDID][obj.mRating0]++}
      else{mRating0s[obj.stuUDID][0]++}
      
      if(!mRatingStrs.hasOwnProperty(obj.stuUDID)){
        mRatingStrs[obj.stuUDID] = {assessRatingID:obj.maxID,string:""}
      }
      mRatingStrs[obj.stuUDID].string += "m" + obj.LOID + ":" + obj.mRating0 + "n"
      switch(obj.mRating0){
        case 1:
          masteryArrS[cL].mcountN++
          masteryArrS[cL].mstudentsN.push(obj.stuUDID)
          break
        case 2:
          masteryArrS[cL].mcountA++
          masteryArrS[cL].mstudentsA.push(obj.stuUDID)
          break
        case 3:
          masteryArrS[cL].mcountM++
          masteryArrS[cL].mstudentsM.push(obj.stuUDID)
          break
        case 4:
          masteryArrS[cL].mcountE++
          masteryArrS[cL].mstudentsE.push(obj.stuUDID)
          break
      }
      
      if(!rowsByStu.hasOwnProperty(obj.stuUDID)){
        rowsByStu[obj.stuUDID] = Object.assign({},columns)
      }
      rowsByStu[obj.stuUDID][cL] = Object.assign({},objC)
      rowsByStu[obj.stuUDID][cL].masteryID = columns[cL]
    }
    
    sMasteryArr.forEach(sFit)
    
    return {sMasteryArr: sMasteryArr, 
      masteryArr: masteryArr,
      courseStrArr: courseStrArr,
      rowsByStu:rowsByStu,
      LOs:LOs,
      mRating0s:mRating0s,
      mRatingStrs:mRatingStrs,
      LOIDsIDkeys:LOIDsIDkeys,
      masteryArrS:masteryArrS
    }
  }
  
module.exports = parseMastery