import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')
var MasteryStuRow = require('./MasteryStuRow.js')
var MasteryStuPanel = require('./MasteryStuPanel.js')

class GradeJumbo extends React.Component {
  constructor(){
    super();
  }
  
  render(){
      let list = this._getMastery();
    
    return( <div id="" className="jumbotron">
              <h1>Hello Jared</h1>
              {list.header}
              {list.body}
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
    var studentRows = rowArr.map((stuData,id) => (<MasteryStuRow key={stuData.stuUDID} stuData={stuData} colOffset={id}>
      {Object.keys(stuData.data).map((key,id2) => {
      if (stuData.data[key]){
      return  (<MasteryStuPanel key={stuData.data[key].courseStrLOIDsID} ratingData={stuData.data[key]} colOffset={id2}/>)
      }
      else {return (<MasteryStuPanel key={key + stuData.stuUDID} ratingData={ {mcountN:0, mcountA:0, mcountM:0, mcountE:0, mRating0:1}} colOffset={id2} />)}  
      }
      )}
    </MasteryStuRow>))
    var headerRow = (<MasteryStuRow key={3813} stuData{{}} colOffset={0} > {masteryArr.map((mRecord,id) => (<MasteryPanel key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id}/>))} </MasteryStuRow>)
    return {header: headerRow, body: studentRows};
  }

}

module.exports = GradeJumbo;