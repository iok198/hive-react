var connection = require('../hive-sql.js')

var studentquery = "select entryID from hive1718.userDirectory where courseStr regexp 's7'"
var loquery = "select group_concat('m',entryID,':0n' separator '') as ratings from hive1718.LOs where courseStr regexp 's7'"
var assessmentID = "select entryID as assessmentID from hive1718.assessments where MRatings='y' and courseStr regexp 's7'"
var insertq = "insert into hive1718.assessmentRatings (studentUDID, ratings, assessmentID) values ?"

/*connection.query(studentquery,function(req,res){
	console.log(res)
	connection.query(loquery,function(req2,res2){
		console.log(res2)
		connection.query(assessmentID,function(req3,res3){
			console.log(res3)
		})
		})})*/

connection.query([studentquery,loquery,assessmentID].join('; '),function(req,res){
	var stuUDIDarr = res[0].map((student)=>([student.entryID,res[1][0].ratings,res[2][0].assessmentID]))
	//connection.query()
	console.log(stuUDIDarr)
	connection.query(insertq,[stuUDIDarr],function(req2,res2){
		console.log(res2)
	})
})