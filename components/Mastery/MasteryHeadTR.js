import React from 'react'
import MasteryHeadTD from './MasteryHeadTD.js'
//possible parents: GradeJumbo.js
class MasteryHeadTR extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <tr id={"mastery-row-head"} className="mastery-row" >
                <td>{"Student / Learning Outcome"}
                    <div className="btn-group-vertical" role="group" aria-label="...">
                        <button type="button" className="btn btn-default" onClick={this.props.upVPage}><span className="glyphicon glyphicon-arrow-up" ></span></button>
                        <button type="button" className="btn btn-default" onClick={this.props.downVPage}><span className="glyphicon glyphicon-arrow-down" ></span></button>
                    </div>
                </td>
                {[0, 1, 2, 3].map((id, index) => {
                    if (!!this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id + 4 * this.props.page]]) {
                        return <MasteryHeadTD key={this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id + 4 * this.props.page]].courseStrLOID} mRecord={(!!this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id + 4 * this.props.page]]) ? this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id + 4 * this.props.page]] : { mcountN: 0, mcountA: 0, mcountM: 0, mcountE: 0 }} colOffset={id} />
                    }
                    else return null
                })
                }
            </tr>
        )
    }
}

export default MasteryHeadTR