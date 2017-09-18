import React from 'react';
import ReactDOM from 'react-dom';
var MasteryTable = require('./MasteryTable.js')
var MasteryHeadTR = require('./MasteryHeadTR.js')
var MasteryHeadTD = require('./MasteryHeadTD.js')

var MasteryStudentPanel = require('./MasteryStuPanel.js')

var MasteryStuTR = require('./MasteryStuTR.js')
var MasteryStuTD = require('./MasteryStuTD.js')
var AssessmentContainer = require('./Assessment/AssessmentContainer.js')
var AssessmentsList = require('./AssessmentsList/AssessmentsList.js')
var NewLOView = require('./newMasteryForms/NewLOView.js')
var NewAssessView = require('./newMasteryForms/NewAssessView.js')
var parseMastery = require('./utilities/parseMastery.js')
var postRequestForReact = require('../../utilities/postRequestForReact.js')
var getRequestToArr = require('../../utilities/getRequestToArr.js')

class MasteryContainer extends React.Component {
  constructor(props){
    super(props);
    //console.log(this.props.mArr)
    this.state = {mArrS:this.props.mArr,parsedMastery: parseMastery(this.props.mArr),
      page:0,vpage:0,viewOption:'mRatings',assessMArr:null,assessmentFilter:''
    }
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.upVPage = this.upVPage.bind(this)
    this.downVPage = this.downVPage.bind(this)
    this.changeMastery = this.changeMastery.bind(this)
    //this.parseMastery = parseMastery.bind(this)
    this.parseMastery = parseMastery.bind(this)
    this.filterMasteryStu = this.filterMasteryStu.bind(this)
    this.filterMasteryClassNo = this.filterMasteryClassNo.bind(this)
    this._getAssessmentGrades = this._getAssessmentGrades.bind(this)
    this.filterAssessments = this.filterAssessments.bind(this)
    
  }
  
  componentWillReceiveProps(nextProps) {
  this.setState({
    mArrS : nextProps.mArr,
    parsedMastery: parseMastery(nextProps.mArr),
    page:0,vpage:0,
    viewOption:'mRatings',
    assessMArr: null,
    assessmentsArr: null,
    assessmentFilter: ''
  });
}
  
  render(){
      //let list = this._getMastery(this.state.parsedMastery);
      let view;

    if(this.state.viewOption == 'mRatings'){
        if(this.props.viewer.courseStr.substring(0,1) != 's'){
          view = (<div>
            <button type="button" className="btn btn-primary" onClick={function(){this._viewOptionSelect('newLO')}.bind(this)}>New Learning Outcome</button>
            <button type="button" className="btn btn-primary" onClick={function(){this._viewOptionSelect('newAssessment')}.bind(this)}>New Assessment</button>
            {/*<button type="button" className="btn btn-primary" onClick={function(){this._getAssessmentGrades('s7',257)}.bind(this)}> Grade Assessment </button>*/}
            <button type="button" className="btn btn-primary" onClick={function(){this._getAssessments(this.state.mArrS[2])}.bind(this)}> View Assessments </button>
            <MasteryTable page={this.state.page} vpage={this.state.vpage} 
              upVPage={this.upVPage} downVPage={this.downVPage}
              prevPage={this.prevPage} nextPage={this.nextPage}
              changeMastery={this.changeMastery} parsedMastery={this.state.parsedMastery} 
              mArrS={this.state.mArrS} filterMasteryStu={this.filterMasteryStu}
              filterMasteryClassNo={this.filterMasteryClassNo} filterAssessments={this.filterAssessments}
            /></div>)
        }
        else if(this.props.viewer.courseStr.substring(0,1) == 's'){
          view = (
            <MasteryStudentPanel parsedMastery={this.state.parsedMastery} 
              mArrS={this.state.mArrS} viewer={this.props.viewer}/>
            )
        }
      } else if (this.state.viewOption == 'newLO') {
        view = (<NewLOView postRequestForReact={postRequestForReact} cancel={function(){this._viewOptionSelect('mRatings')}.bind(this)} submitter={this.props.getMasteryForCourse(this.props.course)} courseStr={this.state.mArrS[2]} LOs={this.state.mArrS[1]} />)
      } else if (this.state.viewOption == 'newAssessment') {
        view = (<NewAssessView postRequestForReact={postRequestForReact} cancel={function(){this._viewOptionSelect('mRatings')}.bind(this)} submitter={this.props.getMasteryForCourse(this.props.course)} courseStr={this.state.mArrS[2]} LOs={this.state.mArrS[1]}/>)
      } else if (false && this.state.viewOption == 'gradeAssessment' && this.state.assessMArr != null){
        view = (<AssessmentContainer mArr={this.state.assessMArr}/>)
      } else if (this.state.viewOption == 'viewAssessments' && this.state.assessmentsArr != null){
        view = (<AssessmentsList LOs={this.state.mArrS[1]} getAssessmentGrades={this._getAssessmentGrades} assessmentsArr={this.state.assessmentsArr} initialFilter={this.state.assessmentFilter}/>)
      }
    
    return( <div className="container">
      {/*<ul className="pager">
        <li className={"previous" + ((this.state.page == 0) ? " disabled" : "") } onClick={this.prevPage}><a href="#" onClick={function(event){event.preventDefault();}}>Previous</a></li>
        <li className="next" onClick={this.nextPage}><a href="#" onClick={function(event){event.preventDefault();}}>Next</a></li>
      </ul>*/}
      {view}
	    </div> );
  }
  
  filterAssessments(lofilter){
    var stateSet = function(){return {assessmentFilter:'m' + lofilter + 'n'}}
    var getAssessments = function(){this._getAssessments(this.props.course.courseStr)}.bind(this)
    return ()=>{
      this.setState(stateSet,getAssessments)
    }

  }


  _viewOptionSelect(view){
    var newState =  {viewOption:view}
    if(view != 'gradeAssessment'){
      newState.assessMArr = null
    } else if (view !='viewAssessments'){ newState.assessmentsArr = null}
    this.setState(newState)
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
  
  filterMasteryStu(text){
    var mArrC = this.state.mArrS.slice(0,3)
    if(text != '') mArrC.push(text)
    this.setState({mArrS:mArrC,parsedMastery:parseMastery(mArrC)})
  }
  
  filterMasteryClassNo(text){
    var mArrC = this.state.mArrS.slice(0,3)
    mArrC.push('')
    if(text != '') mArrC.push(text)
    this.setState({mArrS:mArrC,parsedMastery:parseMastery(mArrC)})
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

  _getAssessmentGrades(courseStr,assessID){
    getRequestToArr('/assessments/' + courseStr + '/' + assessID, function(arr){this.setState({assessMArr:arr,viewOption:'gradeAssessment'})}.bind(this))
  }

  _getAssessments(courseStr){
    getRequestToArr('/assessments/' + courseStr,function(arr){this.setState({assessmentsArr:arr,viewOption:'viewAssessments'})}.bind(this))
  }
  //getRequestForReact("/assessments/s7/257",(arr) => ([<AssessmentModal mArr={arr}/>,document.getElementById('content4')]))
//getRequestToArr("/grades3/s6",(arr)=>{console.log(parseMastery2(arr))})

}

module.exports = MasteryContainer;
