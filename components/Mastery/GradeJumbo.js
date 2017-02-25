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
    var farr = []
    
    for (var i=0;i<sMasteryArr.length;i++){
        farr.push(sFit(sMasteryArr[i]));
    }
    
    function sFit(obj){
        var cLstr = obj.courseStrLOIDsID.split('-');
        var cL = cLstr[0] + '-' + cLstr[1];
        var objC = Object.assign({},obj)
        return function (){
            if(!rowsByStu.hasOwnProperty(obj.stuUDID)){
            rowsByStu[obj.stuUDID] = Object.assign({},columns)
            }
            rowsByStu[obj.stuUDID][cL] = Object.assign({},objC)
          }
    }
    
    farr.map((f) => f())
    
    var rowArr = []
    
    for(var k in rowsByStu){
      rowArr.push({stuUDID: k, data: rowsByStu[k]})
    }
    
    /*
    for (var i=0;i<sMasteryArr.length;i++){
        var cLstr = sMasteryArr[i].courseStrLOIDsID.split("-")
        var cL = cLstr[0] + "-" + cLstr[1]
        rowsByStu[sMasteryArr[i].stuUDID][cL] = sMasteryArr[i]
    }
*/
    /* console.log(farr) */
    /* console.log(columns) */
    console.log(rowArr)
    return masteryArr.map((mRecord,id) => (<MasteryPanel key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id}/>));
  }

}

module.exports = GradeJumbo;