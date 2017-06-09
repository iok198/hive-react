import React from 'react';
import ReactDOM from 'react-dom';
import BDRJumbo from './components/BDRs/BDRJumbo.js'
import GreetingJumbo from './components/Greeting/GreetingJumbo.js'
import GradeJumbo from './components/Mastery/GradeJumbo.js'
import MasteryJumbo from './components/Mastery/MasteryJumbo.js'
import AssessmentModal from './components/Mastery/Assessment/AssessmentModal.js'
import getRequestForReact from './utilities/getRequestForReact.js'
import postRequestForReact from './utilities/postRequestForReact.js'
import stuCourseQuObj from './utilities/courseQueryPrepare'

getRequestForReact("/mybdrs", (arr) => ([
        <BDRJumbo bdrs={arr} />,
        document.getElementById('content2')]))

getRequestForReact("/users", (arr) => ([
        <GreetingJumbo user={arr[0]} />,
        document.getElementById('content')

]), function (arr) {
        ReactDOM.render(
                <MasteryJumbo user={arr[0]} stuCourseQuObj={stuCourseQuObj(arr[0])} />,
                document.getElementById('content3')
        )
})

//ReactDOM.render(<AssessmentModal />,document.getElementById('content4'))

getRequestForReact("/assessments/s7/257", (arr) => ([<AssessmentModal mArr={arr} />, document.getElementById('content4')]))