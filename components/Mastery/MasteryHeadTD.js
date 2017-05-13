import React from 'react'

class MasteryHeadTD extends React.Component {
    render(){
        return <td id={"mastery-col-head-" + this.props.mRecord.courseStrLOID } className="mastery-column" style={{left: (40 + this.props.colOffset*140) + 'px'}}>
                      <span className="badge" ># Assessment(s)</span>
                      <span className="lo-text-span">{this.props.mRecord.LOText}</span>
                      <br />
                      <span id="" className="badge badgeNY">{this.props.mRecord.mcountN}</span>
                      <span id="" className="badge badgeA">{this.props.mRecord.mcountA}</span>
                      <span id="" className="badge badgeM">{this.props.mRecord.mcountM}</span>
                      <span id="" className="badge badgeE">{this.props.mRecord.mcountE}</span>
               </td>
    }
}

module.exports = MasteryHeadTD