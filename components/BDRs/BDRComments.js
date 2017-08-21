import React from 'react'

class BDRComments extends React.Component {
	constructor(props){
	super(props)
	}

	render(){
		return (<div>{(this.props.comments.length >=1) ? this.props.comments[0].commentText : null}</div>)
		//return (<div>{this.props.comments.map((comment)=>(<p>{comment.commentText}</p>))}</div>)
	}
}

module.exports = BDRComments