import React from 'react'
var MasteryStuTD = require('./MasteryStuTD.js')
//possible parents: GradeJumbo.js
class MasteryStuTR extends React.Component {
    constructor(props){
        super(props)
        this.courseLOIDs = Object.keys(this.props.stuData)
    }
    render(){
        return <tr id={"mastery-row-" + this.props.key } className="mastery-row" >
        {[0,1,2,3,4].map((id,index) => (<MasteryStuTD key={this.courseLOIDs[id+5*this.props.page] + '-' + this.props.key} ratingData={(!!this.props.stuData[this.courseLOIDs[id+5*this.props.page]]) ? this.props.stuData[this.courseLOIDs] : {mcountN:0, mcountA:0, mcountM:0, mcountE:0, mRating0:1}} colOffset={id}/>))}
        </tr>
    }
}

module.exports = MasteryStuTR