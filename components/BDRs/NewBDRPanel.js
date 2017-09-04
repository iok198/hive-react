import React from 'react'
import ReactDOM from 'react-dom'
var studentList = require('../../devutil/allstudents.js')
var datesList = require('../../devutil/dates.js')
var locations = require('../../devutil/locations.js')
var possiblemotivations = require('../../devutil/possiblemotivations.js')
var behaviors = require('../../devutil/behaviors.js')
var hours = require('../../devutil/hours.js')
var minutes = require('../../devutil/minutes.js')
var postRequestForReact = require('../../utilities/postRequestForReact.js')


class NewBDRPanel extends React.Component {
  constructor(props){
    super(props)
    this.state = {studentUDID:null,incidentDate:'',incidentTimeH:'',incidentTimeM:'',othersInvolved:'',problemBehavior:'',behaviorAnecdote:'', teacherResponse:'',possibleMotivation:'',location:''}
    this.updateNewBDRState = this.updateNewBDRState.bind(this)
    this.setState = this.setState.bind(this)
    this.submitNewBDR = this.submitNewBDR.bind(this)

  }
  render(){
    return (<div id="" className="panel panel-default">
    			<div id="" className="panel-heading">
    			Write a New BDR
    			</div>
	      		<div id="" className="panel-body">
    			<form role="form" id="bdrForm">
                  <div className="form-group">
                    <label htmlFor="bdrSelStu"><span className="glyphicon glyphicon-user"></span> Student Name (Class):</label>
                    <select className="form-control bdrSel" id="bdrSelStu" onChange={function(e){this.updateNewBDRState('studentUDID',e.target.value)()}.bind(this)}>{studentList.map((student)=>(<option key={student.entryID} value={student.entryID}>{student.name}</option>))}</select>
                    <span id="bdrPrevStu" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelDate"><span className="glyphicon glyphicon-calendar"></span> Date:</label>
                    <select className="form-control bdrSel" id="bdrSelDate" onChange={function(e){this.updateNewBDRState('incidentDate',e.target.value)()}.bind(this)}>{datesList.map((date,id)=>(<option key={id}>{date}</option>))}</select>
                    <span id="bdrPrevDate" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelTimeH"><span className="glyphicon glyphicon-time"></span> Time:</label>
                    <select className="form-control bdrSel" id="bdrSelTimeH" onChange={function(e){this.updateNewBDRState('incidentTimeH',e.target.value)()}.bind(this)}>{hours.map((h,id)=>(<option key={id} value={id}>{h}</option>))}</select>
                    <select className="form-control bdrSel" id="bdrSelTimeM" onChange={function(e){this.updateNewBDRState('incidentTimeM',e.target.value)()}.bind(this)}>{minutes.map((m,id)=>(<option key={id} value={m.substring(1)}>{m}</option>))}</select>
                    <br/>
                    <label htmlFor="bdrSelLoc"><span className="glyphicon glyphicon-globe"></span> Location:</label>
                    <select className="form-control bdrSel" id="bdrSelLoc" onChange={function(e){this.updateNewBDRState('location',e.target.value)()}.bind(this)}>{locations.map((loc,id)=>(<option key={id}>{loc}</option>))}</select>
                    <span id="bdrPrevLoc" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelOthers"><span className="glyphicon glyphicon-tent"></span> Others Involved:</label>
                    <select className="form-control bdrSel" id="bdrSelOthers" multiple onChange={function(e){this.updateNewBDRState('othersInvolved',e.target.value)()}.bind(this)}>{studentList.map((student)=>(<option key={student.entryID}>{student.name}</option>))}</select>
                    <span id="bdrPrevOthers" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelBeh"><span className="glyphicon glyphicon-exclamation-sign"></span> Behavior:</label>
                    <select className="form-control bdrSel" id="bdrSelBeh" onChange={function(e){this.updateNewBDRState('problemBehavior',e.target.value)()}.bind(this)}>{Object.keys(behaviors).map((beh,id)=>(<option key={id}>{beh}</option>))}</select>
                    <span id="bdrPrevBeh" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrTABehI"><span className="glyphicon glyphicon-comment"></span> Incident Description:</label>
                    <textarea className="form-control bdrTA" id="bdrTABehI" rows="5" onChange={function(e){this.updateNewBDRState('behaviorAnecdote',e.target.value)()}.bind(this)}></textarea>
                    <span id="bdrPrevBehI" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelPM"><span className="glyphicon glyphicon-grain"></span> Possible Motivation:</label>
                    <select className="form-control bdrSel" id="bdrSelPM" onChange={function(e){this.updateNewBDRState('possibleMotivation',e.target.value)()}.bind(this)}>{possiblemotivations.map((pm,id)=>(<option key={id}>{pm}</option>))}</select>
                    <span id="bdrPrevPM" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrTAResponse"><span className="glyphicon glyphicon-comment"></span> Response/Intervention:</label>
                    <textarea className="form-control bdrTA" id="bdrTAResponse" rows="5" onChange={function(e){this.updateNewBDRState('teacherResponse',e.target.value)()}.bind(this)}></textarea>
                    <span id="bdrPrevResponse" className="bdrPrevSpan"></span>
                    <button type="button" className="btn btn-primary" onClick={this.submitNewBDR}>Submit</button>		
                  </div>
                </form>
                </div></div>)
  }

  updateNewBDRState(property,value){
  	var setState = this.setState
  	return () => {
  		var newState = {}
  		newState[property] = value
  		setState(newState)
  	}
  }

  submitNewBDR(){
    var periodArr = ["00:00:00","08:00:00","08:50:00","09:33:00","10:20:00","11:11:00","11:57:00","12:44:00","13:33:00","14:20:00","23:59:59"]
    var d = new Date(this.state.incidentDate)
    var df = d.getFullYear().toString() + "-" + (101+parseInt(d.getMonth())).toString().substring(1) + "-" +(100+parseInt(d.getDate())).toString().substring(1)
    var datetime = df + " " + this.state.incidentTimeH + ':' + this.state.incidentTimeM + ':00.0'

    let period
    for(var i=0;i<(periodArr.length - 1);i++){
          var startTime = new Date(this.state.incidentDate + ' ' + periodArr[i]).getTime()
          var endTime = new Date(this.state.incidentDate + ' ' + periodArr[i+1]).getTime()
          var incidentTime = new Date(this.state.incidentDate + ' ' + this.state.incidentTimeH + ':' + this.state.incidentTimeM + ':00').getTime()
         
          if((startTime < incidentTime) && (incidentTime <= endTime)){
              period = i
              break
          }
    }

    //console.log(datetime)
    /*console.log(periodArr)
    console.log(this.state.incidentTimeH + ":" + this.state.incidentTimeM)
    console.log(startTime + " " + endTime + " " + incidentTime)
    console.log(period)

    console.log(this.state.problemBehavior)
    console.log(behaviors[this.state.problemBehavior])*/
    var postObject = {studentUDID:this.state.studentUDID,incidentDateTime:datetime,incidentPeriod:period,othersInvolved:this.state.othersInvolved,problemBehavior:this.state.problemBehavior,behaviorAnecdote:this.state.behaviorAnecdote, teacherResponse:this.state.teacherResponse,possibleMotivation:this.state.possibleMotivation,location:this.state.location,staffUDID:this.props.authorUDID,swipCode:behaviors[this.state.problemBehavior]}
    console.log(postObject)
  	postRequestForReact('/sendbdr', postObject,this.props.newBDRTrigger)
  }

}

module.exports = NewBDRPanel