import React from 'react';
import ReactDOM from 'react-dom';
var BDRJumbo = require('./components/BDRs/BDRJumbo.js');
var GreetingJumbo = require('./components/Greeting/GreetingJumbo.js')
var MasteryJumbo = require('./components/Mastery/MasteryJumbo.js')
var MentoringJumbo = require('./components/Mentoring/MentoringJumbo.js')
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
	getRequestForReact("/bdrsplusc/" + arr[0].entryID, (arr2) => ( [<BDRJumbo bdrs={arr2} viewer={arr[0]}/>,
        document.getElementById('content2')]))
	ReactDOM.render(<MasteryJumbo user={arr[0]} stuCourseQuObj={stuCourseQuObj(arr[0])}/>,
          document.getElementById('content3'))
	//ReactDOM.render(<MentoringJumbo user={arr[0]} mentoringStr={arr[0].mentoringStr}/>,document.getElementById('content5'))
	getRequestForReact("/mentees/" + arr[0].entryID, (mentArr) => ( [<MentoringJumbo mentees={mentArr} viewer={arr[0].entryID}/>,document.getElementById('content5')]))
})