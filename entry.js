import React from 'react';
import ReactDOM from 'react-dom';
var BDRJumbo = require('./components/BDRs/BDRJumbo.js');
var GreetingJumbo = require('./components/Greeting/GreetingJumbo.js')
var GradeJumbo = require('./components/Mastery/GradeJumbo.js')
var MasteryJumbo = require('./components/Mastery/MasteryJumbo.js')
var AssessmentModal = require('./components/Mastery/Assessment/AssessmentModal.js')
var getRequestForReact = require('./utilities/getRequestForReact.js')
var getRequestToArr = require('./utilities/getRequestToArr.js')
var postRequestForReact = require('./utilities/postRequestForReact.js')
var stuCourseQuObj = require('./utilities/courseQueryPrepare')
var parseMastery2 = require('./components/Mastery/utilities/parseMastery2.js')

/*getRequestForReact("/mybdrs",(arr) => ( [<BDRJumbo bdrs={arr}/>,
        document.getElementById('content2')]))*/

getRequestForReact("/users",(arr) => ( [
          <GreetingJumbo user={arr[0]} />,
          document.getElementById('content')
  
  ]),function(arr) {
	getRequestForReact("/bdrs/" + arr[0].entryID, (arr) => ( [<BDRJumbo bdrs={arr}/>,
        document.getElementById('content2')]))
	ReactDOM.render(<MasteryJumbo user={arr[0]} stuCourseQuObj={stuCourseQuObj(arr[0])}/>,
          document.getElementById('content3'))})

//ReactDOM.render(<AssessmentModal />,document.getElementById('content4'))

getRequestForReact("/assessments/s7/257",(arr) => ([<AssessmentModal mArr={arr}/>,document.getElementById('content4')]))
getRequestToArr("/grades3/s6",(arr)=>{console.log(parseMastery2(arr))})