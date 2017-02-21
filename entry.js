import React from 'react';
import ReactDOM from 'react-dom';
var BDRJumbo = require('./components/BDRs/BDRJumbo.js');
var GradeJumbo = require('./components/Mastery/GradeJumbo.js')


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
