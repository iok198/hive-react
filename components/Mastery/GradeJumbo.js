import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')

class GradeJumbo extends React.Component {
  constructor(){
    super();
  }
  
  render(){
      let list = this._getMastery();
    
    return( <div id="" className="jumbotron">
              <h1>Hello Jared</h1>
              {list}
	    </div> );
  }
  
  _getMastery(){
    const sMasteryArr = this.props.mArr[0]
    const masteryArr = this.props.mArr[1]
    const courseStrArr = this.props.mArr[2].split('|')
    
    const LOsArr = masteryArr.map((mRecord) => {
      var LOObj = {}
      LOObj.str = mRecord.courseStrLOID
      LOObj.data = {}
      return LOObj
    })
    
    var rowsByStu = {}
    
    sMasteryArr.map((mRecord) => {
      if (rowsByStu.hasOwnProperty(mRecord.stuUDID)) { rowsByStu[mRecord.stuUDID].append(mRecord)}
      else {rowsByStu[mRecord.stuUDID] = []}
    })
    console.log(LOsArr)
    console.log(rowsByStu)
    return masteryArr.map((mRecord,id) => (<MasteryPanel key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id}/>));
  }

}

module.exports = GradeJumbo;