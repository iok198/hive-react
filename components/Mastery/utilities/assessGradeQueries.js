module.exports = function(obj){
    var studentRatingQuery = 'select * from (select * from hive1617.userDirectory where courseStr REGEXP ' + obj.courseStr + ') u left join (select * from (select * from hive1617.assessments where entryID = ' + obj.assessID + ') a JOIN (select max(entryID) as maxID, group_concat(distinct studentUDID) as stuUDID, group_concat(distinct assessmentID) as assessID, substring_index(group_concat(ratings order by entryID desc SEPARATOR \'|\'), \'|\', 1) as recentrating from hive1617.assessmentRatings where assessmentID = ' + obj.assessID + ' group by concat(studentUDID, \':\', assessmentID) order by group_concat(entryID separator \' \')) aR on a.entryID=aR.assessID) aRJ on u.entryID=aRJ.stuUDID'
    var LOQuery = 'select entryID as LOID, LOText, concat(courseStr,\'-\',entryID) as courseStrLOID from hive1617.LOs where courseStr REGEXP ' + obj.courseStr

    return {studentRatingQuery: studentRatingQuery, LOQuery: LOQuery }
}