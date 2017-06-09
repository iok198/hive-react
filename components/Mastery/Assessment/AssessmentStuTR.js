import React from 'react'
import AssessmentStuTD from './AssessmentStuTD.js'
import AssessmentStuKeyTD from './AssessmentStuKeyTD.js'
//possible parents: GradeJumbo.js
class AssessmentStuTR extends React.Component {
    constructor(props) {
        super(props)
        this.state = { courseLOIDs: Object.keys(this.props.stuData) }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ courseLOIDs: Object.keys(nextProps.stuData) })
    }

    render() {
        return (
            <tr id={"Assessment-row-" + this.props.stuUDID} className="Assessment-row" >
                <AssessmentStuKeyTD key={"mKeyTD" + this.props.stuUDID} mRating0s={this.props.mRating0s} mRatingStr={this.props.mRatingStr} stuUDID={this.props.stuUDID} stuBio={this.props.stuBio} />
                {[0, 1, 2, 3].map((id, index) => {
                    if (!!this.state.courseLOIDs[id + 4 * this.props.page]) {
                        //console.log(this.props.stuData)
                        //console.log(this.state.courseLOIDs[id+4*this.props.page])
                        //console.log(id+4*this.props.page)
                        return <AssessmentStuTD key={this.state.courseLOIDs[id + 4 * this.props.page] + '-' + this.props.stuUDID} mArrKey={!!this.props.stuData[this.state.courseLOIDs[id + 4 * this.props.page]] ? this.props.stuData[this.state.courseLOIDs[id + 4 * this.props.page]].mArrKey : -1} ratingData={!!this.props.stuData[this.state.courseLOIDs[id + 4 * this.props.page]] ? this.props.stuData[this.state.courseLOIDs[id + 4 * this.props.page]] : { mcountA: 0, mcountE: 0, mcountM: 0, mcountN: 0, mRating0: 1 }} colOffset={id} changer={this.props.changer} />
                    } else return null
                })}
            </tr>
        )
    }
}

export default AssessmentStuTR