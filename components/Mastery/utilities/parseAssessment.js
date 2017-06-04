function parseAssessment(mArr){
    var studentRows = mArr[0]
    var LOs = mArr[1]
    var assessmentModel = mArr[2][0]
    
    
    var alignModel = {}
    assessmentModel.LOAlign.split("n").forEach((str)=>{if(!!str){ alignModel[str.substring(1)] = {}}})
    var columnHeads = Object.assign({},alignModel)
    var rowsByStu = {}
    
    studentRows.forEach((row,id) => {
        if(!rowsByStu.hasOwnProperty(row.uEntryID)){rowsByStu[row.uEntryID] = {ratings:Object.assign({},alignModel),studentRowsId:id,recentrating:''}
        Object.keys(rowsByStu[row.uEntryID].ratings).forEach((key,id)=>{
            var ratingsREGEXP = new RegExp('m' + key + ':[0-4]n')
            if(ratingsREGEXP.exec(row.recentrating)){
                var regmatch = ratingsREGEXP.exec(row.recentrating)[0]
                rowsByStu[row.uEntryID].recentrating += regmatch
                rowsByStu[row.uEntryID].ratings[key] = regmatch.split(":")[1].substring(0,1) 
            
            } else{
                rowsByStu[row.uEntryID].recentrating += 'm' + key + ':0n'
                rowsByStu[row.uEntryID].ratings[key] = 0
            }
            
        })
        
            
        }
    })
    console.log({rowsByStu:rowsByStu,alignModel:alignModel})
    return {rowsByStu:rowsByStu,alignModel:alignModel}
}
module.exports = parseAssessment