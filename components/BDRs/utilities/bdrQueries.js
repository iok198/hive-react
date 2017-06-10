module.exports = function(arr){
    var query = 'SELECT b.*, CONCAT(u.firstName, " ", u.lastName) as studentName, CONCAT(u2.title, " ", u2.lastName) as staffName FROM hive1617.bdrs b JOIN hive1617.userDirectory u ON b.studentUDID=u.entryID JOIN hive1617.userDirectory u2 ON b.staffUDID=u2.entryID WHERE (b.staffUDID IN ( ' + arr.join() + ' ) )'

    return {query: query }
}