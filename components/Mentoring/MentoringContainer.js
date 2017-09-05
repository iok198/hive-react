import React from 'react'
import ReactDOM from 'react-dom'
var MentoringPanel = require('./MentoringPanel.js')
var NewGoalPanel = require('./NewGoalPanel.js')

class MentoringContainer extends React.Component {
	constructor(props){
		super(props)
		//this.getGoals = this.getGoals.bind(this)
		console.log(this.props)
	}

	render(){
		return (<div className="container">
					<NewGoalPanel menteeUDID={this.props.mentee.entryID}/>
					<div className="col-xs-8">
					 {(!!this.props.goals.length) ? this.props.goals.map((goal,id)=>(<MentoringPanel goal={goal} key={goal.entryID} updateGoalComments={function(comment){this.props.updateGoalComments(id,comment)}.bind(this)} goalArrID={id} viewer={this.props.viewer}/>)) : 'No mentoring goals yet.'}</div>
					 </div>)

	}
}

module.exports = MentoringContainer