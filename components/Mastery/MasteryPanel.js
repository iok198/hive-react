import React from 'react'

class MasteryPanel extends React.Component {
    render(){
        return <div id={"mastery-col-head-" + this.props.mRecord.courseStrLOID } className="mastery-column" style={{left: 180px}}>
                  <div className="panel panel-default">
                    <div id="" className="panel-body">
                      <span className="badge" ># Assessment(s)</span>
                      <span className="lo-text-span">I can reflect on my own learning and set goals.</span>
                      <br />
                      <span id="" className="badge badgeNY">0</span>
                      <span id="" className="badge badgeA">0</span>
                      <span id="" className="badge badgeM">27</span>
                      <span id="" className="badge badgeE">0</span>
                    </div>
                  </div>
               </div>
    }
}

module.exports = MasteryPanel