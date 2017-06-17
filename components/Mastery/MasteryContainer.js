import React from 'react';
import ReactDOM from 'react-dom';
var MasteryTable = require('./MasteryTable.js')
var MasteryHeadTR = require('./MasteryHeadTR.js')
var MasteryHeadTD = require('./MasteryHeadTD.js')

var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')
var parseMastery = require('./utilities/parseMastery.js')
var postRequestForReact = require('../../utilities/postRequestForReact.js')

class MasteryContainer extends React.Component {
  constructor(props){
    super(props);
    //console.log(this.props.mArr)
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
  
  componentWillReceiveProps(nextProps) {
  this.setState({
    mArrS : nextProps.mArr,
    parsedMastery: parseMastery(nextProps.mArr),
    page:0,vpage:0
  });
}
  
  render(){
      //let list = this._getMastery(this.state.parsedMastery);
    
    return( <div className="container">
      {/*<ul className="pager">
        <li className={"previous" + ((this.state.page == 0) ? " disabled" : "") } onClick={this.prevPage}><a href="#" onClick={function(event){event.preventDefault();}}>Previous</a></li>
        <li className="next" onClick={this.nextPage}><a href="#" onClick={function(event){event.preventDefault();}}>Next</a></li>
      </ul>*/}
      <MasteryTable page={this.state.page} vpage={this.state.vpage} upVPage={this.upVPage} downVPage={this.downVPage} prevPage={this.prevPage} nextPage={this.nextPage} changeMastery={this.changeMastery} parsedMastery={this.state.parsedMastery} mArrS={this.state.mArrS} />
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
      mArrS[0][mArrKey].mRating0 = parseInt(mRating0)
      this.setState(newState(mArrS),postRequestForReact("/sendgrades",parseMastery(mArrS).mRatingStrs[stuUDID],console.log))
    }
  }
  
  _getMastery(mObj){
    var sMasteryArr = mObj.sMasteryArr, 
    masteryArr = mObj.masteryArr, 
    courseStrArr = mObj.courseStrArr, 
    rowsByStu = mObj.rowsByStu,
    LOs = mObj.LOs
  }

}

module.exports = MasteryContainer;
