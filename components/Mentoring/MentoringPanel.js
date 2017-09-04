import React from 'react'
import ReactDOM from 'react-dom'
var MentoringComments = require('./MentoringComments.js')

class MentoringPanel extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return (<div id="" className="panel panel-default">
              		<div id="" className="panel-body">
              			<p>{this.props.goal.personalReflection + '. ' + this.props.goal.masteryReflection + '. ' + this.props.goal.behaviorReflection + '. '} <br/><strong>{"New Goal: " + this.props.goal.goalText}</strong>
              			</p>
              			<div className="col-xs-12">
							<div className="panel panel-default">
							  <div className="panel-heading">
							    {"Comments"}
							  </div>
							  {/*<div className="panel-body">
							    {!!this.props.bdr.restoreAnecdote ? this.props.bdr.restoreAnecdote : this.createRestoreDialog(this.props.bdr.entryID)}
							  </div>*/}
					      <MentoringComments comments={this.props.goal.comments} goalID={this.props.goal.entryID} studentUDID={this.props.goal.studentUDID} updateGoalComments={this.props.updateGoalComments} viewer={this.props.viewer}/>
						</div>
							</div>
              		</div>
              	</div>
              			)
	}
}

module.exports = MentoringPanel