import React from 'react';
import ReactDOM from 'react-dom';

class GreetingJumbo extends React.Component {
  render(){
      let name = this.props.user.title;
    
    return( <div id="" className="jumbotron">
              <div><img height="50" src="./public/img/hivelogo.png"/></div>
              <h1>Hello {name + " " + this.props.user.lastName}</h1>
              <p><a href="https://sites.google.com/a/ms442.org/the-hub">Visit the Hub</a></p>
	    </div> );
  }

}

module.exports = GreetingJumbo;