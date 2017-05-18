import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')
var MasteryHeadTR = require('./MasteryHeadTR.js')
var MasteryHeadTD = require('./MasteryHeadTD.js')

var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')
var parseMastery = require('./utilities/parseMastery.js')
var postRequestForReact = require('../../utilities/postRequestForReact.js')

class GradeJumbo extends React.Component {
  constructor(props){
    super(props);
    this.state = {mArrS:this.props.mArr,parsedMastery: parseMastery(this.props.mArr),
      page:0,vpage:0
    }
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.upVPage = this.upVPage.bind(this)
    this.downVPage = this.downVPage.bind(this)
    this.changeMastery = this.changeMastery.bind(this)
    //this.parseMastery = parseMastery.bind(this)
    this.parseMastery = parseMastery.bind(this)
    
  }
  
  
  render(){
      //let list = this._getMastery(this.state.parsedMastery);
    
    return( <div className="jumbotron">
      <ul className="pager">
        <li className={"previous" + ((this.state.page == 0) ? " disabled" : "") } onClick={this.prevPage}><a href="#" onClick={function(event){event.preventDefault();}}>Previous</a></li>
        <li className="next" onClick={this.nextPage}><a href="#" onClick={function(event){event.preventDefault();}}>Next</a></li>
      </ul>
      <table id="" className="table table-bordered">
              <tbody>
              {(<MasteryHeadTR key={3813} parsedMastery={this.state.parsedMastery} colOffset={0} page={this.state.page} upVPage={this.upVPage} downVPage={this.downVPage}/>)}
              {Object.keys(this.state.parsedMastery.rowsByStu).slice(0+5*(this.state.vpage),5+5*(this.state.vpage)).map((stuUDID,id1) => (<MasteryStuTR key={stuUDID} stuData={this.state.parsedMastery.rowsByStu[stuUDID]} mRating0s={this.state.parsedMastery.mRating0s[stuUDID]} mRatingStr={this.state.parsedMastery.mRatingStrs[stuUDID]} stuBio={this.state.parsedMastery.stuBios[stuUDID]} stuUDID={stuUDID} colOffset={id1} page={this.state.page} changer={this.changeMastery} />))}
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
  
  upVPage(){
    this.setState({vpage:this.state.vpage - 1})
  }
  downVPage(){
    this.setState({vpage:this.state.vpage + 1})
  }
  
  getStudentRows(rowsByStu){
    
  }
  
  changeMastery(stuUDID,mString,mRating0,mArrKey){

    return () => {
      var mArrS = {}
      for(var ki in this.state.mArrS){mArrS[ki] = this.state.mArrS[ki]}
      console.log(mArrS)
      console.log(this.state.parsedMastery.mRatingStrs[stuUDID])
      var newState = (mArrC) => ((prevState,props) => ({mArrS:mArrC,parsedMastery:parseMastery(mArrC)}))
      //this.setState({changedRows:Object.assign(,this.state.changedRowsstuUDID})
      mArrS[0][mArrKey].mRating0 = parseInt(mRating0)
      //this.setState({mArrS:mArrS,parsedMastery: parseMastery(mArrS)})
      this.setState(newState(mArrS),postRequestForReact("/sendgrades",parseMastery(mArrS).mRatingStrs[stuUDID],console.log))
    }
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
