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
    
    var i=0;
    while (i<sMasteryArr.length){
        var nStr = sMasteryArr[i].courseStrLOIDsID.split("-")
        var i = sFit(sMasteryArr[i], nStr[0] + '-' + nStr[1], i)();
    }
    
    function sFit(obj, str,index){
        return function (){
            if(!rowsByStu.hasOwnProperty(obj.stuUDID)){
            rowsByStu[obj.stuUDID] = columns
            }
            rowsByStu[obj.stuUDID][str] = obj;
            return index++;
          }
          
    }

    
    console.log(columns)
    console.log(rowsByStu)
    return masteryArr.map((mRecord,id) => (<MasteryPanel key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id}/>));
  }

}

module.exports = GradeJumbo;