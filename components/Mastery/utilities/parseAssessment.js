function parseAssessment(mArr) {
    var studentRows = mArr[0]
    var LOs = mArr[1]
    var assessmentModel = mArr[2][0]
    console.log(mArr)

    var LOsByID = {}
    LOs.forEach((LO) => { LOsByID[LO.LOID] = LO })
    console.log("LOs")
    console.log(LOsByID)
    var alignModel = {}
    assessmentModel.LOAlign.split("n").forEach((str) => { if (!!str) { alignModel[str.substring(1)] = {} } })

    var columnHeads = Object.assign({}, alignModel)
    var AssessmentArrS = Object.assign({}, alignModel)
    Object.keys(AssessmentArrS).forEach((LOID, id) => {
        AssessmentArrS[LOID] = { mcountN: 0, mcountA: 0, mcountM: 0, mcountE: 0, mcountU: 0, LOText: LOsByID[LOID].LOText }
    })
    var rowsByStu = {}

    studentRows.forEach((row, id) => {
        if (!rowsByStu.hasOwnProperty(row.uEntryID)) {
        rowsByStu[row.uEntryID] = { ratings: Object.assign({}, alignModel), studentRowsId: id, recentrating: '' }
            Object.keys(rowsByStu[row.uEntryID].ratings).forEach((key, id) => {
                var ratingsREGEXP = new RegExp('m' + key + ':[0-4]n')
                if (ratingsREGEXP.exec(row.recentrating)) {
                    var regmatch = ratingsREGEXP.exec(row.recentrating)[0]
                    rowsByStu[row.uEntryID].recentrating += regmatch
                    rowsByStu[row.uEntryID].ratings[key] = regmatch.split(":")[1].substring(0, 1)
                    switch (regmatch.split(":")[1].substring(0, 1)) {
                        case "1":
                            AssessmentArrS[key].mcountN++
                            break
                        case "2":
                            AssessmentArrS[key].mcountA++
                            break
                        case "3":
                            AssessmentArrS[key].mcountM++
                            break
                        case "4":
                            AssessmentArrS[key].mcountE++
                            break
                    }

                } else {
                    rowsByStu[row.uEntryID].recentrating += 'm' + key + ':0n'
                    rowsByStu[row.uEntryID].ratings[key] = 0
                    AssessmentArrS[key].mcountU++
                }

            })


        }
    })
    console.log({ rowsByStu, alignModel, AssessmentArrS })
    return { rowsByStu, alignModel, AssessmentArrS }
}
export default parseAssessment;