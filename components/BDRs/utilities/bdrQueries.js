module.exports = function(arr){
    var query = 'SELECT b.*, CONCAT(u.firstName, " ", u.lastName) as studentName, CONCAT(u2.title, " ", u2.lastName) as staffName FROM hive1718.bdrs b JOIN hive1718.userDirectory u ON b.studentUDID=u.entryID JOIN hive1718.userDirectory u2 ON b.staffUDID=u2.entryID WHERE (b.staffUDID IN ( ' + arr.join() + ' ) ) OR (b.studentUDID IN ( ' + arr.join() + ' ) )'
    var queryS = 'SELECT b.studentUDID, b.staffUDID,b.incidentDateTime,b.incidentPeriod,b.othersInvolved,b.problemBehavior,b.possibleMotivation,b.restoreDateTime,b.entryID,b.submissionDateTime,b.swipCode,b.location, CONCAT(u.firstName, " ", u.lastName) as studentName, CONCAT(u2.title, " ", u2.lastName) as staffName FROM hive1718.bdrs b JOIN hive1718.userDirectory u ON b.studentUDID=u.entryID JOIN hive1718.userDirectory u2 ON b.staffUDID=u2.entryID WHERE (b.staffUDID IN ( ' + arr.join() + ' ) ) OR (b.studentUDID IN ( ' + arr.join() + ' ) )'

    /*
studentUDID":48,"staffUDID":1,"incidentDateTime":"2017-09-08T10:14:00.000Z","incidentPeriod":"3","othersInvolved":"","problemBehavior":"Inappropriate Personal Tech Use","behaviorAnecdote":"descrip","possibleMotivation":"Obtain Items/Activities","teacherResponse":"respint","restoreAnecdote":null,"restoreDateTime":"2017-09-11T02:35:50.000Z","entryID":3365,"teacherConvoCheck":null,"studentSuggestCheck":null,"pbisBreakCheck":null,"restoreConditions":null,"essayResponse1":null,"essayResponse2":null,"essayResponse3":null,"submissionDateTime":"2017-09-11T02:35:50.000Z","swipCode":"1","location":"Restroom","studentName":"KAITHLYN ABRAMS","staffName":"Mr. Sutton"
    */

    return {query: query,queryS: queryS }
}