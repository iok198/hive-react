import React from 'react';
import ReactDOM from 'react-dom';
var LateOOUForm = require('./LateOOUForm.js')
var getRequestForReact = require('../../utilities/getRequestForReact.js')
var postRequestForReact = require('../../utilities/postRequestForReact.js')

class GreetingJumbo extends React.Component {
  render() {
    let name = this.props.user.title;

    return (
      <div id="" className="jumbotron">
        <div><img height="50" src="./public/img/hivelogo.png" /></div>
        <h1>Hello {name + " " + this.props.user.lastName}</h1>
        {(this.props.user.courseStr.substring(0, 1) != 's') ? (<p>
          <a className="btn btn-info btn-lg" href="https://sites.google.com/a/ms442.org/the-hub">
            <span className="glyphicon glyphicon-briefcase"></span> {"Visit the Hub"}
          </a>
          <a className="btn btn-info btn-lg" href="https://docs.google.com/forms/d/e/1FAIpQLSf3LAsfrbyfJLvE55AtkOE4W2BJV4rXnb0CACBMJ4aDIbtHLw/viewform?usp=sf_link">
            <span className="glyphicon glyphicon-wrench"></span> Tech Repair
        </a>
        </p>) : (<a className="btn btn-info btn-lg" href="https://docs.google.com/forms/d/e/1FAIpQLSf3LAsfrbyfJLvE55AtkOE4W2BJV4rXnb0CACBMJ4aDIbtHLw/viewform?usp=sf_link">
          <span className="glyphicon glyphicon-wrench"></span> Tech Repair
        </a>)}
        <a className="btn btn-info btn-lg" href="https://docs.google.com/forms/d/e/1FAIpQLSfWXDJ3tcn_ge0LO2lQMtwxZpc5N9y1PO6d5ipifl9p0zABLQ/viewform?usp=sf_link">
          <span className="glyphicon glyphicon-education"></span> Tech Tutoring
        </a>
      </div>
    );
  }

  viewAttendance(){
  	getRequestForReact('/attendance',function(arr){this.setState({attendance:arr})}.bind(this))
  	//this.setState({attendance:[{entryID:1,name:"cookie"}]})
  }

  sendLateOOU(studentUDID,lateoou){
  	var swipCode = (lateoou == 'Late & Out of Uniform Arrival: ' ? 2 : 1)
  	var d = new Date()
  	var incidentDate = d.getFullYear() + '-' + (d.getMonth() + 101 + '').substring(1) + '-' + (d.getDate() + 100 + '').substring(1)
  	var incidentDateTime = incidentDate + ' 08:06'
  	var postObject = {studentUDID:studentUDID,incidentDateTime:incidentDateTime,incidentPeriod:'1',othersInvolved:'',problemBehavior:lateoou + (d.getMonth() + 101 + '').substring(1) + '-' + (d.getDate() + 100 + '').substring(1),behaviorAnecdote:'', teacherResponse:'Student was referred to late dismissal.',possibleMotivation:'',location:'',staffUDID:3,swipCode:swipCode}

  	postRequestForReact('/sendbdr', postObject,this.viewAttendance.bind(this))
  }

  upgradeLateOOU(studentUDID,comment,bdrID){
  	//bdrID,commenterID,commentText,commentDT
  	var postObject = {commenterID:this.props.viewer.entryID,commentText:comment,bdrID:bdrID}
  	//console.log(studentUDID,comment)
  	postRequestForReact('/upgradelateoou',postObject,this.viewAttendance.bind(this))
  }

  restoreLateOOU(studentUDID,comment,bdrID){
  	//console.log(studentUDID,comment)
  	var postObject = {commenterID:this.props.viewer.entryID,commentText:comment,bdrID:bdrID,restoring:true}
  	postRequestForReact('/sendbdrcomment',postObject,this.viewAttendance.bind(this))

  }

}

module.exports = GreetingJumbo;