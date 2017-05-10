import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')
var MasteryStuRow = require('./MasteryStuRow.js')
var MasteryStuPanel = require('./MasteryStuPanel.js')
var MasteryTD = require('./MasteryTD.js')
var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')
var parseMastery = require('./utilities/parseMastery.js')

class GradeJumbo extends React.Component {
  constructor(props){
    super(props);
    this.state = {parsedMastery: parseMastery(this.props.mArr)}
    
  }
  
  render(){
      let list = this._getMastery();
    
    return( <div className="jumbotron">
      {list.pagination}
      <table id="" className="table table-bordered">
              <tbody>
              {list.header}
              {list.body}
              </tbody>
	    </table>
	    </div> );
  }
  
  
  
  _getMastery(mArr){
    var mObj = parseMastery(mArr),
    sMasteryArr = mObj.sMasteryArr, 
    masteryArr = mObj.masteryArr, 
    courseStrArr = mObj.courseStrArr, 
    rowsByStu = mObj.rowsByStu,
    LOs = mObj.LOs
    console.log(rowsByStu)
    var studentRows = Object.keys(rowsByStu).map((key1,id1) => (<MasteryStuTR key={key1} stuData={rowsByStu[key1]} colOffset={id1} >
      {Object.keys(rowsByStu[key1]).map((key2,id2) => {
          if (id2 < 5) {
            if (rowsByStu[key1][key2]){
              return  (<MasteryStuTD key={key2 + '-' + key1} ratingData={rowsByStu[key1][key2]} colOffset={id2}/>)
            } else {
              return (<MasteryStuTD key={key2 + '-' + key1} ratingData={{mcountN:0, mcountA:0, mcountM:0, mcountE:0, mRating0:1}} colOffset={id2} />)
            }  
          } else { return null}
      }
          )}
          </MasteryStuTR>))
    var headerRow = (<MasteryStuTR key={3813} stuData={{}} colOffset={0} >
        {masteryArr.map((mRecord,id) => 
        (id < 5 ? (<MasteryTD key={mRecord.courseStrLOID} mRecord={mRecord} colOffset={id} />) : null ))
        }
      </MasteryStuTR>)
    var pagination = (<ul className="pagination">{LOs.map((LO,id3) => ((id3%5 == 0) ? (<li key={LO + '1'}><a href="#">{(id3/5) + 1}</a></li>) : ''))}</ul>)
    return {header: headerRow, body: studentRows, pagination: pagination};
  }

}

module.exports = GradeJumbo;
