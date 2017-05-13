import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')
var MasteryHeadTR = require('./MasteryHeadTR.js')
var MasteryHeadTD = require('./MasteryHeadTD.js')

var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')
var parseMastery = require('./utilities/parseMastery.js')

class GradeJumbo extends React.Component {
  constructor(props){
    super(props);
    this.state = {parsedMastery: parseMastery(this.props.mArr),
      page:0
    }
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    
  }
  
  
  render(){
      //let list = this._getMastery(this.state.parsedMastery);
    
    return( <div className="jumbotron">
      <ul className="pager">
        <li className={"previous" + ((this.state.page == 0) ? " disabled" : "") } onClick={this.prevPage}><a href="#">Previous</a></li>
        <li className="next" onClick={this.nextPage}><a href="#">Next</a></li>
      </ul>
      <table id="" className="table table-bordered">
              <tbody>
              {(<MasteryHeadTR key={3813} masteryArr={this.state.parsedMastery.masteryArr} colOffset={0} page={this.state.page}/>)}
              {Object.keys(this.state.parsedMastery.rowsByStu).slice(0,5).map((stuUDID,id1) => (<MasteryStuTR key={stuUDID} stuData={this.state.parsedMastery.rowsByStu[stuUDID]} stuUDID={stuUDID} colOffset={id1} page={this.state.page} />))}
              </tbody>
	    </table>
	    </div> );
  }
  
  prevPage(){
    this.setState({page:this.state.page - 1})
  }
  nextPage(){
    this.setState({page:this.state.page + 1})
  }
  
  getStudentRows(rowsByStu){
    
  }
  
  
  _getMastery(mObj){
    var sMasteryArr = mObj.sMasteryArr, 
    masteryArr = mObj.masteryArr, 
    courseStrArr = mObj.courseStrArr, 
    rowsByStu = mObj.rowsByStu,
    LOs = mObj.LOs

    //var studentRows = 
    //var headerRow = (<MasteryHeadTR key={3813} masteryArr={masteryArr} colOffset={0} page={this.state.page}/>)
    //return {header: headerRow, body: studentRows};
  }

}

module.exports = GradeJumbo;
