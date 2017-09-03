import React from 'react'
import ReactDOM from 'react-dom'
var studentList = require('../../devutil/allstudents.js')
var datesList = require('../../devutil/dates.js')
var locations = require('../../devutil/locations.js')
var possiblemotivations = require('../../devutil/possiblemotivations.js')
var behaviors = require('../../devutil/behaviors.js')

class NewBDRPanel extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (<div id="" className="panel panel-default">
    			<div id="" className="panel-heading">
    			Write a New Mentoring Goal
    			</div>
	      		<div id="" className="panel-body">
    			<form role="form" id="bdrForm">
                  <div className="form-group">
                    <label htmlFor="bdrSelStu"><span className="glyphicon glyphicon-user"></span> Student Name (Class):</label>
                    <select className="form-control bdrSel" id="bdrSelStu">{studentList.map((student)=>(<option key={student.entryID}>{student.name}</option>))}</select>
                    <span id="bdrPrevStu" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelDate"><span className="glyphicon glyphicon-calendar"></span> Date:</label>
                    <select className="form-control bdrSel" id="bdrSelDate">{datesList.map((date,id)=>(<option key={id}>{date}</option>))}</select>
                    <span id="bdrPrevDate" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelTimeH"><span className="glyphicon glyphicon-time"></span> Time:</label>
                    <input type="text" id="bdrSelTimeH"   />
                    <input type="text" id="bdrSelTimeM"   />
                    <input type="text" id="bdrSelTimeAMPM"   />
                    <div id="sliderHour" className="form-control" ></div>
                    <div id="sliderMinute" className="form-control" ></div>
                    <br/>
                    <label htmlFor="bdrSelLoc"><span className="glyphicon glyphicon-globe"></span> Location:</label>
                    <select className="form-control bdrSel" id="bdrSelLoc">{locations.map((loc,id)=>(<option key={id}>{loc}</option>))}</select>
                    <span id="bdrPrevLoc" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelOthers"><span className="glyphicon glyphicon-tent"></span> Others Involved:</label>
                    <select className="form-control bdrSel" id="bdrSelOthers" multiple><option>Larry</option><option>Mo</option></select>
                    <span id="bdrPrevOthers" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelBeh"><span className="glyphicon glyphicon-exclamation-sign"></span> Behavior:</label>
                    <select className="form-control bdrSel" id="bdrSelBeh">{behaviors.map((beh,id)=>(<option key={id}>{beh}</option>))}</select>
                    <span id="bdrPrevBeh" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrTABehI"><span className="glyphicon glyphicon-comment"></span> Incident Description:</label>
                    <textarea className="form-control bdrTA" id="bdrTABehI" rows="5"></textarea>
                    <span id="bdrPrevBehI" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrSelPM"><span className="glyphicon glyphicon-grain"></span> Possible Motivation:</label>
                    <select className="form-control bdrSel" id="bdrSelPM">{possiblemotivations.map((pm,id)=>(<option key={id}>{pm}</option>))}</select>
                    <span id="bdrPrevPM" className="bdrPrevSpan"></span>
                    <br/>
                    <label htmlFor="bdrTAResponse"><span className="glyphicon glyphicon-comment"></span> Response/Intervention:</label>
                    <textarea className="form-control bdrTA" id="bdrTAResponse" rows="5"></textarea>
                    <span id="bdrPrevResponse" className="bdrPrevSpan"></span>
                  </div>
                </form>
                </div></div>)
  }
}

module.exports = NewBDRPanel