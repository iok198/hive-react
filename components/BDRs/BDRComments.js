import React from 'react'
var postRequestForReact = require('../../utilities/postRequestForReact.js')


class BDRComments extends React.Component {
	constructor(props){
	super(props)
	this.state = {newCommentText:'',restoring:false}
	this.changeNewCommentText = this.changeNewCommentText.bind(this)
    this.toggleRestoring = this.toggleRestoring.bind(this)
    this.submitNewComment = this.submitNewComment.bind(this)
    this.resetState = this.resetState.bind(this)
	}

	resetState(){
  	this.setState({newCommentText:'',restoring:false})
  }

	render(){
		return (<ul className="list-group">
				{this.props.comments.map((comment,id) => (<li key={"bdrcomment" + id} className="list-group-item"><strong>{comment.title + ' ' + comment.lastName + ': ' }</strong>{comment.commentText}</li>) )}
			    {this.props.restored ? null : <li className="list-group-item">
					<div className="form-group">
					  <label htmlFor="exampleTextarea">New Comment:</label>
					  <textarea className="form-control" id="exampleTextarea" rows="3" onChange={function(e){this.changeNewCommentText(e.target.value)}.bind(this)} value={this.state.newCommentText}></textarea>
					  <br/>
					  {this.props.viewer.courseStr.substring(0,1) != 's' ? (<div className="checkbox" onClick={this.toggleRestoring}>
					      <label><input type="checkbox" checked={this.state.restoring}/>Restore with this comment.</label>
					  </div>) : null}
					  <button type="button" className="btn btn-primary" onClick={this.submitNewComment}>Submit</button>
					</div>
	  			</li>}
			</ul>)
		//return (<div>{(this.props.comments.length >=1) ? this.props.comments[0].commentText : null}</div>)
		//return (<div>{this.props.comments.map((comment)=>(<p>{comment.commentText}</p>))}</div>)
	}

  changeNewCommentText(text){
  	this.setState({newCommentText:text})
  }

  toggleRestoring(){
  	var restoring = !this.state.restoring
  	this.setState({restoring:restoring})
  }

  submitNewComment(){
  	var postObj = {bdrID:this.props.bdr.entryID,commenterID:this.props.viewerID,commentText:this.state.newCommentText,restoring:this.state.restoring}
  	console.log(postObj)
  	postRequestForReact('/sendbdrcomment',postObj,this.props.updateBDRComments(Object.assign(postObj,{title:this.props.viewer.title,lastName:this.props.viewer.lastName}) ))
  	this.resetState()
  }
}

module.exports = BDRComments