import React from 'react'
import AssessmentHeadTD from './AssessmentHeadTD.js'
//possible parents: GradeJumbo.js
class AssessmentHeadTR extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <tr id={"Assessment-row-head"} className="Assessment-row" >
                <td>{"Student / Learning Outcome"}
                    <div className="btn-group-vertical" role="group" aria-label="...">
                        <button type="button" className="btn btn-default" onClick={this.props.upVPage}><span className="glyphicon glyphicon-arrow-up" ></span></button>
                        <button type="button" className="btn btn-default" onClick={this.props.downVPage}><span className="glyphicon glyphicon-arrow-down" ></span></button>
                    </div>
                </td>
                {[0, 1, 2, 3].map((id, index) => {
                    if (!!this.props.parsedAssessment.AssessmentArrS[Object.keys(this.props.parsedAssessment.AssessmentArrS)[id + 4 * this.props.page]]) {
                        return <AssessmentHeadTD key={Object.keys(this.props.parsedAssessment.AssessmentArrS)[id + 4 * this.props.page]} mRecord={(!!this.props.parsedAssessment.AssessmentArrS[Object.keys(this.props.parsedAssessment.AssessmentArrS)[id + 4 * this.props.page]]) ? this.props.parsedAssessment.AssessmentArrS[Object.keys(this.props.parsedAssessment.AssessmentArrS)[id + 4 * this.props.page]] : { mcountN: 0, mcountA: 0, mcountM: 0, mcountE: 0, mcountU: 'All' }} colOffset={id} />
                    }
                    else return null
                })
                }
            </tr>
        )
    }
}

export default AssessmentHeadTR