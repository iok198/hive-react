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
    
    
    var columns = {}
    
    masteryArr.map((mRecord) => {
      columns[mRecord.courseStrLOID] = null
    })
    
    var rowsByStu = {}
    
    for (var i=0;i<sMasteryArr;i++){
        var cLs = sMasteryArr[i].courseStrLOIDsID.split("-")
        if (rowsByStu.hasOwnProperty(sMasteryArr[i].stuUDID)) { rowsByStu[sMasteryArr[i].stuUDID][cLs[0] + "-" + cLs[1]] = sMasteryArr[i]}
        else {rowsByStu[sMasteryArr[i].stuUDID] = columns}
    }    

    
    console.log(sFuns)
    console.log(columns)
    console.log(rowsByStu)
    return masteryArr.map((mRecord,id) => (<MasteryPanel key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id}/>));
  }

}

module.exports = GradeJumbo;