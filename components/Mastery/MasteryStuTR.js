import React from 'react'
var MasteryStuTD = require('./MasteryStuTD.js')
var MasteryStuKeyTD = require('./MasteryStuKeyTD.js')
//possible parents: GradeJumbo.js
class MasteryStuTR extends React.Component {
    constructor(props){
        super(props)
        this.courseLOIDs = Object.keys(this.props.stuData)
    }
    render(){
        return <tr id={"mastery-row-" + this.props.stuUDID } className="mastery-row" >
        <MasteryStuKeyTD key={"mKeyTD" + this.props.stuUDID} mRating0s={this.props.mRating0s} mRatingStr={this.props.mRatingStr} stuUDID={this.props.stuUDID} stuBio={this.props.stuBio}/>
        {[0,1,2,3].map((id,index) => {
        if(!!this.courseLOIDs[id+4*this.props.page] ){
            console.log(this.props.stuData[this.courseLOIDs[id+4*this.props.page]])
            console.log(id+4*this.props.page)
            return <MasteryStuTD key={this.courseLOIDs[id+4*this.props.page] + '-' + this.props.stuUDID} mArrKey={!!this.props.stuData[this.courseLOIDs[id+4*this.props.page]] ? this.props.stuData[this.courseLOIDs[id+4*this.props.page]].mArrKey : -1} ratingData={!!this.props.stuData[this.courseLOIDs[id+4*this.props.page]] ? this.props.stuData[this.courseLOIDs[id+4*this.props.page]] : {mcountA:0,mcountE:0,mcountM:0,mcountN:0,mRating0:1}} colOffset={id} changer={this.props.changer}/>
            } else return null
        })}
        </tr>
    }
}

module.exports = MasteryStuTR