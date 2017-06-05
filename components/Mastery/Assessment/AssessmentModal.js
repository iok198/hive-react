import React from 'react';
import ReactDOM from 'react-dom';
var AssessmentTable = require('./AssessmentTable.js')
var parseAssessment = require('../utilities/parseAssessment.js')
var getRequestToArr = require('../../../utilities/getRequestToArr.js')

class AssessmentModal extends React.Component{
    constructor(props){
      super(props)
      
      this.state={mArrS:[],page:0,vpage:0,parsedMastery:{}}
      this.parseAssessment = this.parseAssessment.bind(this)
      this.prevPage = this.prevPage.bind(this)
      this.nextPage = this.nextPage.bind(this)
      this.upVPage = this.upVPage.bind(this)
      this.downVPage = this.downVPage.bind(this)
    }
    render(){
        this.setState({parsedAssessment:parseAssessment(this.props.mArr)})
      
        return (<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
              </div>
              <div className="modal-body">
                <AssessmentTable parsedAssessment={this.state.parsedAssessment} page={this.state.page} vpage={this.state.vpage} upVPage={this.upVPage} downVPage={this.downVPage} nextPage={this.nextPage} prevPage={this.prevPage} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
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
    
}

module.exports = AssessmentModal