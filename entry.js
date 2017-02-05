import React from 'react';
import ReactDOM from 'react-dom';
var BDRPanel = require('./BDRPanel.js');

class Messages extends React.Component {
  render(){
    var list = this.props.bdrs.map((bdr) => (<BDRPanel key={bdr.entryID} bdr={bdr} />));
    return( <div id="" className="jumbotron">
              {list}
	    </div> );
}
}

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          // Data reception is done, do whatever with it!
    var parsed = JSON.parse(this.responseText);
    var arr = parsed.map((user) => user);
    ReactDOM.render(
    <Messages bdrs={arr}/>,
    document.getElementById('content')
    );
    }
  };
  xhttp.open("GET", "/query", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
