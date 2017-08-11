import React from 'react';
import ReactDOM from 'react-dom';
var AssessmentTable = require('./AssessmentTable.js')
var parseAssessment = require('../utilities/parseAssessment.js')
var getRequestToArr = require('../../../utilities/getRequestToArr.js')
var postRequestForReact = require('../../../utilities/postRequestForReact.js')

class AssessmentContainer extends React.Component{
    constructor(props){
      super(props)
      
      this.state={mArrS:this.props.mArr,page:0,vpage:0,parsedAssessment:parseAssessment(this.props.mArr)}
      this.parseAssessment = parseAssessment.bind(this)
      this.prevPage = this.prevPage.bind(this)
      this.nextPage = this.nextPage.bind(this)
      this.upVPage = this.upVPage.bind(this)
      this.downVPage = this.downVPage.bind(this)
      this.changeAssessment = this.changeAssessment.bind(this)
    }
    render(){
      
        return (<div className="panel panel-default">
              <div className="panel-heading">
                <button type="button" className="close">&times;</button>
                <h4 className="panel-title" id="mypanelLabel">{"Assessment Ratings for "}<strong>{this.state.mArrS[2][0].AssessTitle}</strong></h4>
              </div>
              <div className="panel-body">
                <AssessmentTable parsedAssessment={this.state.parsedAssessment} page={this.state.page} vpage={this.state.vpage} 
                upVPage={this.upVPage} downVPage={this.downVPage} nextPage={this.nextPage} prevPage={this.prevPage} 
                changeAssessment={this.changeAssessment} />
              </div>
            </div>)
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

 
  changeAssessment(stuUDID,loid,mRating0,mArrKey){

    return () => {
      var mArrS = {}
      for(var ki in this.state.mArrS){mArrS[ki] = this.state.mArrS[ki]}
      console.log(mArrS)
      console.log(this.state.parsedAssessment)
      var newState = (mArrC) => ((prevState,props) => ({mArrS:mArrC,parsedAssessment:parseAssessment(mArrC)}))
      var re = new RegExp('m' + loid + ":" + "(\\d)*" + 'n')
      mArrS[0][mArrKey].recentrating = mArrS[0][mArrKey].recentrating.replace(re,'m' + loid + ':' + mRating0 + 'n')
      var reqbody = {assessRatingID: mArrS[0][mArrKey].maxID,  string: mArrS[0][mArrKey].recentrating}
      this.setState(newState(mArrS),postRequestForReact("/sendgrades",reqbody,console.log))
    }
  }
  
    
}

module.exports = AssessmentContainer