import React from 'react';
import ReactDOM from 'react-dom';
var BDRJumbo = require('./components/BDRs/BDRJumbo.js');
var GreetingJumbo = require('./components/Greeting/GreetingJumbo.js')
var GradeJumbo = require('./components/Mastery/GradeJumbo.js')
var GradeJumbo = require('./components/Mastery/MasteryJumbo.js')
var getRequestForReact = require('./utilities/getRequestForReact.js')
var postRequestForReact = require('./utilities/postRequestForReact.js')

getRequestForReact("/mybdrs",(arr) => ( [
          <BDRJumbo bdrs={arr}/>,
        document.getElementById('content')]))

getRequestForReact("/users",(arr) => ( [
          <GreetingJumbo user={arr[0]} />,
          document.getElementById('content2')
  
  ]))
  
/*getRequestForReact("/mymastery",(arr) => ( [
          <GradeJumbo mArr={arr} />,
          document.getElementById('content3')
  
  ])) */
  ReactDOM.render(<MasteryJumbo />,
          document.getElementById('content3'))
//postRequestForReact("/sendgrades",{goo:'gle'},console.log)
/*
var xhttp = new XMLHttpRequest(); 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var parsed = JSON.parse(this.responseText);
      var arr = parsed.map((user) => user);
      ReactDOM.render(
        <div>
        <BDRJumbo bdrs={arr}/>
        <GradeJumbo />
        </div>,
        document.getElementById('content')
      );
    }
  };
  
  xhttp.open("GET", "/bdrs", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
*/