import React from 'react'
//possible parent: MasteryStuRow.js
class MasteryStuKeyTD extends React.Component {
    render(){
        return <td id={"mastery-col-key" + this.props.stuUDID } className="mastery-column" >
                      <span>{this.props.stuUDID}</span>
                      <br />
                      
                      <span id="" className="badge badgeNY" >{this.props.mRating0s[1]}</span>
                      <span id="" className="badge badgeA">{this.props.mRating0s[2]}</span>
                      <span id="" className="badge badgeM">{this.props.mRating0s[3]}</span>
                      <span id="" className="badge badgeE">{this.props.mRating0s[4]}</span>

               </td>
    }
}

module.exports = MasteryStuKeyTD