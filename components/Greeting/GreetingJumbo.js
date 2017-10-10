import React from 'react';
import ReactDOM from 'react-dom';
var LateOOUForm = require('./LateOOUForm.js')

class GreetingJumbo extends React.Component {
  constructor(props){
  	super(props)

  	this.state = {attendance:null}
  }
  render(){
      let name = this.props.user.title;
    
    return( <div id="" className="jumbotron">
              <div><img height="50" src="./public/img/hivelogo.png"/></div>
              <h1>Hello {name + " " + this.props.user.lastName}</h1>
              {(this.props.user.courseStr.substring(0,1) != 's') ? (<p>
              	<a className="btn btn-info btn-lg" href="https://sites.google.com/a/ms442.org/the-hub">
              	<span className="glyphicon glyphicon-briefcase"></span>Visit the Hub
              </a>
              <a className="btn btn-info btn-lg" href="https://docs.google.com/forms/d/e/1FAIpQLSf3LAsfrbyfJLvE55AtkOE4W2BJV4rXnb0CACBMJ4aDIbtHLw/viewform?usp=sf_link">
          <span className="glyphicon glyphicon-wrench"></span> Tech Repair
        </a>
        <span className="btn btn-info btn-lg" onClick={this.viewAttendance.bind(this)}><span className="glyphicon glyphicon-check"/> Attendance/Uniform</span>
              	</p>) : (<a className="btn btn-info btn-lg" href="https://docs.google.com/forms/d/e/1FAIpQLSf3LAsfrbyfJLvE55AtkOE4W2BJV4rXnb0CACBMJ4aDIbtHLw/viewform?usp=sf_link">
          <span className="glyphicon glyphicon-wrench"></span> Tech Repair
        </a>)}
        {!!this.state.attendance ? <LateOOUForm students={this.state.attendance} /> : null}
	    </div> );
  }

  viewAttendance(){
  	this.setState({attendance:[{entryID:1,name:"cookie"}]})
  }

}

module.exports = GreetingJumbo;