import React from 'react'
import ReactDOM from 'react-dom'
var postRequestForReact = require('../../utilities/postRequestForReact.js')

class NewGoalPanel extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    	masteryReflection:'',
    	behaviorReflection:'',
    	personalReflection:'',
    	newGoalText:'',
    	newGoalStrategy:''
    }
    this.updateNewGoalState = this.updateNewGoalState.bind(this)
    this.setState = this.setState.bind(this)
    this.submitNewGoal = this.submitNewGoal.bind(this)
  }
  render(){
    return (<div className="col-xs-4">
    	<div id="" className="panel panel-default">
    			<div id="" className="panel-heading">
    			Write a New Mentoring Goal
    			</div>
	      		<div id="" className="panel-body">
	      		<form role="form" id="mentoringForm">
				  <div className="form-group">
				    <label htmlFor="mentoringTAmastery"><span className="glyphicon glyphicon-comment"></span> What are some
				        learning outcomes that you have attempted to master this week? How did you do?</label>
				    <textarea className="form-control" id="mentoringTAmastery" rows="3" onChange={function(e){this.updateNewGoalState("masteryReflection",e.target.value)()}.bind(this)}></textarea>
				    <span id="mentoringPrevmastery" className="mentoringPrevSpan"></span>
				    <br/>
				    
				    <label htmlFor="mentoringTAbehavior"><span className="glyphicon glyphicon-comment"></span> How many SWIPs do you currently have?</label>
				    <textarea className="form-control" id="mentoringTAbehavior" rows="3" onChange={function(e){this.updateNewGoalState("behaviorReflection",e.target.value)()}.bind(this)}></textarea>
				    <span id="mentoringPrevbehavior" className="mentoringPrevSpan"></span>
				    <br/>
				    
				    <label htmlFor="mentoringTApersonal"><span className="glyphicon glyphicon-comment"></span> How are you feeling this week at school? What are some good things that have happened at school?
				    What are some things you have struggled with at school?</label>
				    <textarea className="form-control" id="mentoringTApersonal" rows="3" onChange={function(e){this.updateNewGoalState("personalReflection",e.target.value)()}.bind(this)}></textarea>
				    <span id="mentoringPrevpersonal" className="mentoringPrevSpan"></span>
				    <br/>
				    
				    <label htmlFor="mentoringTAgoal"><span className="glyphicon glyphicon-comment"></span> What is your new goal?</label>
				    <textarea className="form-control" id="mentoringTAgoal" rows="3" onChange={function(e){this.updateNewGoalState("newGoalText",e.target.value)()}.bind(this)}></textarea>
				    <span id="mentoringPrevgoal" className="mentoringPrevSpan"></span>
				    <br/>
				  
				    <label htmlFor="mentoringTAstrategy"><span className="glyphicon glyphicon-comment"></span> What are some things you can do to help
				        accomplish your new goal?</label>
				    <textarea className="form-control" id="mentoringTAstrategy" rows="3" onChange={function(e){this.updateNewGoalState("newGoalStrategy",e.target.value)()}.bind(this)}></textarea>
				    <span id="mentoringPrevstrategy" className="mentoringPrevSpan"></span>
				    <br/>
				  <button type="button" className="btn btn-primary" onClick={this.submitNewGoal}>Submit</button>				    
				  </div>
				</form>
				</div>
				</div></div>)
  }

  updateNewGoalState(property,value){
  	var setState = this.setState
  	return () => {
  		var newState = {}
  		newState[property] = value
  		setState(newState)
  	}
  }

  submitNewGoal(){
  	var goalObj = {studentUDID:this.props.menteeUDID,goalText:this.state.newGoalText,masteryReflection:this.state.masteryReflection,behaviorReflection:this.state.behaviorReflection,personalReflection:this.state.personalReflection,goalStrategy:this.state.newGoalStrategy}
  	postRequestForReact('/sendgoal', goalObj,
  		function(res){
  			goalObj.entryID = res.insertId
  			this.props.appendGoal(goalObj)
  		}.bind(this))
  }

}

module.exports = NewGoalPanel