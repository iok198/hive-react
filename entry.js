import React from 'react';
import ReactDOM from 'react-dom';
var HelloMessage = require('./HelloMessage.js');

class Messages extends React.Component {
  render(){
    var list = this.props.names.map((name) => (<HelloMessage key={name} name={name} />));
    return <div> {list} </div>;
}
}

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          // Data reception is done, do whatever with it!
    var parsed = JSON.parse(this.responseText);
    var arr = parsed.map((user) => 'k' + user.firstName);
    ReactDOM.render(
    <Messages names={arr}/>,
    document.getElementById('content')
    );
    }
  };
  xhttp.open("GET", "/query", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();

