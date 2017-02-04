import React from 'react';
import ReactDOM from 'react-dom';
var HelloMessage = require('./HelloMessage.js');
var names = ["Jared", "Allen", "Sutton"];

class Messages extends React.Component {
  render(){
    var list = names.map((name) => (<HelloMessage key={name} name={name} />));
    return <div> {list} </div>;
}
}

ReactDOM.render(
    <Messages />,
    document.getElementById('content')
    );
