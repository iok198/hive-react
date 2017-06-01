import React from 'react'
//possible parent: MasteryStuRow.js
class MasteryStuKeyTD extends React.Component {
    render(){
        return <td id={"mastery-col-key" + this.props.stuUDID } className="mastery-column" >
                      <span>{this.props.stuBio.name}</span>
                      <br />
                      <span id="" className="label label-default">{(0*this.props.mRating0s[1] + 
                      0.65*this.props.mRating0s[2] + 1*this.props.mRating0s[3] + 1.2*this.props.mRating0s[4])/(this.props.mRating0s[1] + 
                      this.props.mRating0s[2] + this.props.mRating0s[3] + this.props.mRating0s[4])}</span>
                      <br />
                      <span id="" className="badge badgeNY" >{this.props.mRating0s[1]}</span>
                      <span id="" className="badge badgeA">{this.props.mRating0s[2]}</span>
                      <span id="" className="badge badgeM">{this.props.mRating0s[3]}</span>
                      <span id="" className="badge badgeE">{this.props.mRating0s[4]}</span>
               </td>
    }
}

module.exports = MasteryStuKeyTD