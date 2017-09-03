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
					 {(!!this.props.goals.length) ? this.props.goals.map((goal)=>(<MentoringPanel goal={goal} key={goal.entryID}/>)) : 'No mentoring goals yet.'}</div>)
	}
}

module.exports = MentoringContainer