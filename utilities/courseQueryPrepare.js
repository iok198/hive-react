function courseQueryPrep(obj) {
    var strObj = {}
    var queryArr = []
    var courseSlots = ["Classification", "Mathematics",
        "English Language Arts", "Science", "Art/Music", "Technology",
        "Physical Education", "ELA 2", "Problem Solving", "Algebra 1",
        "Advanced Science", "Spanish"
    ]
    var baseStr = "s..........."
    var strMap = {'6':['6'], '7':['7'], '8':['8'], 'b':['6','7'], 'B':['7','8'], 'A':['6','7','8'], 'E':['6','8']}
    var myRe = /[6-8]|B|b|A|E/g
    var str = obj.courseStr
    var myArray
    while ((myArray = myRe.exec(str)) !== null) {
      for(var i=0; i<strMap[myArray[0]].length; i++){
        var courseTitle = courseSlots[myArray.index] + " " + strMap[myArray[0]][i]
        var courseStr = baseStr.substring(0,myArray.index) + strMap[myArray[0]][i] + baseStr.substring(myArray.index + 1)
        strObj[courseStr] = courseTitle
        queryArr.push(courseStr)
      }
    }
    return {queryStr: queryArr.join("|"), strObj};

}

export default courseQueryPrep