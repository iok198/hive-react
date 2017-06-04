import React from 'react';
import ReactDOM from 'react-dom';
var BDRJumbo = require('./components/BDRs/BDRJumbo.js');
var GreetingJumbo = require('./components/Greeting/GreetingJumbo.js')
var GradeJumbo = require('./components/Mastery/GradeJumbo.js')
var MasteryJumbo = require('./components/Mastery/MasteryJumbo.js')
var AssessmentModal = require('./components/Mastery/AssessmentModal.js')
var getRequestForReact = require('./utilities/getRequestForReact.js')
var postRequestForReact = require('./utilities/postRequestForReact.js')
var stuCourseQuObj = require('./utilities/courseQueryPrepare')

getRequestForReact("/mybdrs",(arr) => ( [
          <BDRJumbo bdrs={arr}/>,
        document.getElementById('content2')]))

getRequestForReact("/users",(arr) => ( [
          <GreetingJumbo user={arr[0]} />,
          document.getElementById('content')
  
  ]),function(arr) {ReactDOM.render(<MasteryJumbo user={arr[0]} stuCourseQuObj={stuCourseQuObj(arr[0])}/>,
          document.getElementById('content3'))})
          
ReactDOM.render(<AssessmentModal />,document.getElementById('assessmentModal'))