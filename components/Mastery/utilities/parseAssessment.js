function parseAssessment(mArr){
    var studentRows = mArr[0]
    var LOs = mArr[1]
    var assessmentModel = mArr[2][0]
    const studentName = (mArr.length < 4) ? (false) : mArr[3]
    const classNoF = (mArr.length < 5) ? false : mArr[4]
    console.log(mArr)
    
    var mRating0s={}
    var mRatingStrs={}
    var stuBios={}
    var LOsByID = {}
    LOs.forEach((LO)=>{LOsByID[LO.LOID] = LO})
    console.log("LOs")
    console.log(LOsByID)
    var alignModel = {}
    assessmentModel.LOAlign.split("n").forEach((str)=>{if(!!str){ alignModel[str.substring(1)] = {}}})
    
    var columnHeads = Object.assign({},alignModel)
    var AssessmentArrS = Object.assign({},alignModel)
    Object.keys(AssessmentArrS).forEach((LOID,id)=>{
        AssessmentArrS[LOID] = {mcountN:0,mcountA:0,mcountM:0,mcountE:0,mcountU:0, LOText:LOsByID[LOID].LOText}
    })
    var rowsByStu = {}
    
    studentRows.forEach((row,id) => {
        if((!!classNoF && row.classNo.indexOf(classNoF) < 0) || (!!studentName && (row.title + ' ' + row.lastName).toLowerCase().indexOf(studentName.toLowerCase()) < 0 ) ) return
        stuBios[row.uEntryID] = row.title + " " + row.lastName
        mRating0s[row.uEntryID] = {0:0,1:0,2:0,3:0,4:0}
        mRatingStrs[row.uEntryID] = ""
        if(!rowsByStu.hasOwnProperty(row.uEntryID)){rowsByStu[row.uEntryID] = {ratings:Object.assign({},alignModel),studentRowsId:id,recentrating:''}
        Object.keys(rowsByStu[row.uEntryID].ratings).forEach((key,id)=>{
            var ratingsREGEXP = new RegExp('m' + key + ':[0-4]n')
            if(ratingsREGEXP.exec(row.recentrating)){
                var regmatch = ratingsREGEXP.exec(row.recentrating)[0]
                rowsByStu[row.uEntryID].recentrating += regmatch
                mRatingStrs[row.uEntryID] += regmatch
                //mRating0s[row.uEntryID] = 
                rowsByStu[row.uEntryID].ratings[key] = regmatch.split(":")[1].substring(0,1) 
                switch(regmatch.split(":")[1].substring(0,1)){
                    case "0":
                        AssessmentArrS[key].mcountU++
                        mRating0s[row.uEntryID][0]++
                        break
                    case "1":
                        AssessmentArrS[key].mcountN++
                        mRating0s[row.uEntryID][1]++
                        break
                    case "2":
                        AssessmentArrS[key].mcountA++
                        mRating0s[row.uEntryID][2]++
                        break
                    case "3":
                        AssessmentArrS[key].mcountM++
                        mRating0s[row.uEntryID][3]++
                        break
                    case "4":
                        AssessmentArrS[key].mcountE++
                        mRating0s[row.uEntryID][4]++
                        break
                }
            
            } else{
                rowsByStu[row.uEntryID].recentrating += 'm' + key + ':0n'
                mRatingStrs[row.uEntryID] += 'm' + key + ':0n'
                mRating0s[row.uEntryID][0]++
                rowsByStu[row.uEntryID].ratings[key] = 0
                AssessmentArrS[key].mcountU++
            }
            
        })
        
            
        }
    })
    console.log({rowsByStu:rowsByStu,alignModel:alignModel,AssessmentArrS:AssessmentArrS})
    return {rowsByStu:rowsByStu,alignModel:alignModel,AssessmentArrS:AssessmentArrS,mRating0s:mRating0s,mRatingStrs:mRatingStrs,stuBios:stuBios}
}
module.exports = parseAssessment