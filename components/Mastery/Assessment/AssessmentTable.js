import React from 'react';
import ReactDOM from 'react-dom';
var AssessmentHeadTR = require('./AssessmentHeadTR.js')
var AssessmentHeadTD = require('./AssessmentHeadTD.js')

var AssessmentStuTR = require('./AssessmentStuTR.js')
var AssessmentStuTD = require('./AssessmentStuTD.js')
var parseAssessment = require('../utilities/parseAssessment.js')
var postRequestForReact = require('../../../utilities/postRequestForReact.js')

class AssessmentTable extends React.Component {
  constructor(props){
    super(props);
    //console.log(this.props.mArrS)
    this.state = {
    }
    //this.upVPage = this.props.upVPage.bind(this)
    //this.downVPage = this.props.downVPage.bind(this)
    //this.changeAssessment = this.props.changeAssessment.bind(this)
    //this.parseAssessment = parseAssessment.bind(this)
    //this.parseAssessment = parseAssessment.bind(this)
    
  }
  
  render(){
      //let list = this._getAssessment(this.state.parsedAssessment);
    
    return( 
      <table id="" className="table table-bordered">
              <tbody>
              {(<AssessmentHeadTR key={3813} parsedAssessment={this.props.parsedAssessment} colOffset={0} page={this.props.page} upVPage={this.props.upVPage} downVPage={this.props.downVPage}/>)}
              {/*console.log(this.props.parsedAssessment.rowsByStu)*/}
              {Object.keys(this.props.parsedAssessment.rowsByStu).slice(0+5*(this.props.vpage),5+5*(this.props.vpage)).map((stuUDID,id1) => (<AssessmentStuTR key={stuUDID} stuData={this.props.parsedAssessment.rowsByStu[stuUDID]} mRating0s={this.props.parsedAssessment.mRating0s[stuUDID]} mRatingStr={this.props.parsedAssessment.mRatingStrs[stuUDID]} stuBio={this.props.parsedAssessment.stuBios[stuUDID]} stuUDID={stuUDID} colOffset={id1} page={this.props.page} changer={this.props.changeAssessment} />))}
              </tbody>
	    </table> );
  }
  

}

module.exports = AssessmentTable;
