import React from 'react'

class MasteryStuPanel extends React.Component {
    render(){
        return <ul className="list-group">
                {/* <div id={"mastery-col-" + this.props.ratingData.courseStrLOIDsID } className="mastery-column" style={{left: (40 + this.props.colOffset*140) + 'px'}}>
                  <div className="panel panel-default">
                    <div id="" className="panel-body">
                      <span className="lo-text-span">{this.props.ratingData.mRating0}</span>
                      <br />
                      <span id="" className="badge badgeNY">{this.props.ratingData.mcountN}</span>
                      <span id="" className="badge badgeA">{this.props.ratingData.mcountA}</span>
                      <span id="" className="badge badgeM">{this.props.ratingData.mcountM}</span>
                      <span id="" className="badge badgeE">{this.props.ratingData.mcountE}</span>
                    </div>
                  </div> */}
                  {console.log(this.props.parsedMastery.rowsByStu[this.props.viewer.entryID])}
                {Object.keys(this.props.parsedMastery.rowsByStu[this.props.viewer.entryID]).map(function(key,id,arr){
                  if(!!this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key]){
                  var mRating = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mRating0
                  var aRsN = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountN
                  var aRsA = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountA
                  var aRsM = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountM
                  var aRsE = this.props.parsedMastery.rowsByStu[this.props.viewer.entryID][key].mcountE
                  var LO = this.props.parsedMastery.masteryArrS[key]
                  var mRatings = ["Unassessed","Not Yet","Approaching","Meeting","Exceeding"]
                  var masteryString = mRatings[mRating]
                  return (<li className="list-group-item" key={key}>
                    <div className="container">
                      <div className="col-xs-9">{LO.LOText}</div>
                      <div className="col-xs-3"><span className="label label-default">{masteryString}</span>
                      </div>
                    </div>
                    </li>)} else {
                    return null
                  }
                }.bind(this))}
               </ul>
    }
}

module.exports = MasteryStuPanel