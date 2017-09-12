import React from 'react';
import ReactDOM from 'react-dom';

class GreetingJumbo extends React.Component {
  render(){
      let name = this.props.user.title;
    
    return( <div id="" className="jumbotron">
              <div><img height="50" src="./public/img/hivelogo.png"/></div>
              <h1>Hello {name + " " + this.props.user.lastName}</h1>
              {(this.props.user.courseStr.substring(0,1) != 's') ? (<p><a href="https://sites.google.com/a/ms442.org/the-hub">{"Visit the Hub"}</a></p>) : (<a href="https://docs.google.com/forms/d/e/1FAIpQLSf3LAsfrbyfJLvE55AtkOE4W2BJV4rXnb0CACBMJ4aDIbtHLw/viewform?usp=sf_link"><img src="http://www.freeiconspng.com/uploads/wrench-icon-3.png" /></a>)}
	    </div> );
  }

}

module.exports = GreetingJumbo;