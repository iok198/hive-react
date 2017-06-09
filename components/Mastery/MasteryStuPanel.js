import React from 'react'

class MasteryStuPanel extends React.Component {
  render() {
    return (
      <div id={"mastery-col-" + this.props.ratingData.courseStrLOIDsID} className="mastery-column" style={{ left: (40 + this.props.colOffset * 140) + 'px' }}>
        <div className="panel panel-default">
          <div id="" className="panel-body">
            <span className="lo-text-span">{this.props.ratingData.mRating0}</span>
            <br />
            <span id="" className="badge badgeNY">{this.props.ratingData.mcountN}</span>
            <span id="" className="badge badgeA">{this.props.ratingData.mcountA}</span>
            <span id="" className="badge badgeM">{this.props.ratingData.mcountM}</span>
            <span id="" className="badge badgeE">{this.props.ratingData.mcountE}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default MasteryStuPanel