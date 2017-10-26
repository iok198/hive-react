import React from 'react';
import ReactDOM from 'react-dom';
var MasteryPanel = require('./MasteryPanel.js')
var MasteryHeadTR = require('./MasteryHeadTR.js')
var MasteryHeadTD = require('./MasteryHeadTD.js')

var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')
var parseMastery = require('./utilities/parseMastery.js')
var postRequestForReact = require('../../utilities/postRequestForReact.js')

class MasteryTable extends React.Component {
  constructor(props){
    super(props);
    //console.log(this.props.mArrS)
    this.state = {
    }
    //this.upVPage = this.props.upVPage.bind(this)
    //this.downVPage = this.props.downVPage.bind(this)
    //this.changeMastery = this.props.changeMastery.bind(this)
    //this.parseMastery = parseMastery.bind(this)
    //this.parseMastery = parseMastery.bind(this)
    
  }
  
  render(){
      //let list = this._getMastery(this.state.parsedMastery);
    
    return( 
      <table id="" className="table table-bordered">
        <tbody>
          {(<MasteryHeadTR
              key={3813}
              parsedMastery={this.props.parsedMastery}
              colOffset={0} page={this.props.page}
              upVPage={this.props.upVPage}
              downVPage={this.props.downVPage}
              prevPage={this.props.prevPage}
              nextPage={this.props.nextPage}
              filterMasteryStu={this.props.filterMasteryStu}
              filterMasteryClassNo={this.props.filterMasteryClassNo}
              filterAssessments={this.props.filterAssessments}
            />)}
              {/*console.log(this.props.parsedMastery.rowsByStu)*/}
          {Object.keys(this.props.parsedMastery.rowsByStu).slice(0+5*(this.props.vpage),5+5*(this.props.vpage)).map((stuUDID,id1) => (<MasteryStuTR
                                key={stuUDID}
                                stuData={this.props.parsedMastery.rowsByStu[stuUDID]}
                                mRating0s={this.props.parsedMastery.mRating0s[stuUDID]}
                                mRatingStr={this.props.parsedMastery.mRatingStrs[stuUDID]}
                                stuBio={this.props.parsedMastery.stuBios[stuUDID]}
                                stuUDID={stuUDID}
                                colOffset={id1}
                                page={this.props.page}
                                changer={this.props.changeMastery}
                                filterAssessments={this.props.filterAssessments}
                              />))}
        </tbody>
	    </table> );
  }
  

}

module.exports = MasteryTable;
