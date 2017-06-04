function parseAssessment(mArr){
    var studentRows = mArr[0]
    var LOs = mArr[1]
    var assessmentModel = mArr[2][0]
    
    var columnHeads = {}
    var alignModel = {}
    assessmentModel.LOAlign.split("n").forEach((str)=>{alignModel[str.substring(1)] = {}})
    var rowsByStu = {}
    
    studentRows.forEach((row) => {
        if(!rowsByStu.hasOwnProperty(row.stuUDID)){rowsByStu[row.stuUDID] = {ratings:alignModel}
        
            
        }
    })
    console.log({rowsByStu:rowsByStu,alignModel:alignModel})
    return {rowsByStu:rowsByStu,alignModel:alignModel}
}
module.exports = parseAssessment