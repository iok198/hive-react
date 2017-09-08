module.exports = function(courseStr){
    var mRatingsY = 'select max(entryID) as maxID, group_concat(distinct studentUDID) as stuUDID, group_concat(distinct assessmentID) as assessID, substring_index(group_concat(ratings order by entryID desc SEPARATOR \'|\'), \'|\', 1) as recentrating from hive1718.assessmentRatings where assessmentID=(select entryID from hive1718.assessments where MRatings = \'y\' and courseStr REGEXP ' + courseStr + ') group by concat(studentUDID, \':\', assessmentID) order by group_concat(entryID separator \' \')'

    var LOs = 'select * from hive1718.LOs where courseStr REGEXP ' + courseStr
    
    var userDirectory = 'select * from hive1718.userDirectory where courseStr REGEXP ' + courseStr
    
    var mRatingsA = 'select max(entryID) as maxID, group_concat(distinct studentUDID) as stuUDID, group_concat(distinct     assessmentID) as assessID, substring_index(group_concat(ratings order by entryID desc SEPARATOR \'|\'), \'|\', 1) as recentrating from hive1718.assessmentRatings where assessmentID in (select entryID from hive1718.assessments where MRatings != \'y\' and courseStr REGEXP ' + courseStr + ') group by concat(studentUDID, \':\', assessmentID) order by group_concat(entryID separator \' \')'

    return {mRatingsY:mRatingsY, LOs:LOs, userDirectory:userDirectory, mRatingsA:mRatingsA, joined:mRatingsY + '; ' + LOs + '; ' + userDirectory + '; ' + mRatingsA }
}