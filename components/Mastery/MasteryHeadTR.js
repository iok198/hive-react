import React from 'react'
var MasteryHeadTD = require('./MasteryHeadTD.js')
//possible parents: GradeJumbo.js
class MasteryHeadTR extends React.Component {
    constructor(props){
        super(props)
        
    }
    render(){
        return <tr id={"mastery-row-head" } className="mastery-row" >
        <td>{"Student / Learning Outcome"}</td>
        {[0,1,2,3].map((id,index) => 
        {
        if(!!this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]]){
        return <MasteryHeadTD key={this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]].courseStrLOID} mRecord={(!!this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]]) ? this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]] : {mcountN:0, mcountA:0, mcountM:0, mcountE:0}} colOffset={id}/>
        }
            else return null
        })
        }
        </tr>
    }
}

module.exports = MasteryHeadTR