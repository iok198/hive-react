import React from 'react'

class BDRComments extends React.Component {
	constructor(props){
	super(props)
	}

	render(){
		return (<ul className="list-group">
				{this.props.comments.map((comment) => <li key={"bdrcomment" + comment.entryID} className="list-group-item">{comment.commentText}</li> )}
			</ul>)
		//return (<div>{(this.props.comments.length >=1) ? this.props.comments[0].commentText : null}</div>)
		//return (<div>{this.props.comments.map((comment)=>(<p>{comment.commentText}</p>))}</div>)
	}
}

module.exports = BDRComments