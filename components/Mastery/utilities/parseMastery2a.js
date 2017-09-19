function parseMastery(mArr){
    console.log(mArr)
    const sMasteryArr = mArr[0]
    const masteryArr = mArr[1]
    const courseStrArr = mArr[2].split('|')
    const studentName = (mArr.length < 4) ? (false) : mArr[3]
    const classNoF = (mArr.length < 5) ? false : mArr[4]
    
    
    var columns = {}
    var masteryArrS = {}
    
    var LOs = masteryArr.map((mRecord,id) => {
      columns[mRecord.courseStrLOID] = null
      masteryArrS[mRecord.courseStrLOID] = {masteryArrSKey:id,LOID:mRecord.LOID,LOText:mRecord.LOText,courseStrLOID:mRecord.courseStrLOID,mcountA:0,mcountE:0,mcountM:0,mcountN:0,mcountU:0,mstudentsA:[],mstudentsE:[],mstudentsM:[],mstudentsN:[],mstudentsU:[]}
      return mRecord.courseStrLOID
    })
    var mRating0s = {}
    var mRatingStrs = {}
    var rowsByStu = {}
    var LOIDsIDkeys = {}
    var stuBios = {}
    var classNos = []
    
    function sFit(obj,id){
      if( 
          (studentName &&
           (obj.title + " " + obj.lastName).toLowerCase().indexOf(studentName.toLowerCase()) == -1
          ) ||
          (classNoF && obj.classNo != classNoF)
        ) {return}
      var objC = Object.assign({},obj)
      objC.mArrKey = id
      if(!stuBios.hasOwnProperty(obj.entryID)){
        stuBios[obj.entryID] = {name:obj.title + " " + obj.lastName}
      }
      if(classNos.indexOf(obj.classNo) < 0){ classNos.push(obj.classNo)}
      if(!mRating0s.hasOwnProperty(obj.entryID)){
        mRating0s[obj.entryID] = [0,0,0,0,0]
      }
      if(obj.mcountN + obj.mcountA + obj.mcountM + obj.mcountE > 0){mRating0s[obj.entryID][obj.mRating0]++}
      else{mRating0s[obj.entryID][0]++}
      
      if(!mRatingStrs.hasOwnProperty(obj.entryID)){
        mRatingStrs[obj.entryID] = {assessRatingID:obj.maxID,string:""}
      }
      mRatingStrs[obj.entryID].string += "m" + obj.LOID + ":" + obj.mRating0 + "n"
      if(!rowsByStu.hasOwnProperty(obj.entryID)){
        rowsByStu[obj.entryID] = Object.assign({},columns)
      }
      if(!!obj.courseStrLOIDsID){
      var cLstr = obj.courseStrLOIDsID.split('-')
      var cL = cLstr[0] + '-' + cLstr[1]
      
      
      
      
      
      
      
      switch(obj.mRating0){
        case 0:
          masteryArrS[cL].mcountU++
          masteryArrS[cL].mstudentsU.push(obj.entryID)
          break
        case 1:
          masteryArrS[cL].mcountN++
          masteryArrS[cL].mstudentsN.push(obj.entryID)
          break
        case 2:
          masteryArrS[cL].mcountA++
          masteryArrS[cL].mstudentsA.push(obj.entryID)
          break
        case 3:
          masteryArrS[cL].mcountM++
          masteryArrS[cL].mstudentsM.push(obj.entryID)
          break
        case 4:
          masteryArrS[cL].mcountE++
          masteryArrS[cL].mstudentsE.push(obj.entryID)
          break
      }
      rowsByStu[obj.entryID][cL] = Object.assign({},objC)
      rowsByStu[obj.entryID][cL].masteryID = columns[cL]
      }
      
      rowsByStu[obj.entryID][cL] = Object.assign({},objC)
      rowsByStu[obj.entryID][cL].masteryID = columns[cL]
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
      masteryArrS:masteryArrS,
      stuBios:stuBios,
      classNos:classNos
    }
  }
  
module.exports = parseMastery