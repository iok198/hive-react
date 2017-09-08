module.exports = function(arr){
    var query = 'SELECT b.*, CONCAT(u.firstName, " ", u.lastName) as studentName, CONCAT(u2.title, " ", u2.lastName) as staffName FROM hive1718.bdrs b JOIN hive1718.userDirectory u ON b.studentUDID=u.entryID JOIN hive1718.userDirectory u2 ON b.staffUDID=u2.entryID WHERE (b.staffUDID IN ( ' + arr.join() + ' ) ) OR (b.studentUDID IN ( ' + arr.join() + ' ) )'

    return {query: query }
}