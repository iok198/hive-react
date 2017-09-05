import React from 'react'
import ReactDOM from 'react-dom'
var postRequestForReact = require('../../utilities/postRequestForReact.js')

class MentoringComments extends React.Component {
  constructor(props){
    super(props)
    this.state = {newCommentText:'',newCommentRating:''}
    this.changeNewCommentText = this.changeNewCommentText.bind(this)
    this.changeNewCommentRating = this.changeNewCommentRating.bind(this)
    this.submitNewComment = this.submitNewComment.bind(this)
    this.mRs = ['','Not Yet','Approaching','Meeting','Exceeding']
    this.processDate = this.processDate.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  resetState(){
  	this.setState({newCommentText:'',newCommentRating:''})
  }

  render(){
    return (<ul className="list-group">
				{this.props.comments.map((comment,id) => <li key={"goalcomment" + id} className="list-group-item"><strong>{(comment.title && comment.lastName) ? comment.title + ' ' + comment.lastName + ': ' : "You: "}</strong>{comment.commentText}<br/>{this.processDate(comment.submissionDateTime) + (comment.commenterUDID == this.props.studentUDID ? '' :' - ' + this.mRs[parseInt(comment.goalMR)])}</li> )}
			{/* (i+16)%24 <= 12 ? ((i+16)%24 != 0 ? (i+16)%24 : 12) + 'am' : (((i+16)%24) - 12) + 'pm' */}
			<li className="list-group-item">
				<div className="form-group">
				  <label htmlFor="exampleTextarea">New Comment:</label>
				  <textarea className="form-control" id="exampleTextarea" rows="3" onChange={function(e){this.changeNewCommentText(e.target.value)}.bind(this)} value={this.state.newCommentText}></textarea>
				  <br/>
				  <div className="btn-group" role="group" aria-label="...">
					  <button type="button" className={"btn btn-default " + (this.state.newCommentRating == 1 ? 'active' : '')} onClick={function(e){this.changeNewCommentRating(1)}.bind(this)}>Not Yet</button>
					  <button type="button" className={"btn btn-default " + (this.state.newCommentRating == 2 ? 'active' : '')} onClick={function(e){this.changeNewCommentRating(2)}.bind(this)}>Approaching</button>
					  <button type="button" className={"btn btn-default " + (this.state.newCommentRating == 3 ? 'active' : '')} onClick={function(e){this.changeNewCommentRating(3)}.bind(this)}>Meeting</button>
					  <button type="button" className={"btn btn-default " + (this.state.newCommentRating == 4 ? 'active' : '')} onClick={function(e){this.changeNewCommentRating(4)}.bind(this)}>Exceeding</button>
				  </div>
				  <button type="button" className="btn btn-primary" onClick={this.submitNewComment}>Submit</button>
				</div>
  			</li>
			</ul>)
  }

  changeNewCommentText(text){
  	this.setState({newCommentText:text})
  }

  changeNewCommentRating(rating){
  	this.setState({newCommentRating:rating})
  }

  submitNewComment(){
  	var comment = {commentText:this.state.newCommentText,goalMR:this.state.newCommentRating,goalID:this.props.goalID}
  	postRequestForReact('/sendgoalcomment', comment,this.props.updateGoalComments(comment))
  	this.resetState()
  }

  processDate(datestring){
  	if(!datestring) return "Just Submitted"
  	var datearr = datestring.split('T')
  	var timearr = datearr[1].split(":")
  	var timecombined = timearr[0] + ":" + timearr[1]
  	var date = datearr[0].replace(new RegExp('-','g'),'/')
  	var datetime = date + " " + timecombined
  	var dateAdjusted = new Date(new Date(datetime) - (1000*60*60*12 + 1))
  	var dateS = (dateAdjusted.getMonth() + 1) + '/' + dateAdjusted.getDate() + '/' + dateAdjusted.getFullYear()

  	var i = parseInt(timearr[0])
  	var timestring = (i+16)%24 <= 12 ? ((i+16)%24 != 0 ? (i+16)%24 : 12) + ':' + timearr[1] + 'am' : (((i+16)%24) - 12) + ':' + timearr[1] + 'pm'
  	  	
  	
  	//console.log(dateS + ' ' + timestring)

  	return dateS + ' ' + timestring
  }

}

module.exports = MentoringComments