import React from 'react';
import ReactDOM from 'react-dom';

class GreetingJumbo extends React.Component {
  render(){
      let name = this.props.user.title;
    
    return( <div id="" className="jumbotron">
              <div><img height="200" src="./public/img/hivelogo.png"/></div>
              <h1>Hello {name}</h1>
	    </div> );
  }

}

module.exports = GreetingJumbo;