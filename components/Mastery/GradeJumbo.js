import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')
var MasteryStuRow = require('./MasteryStuRow.js')
var MasteryStuPanel = require('./MasteryStuPanel.js')
var MasteryTD = require('./MasteryTD.js')
var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')

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
    
    function sFit(obj){
        var cLstr = obj.courseStrLOIDsID.split('-');
        var cL = cLstr[0] + '-' + cLstr[1];
        var objC = Object.assign({},obj)
        
            if(!rowsByStu.hasOwnProperty(obj.stuUDID)){
            rowsByStu[obj.stuUDID] = Object.assign({},columns)
            }
            rowsByStu[obj.stuUDID][cL] = Object.assign({},objC)
          
    }
    
    sMasteryArr.forEach(sFit)


    var studentRows = Object.keys(rowsByStu).map((key1,id1) => (<MasteryStuTR key={key1} stuData={rowsByStu[key1]} colOffset={id1} >
      {Object.keys(rowsByStu[key1]).map((key2,id2) => {
          if (rowsByStu[key1][key2]){
          return  (<MasteryStuTD key={key2 + '-' + key1} ratingData={rowsByStu[key1][key2]} colOffset={id2}/>)
          }
          else {return (<MasteryTD key={key2 + '-' + key1} ratingData={ {mcountN:0, mcountA:0, mcountM:0, mcountE:0, mRating0:1}} colOffset={id2} />)}  
          }
          )}
          </MasteryStuTR>))
        var headerRow = (<MasteryStuTR key={3813} stuData={{}} colOffset={0} > {masteryArr.map((mRecord,id) => (<MasteryTD key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id}/>))} </MasteryStuTR>)
        return {header: headerRow, body: studentRows};
  }

}

module.exports = GradeJumbo;