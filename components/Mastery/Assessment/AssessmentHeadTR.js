import React from 'react'
var AssessmentHeadTD = require('./AssessmentHeadTD.js')
//possible parents: GradeJumbo.js
class AssessmentHeadTR extends React.Component {
    constructor(props){
        super(props)
        
    }
    render(){
        return <tr id={"Assessment-row-head" } className="Assessment-row" >
        <td><div className="panel panel-default"><div className="panel-body">{"Student / Learning Outcome"}
            <div className="btn-group-vertical" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={this.props.upVPage}><span className="glyphicon glyphicon-arrow-up" ></span></button>
              <button type="button" className="btn btn-default" onClick={this.props.downVPage}><span className="glyphicon glyphicon-arrow-down" ></span></button>
            </div></div>
            <br/>
            <div className="input-group">
                      <span className="input-group-addon" id="basic-addon3">Name:</span>
                      <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={function(e){this.props.filterAssessmentStu(e.target.value)}.bind(this)} />
                    </div>
            </div>

            <div className="btn-group pager">
                <button type="button" className="btn btn-default"  onClick={this.props.prevPage}><span className="glyphicon glyphicon-arrow-left" ></span></button>
                <button type="button" className="btn btn-default"  onClick={this.props.nextPage}><span className="glyphicon glyphicon-arrow-right" ></span></button>
            </div>
        </td>
        {[0,1,2,3].map((id,index) => 
        {
        if(!!this.props.parsedAssessment.AssessmentArrS[Object.keys(this.props.parsedAssessment.AssessmentArrS)[id+4*this.props.page]]){
        return <AssessmentHeadTD key={Object.keys(this.props.parsedAssessment.AssessmentArrS)[id+4*this.props.page]} mRecord={(!!this.props.parsedAssessment.AssessmentArrS[Object.keys(this.props.parsedAssessment.AssessmentArrS)[id+4*this.props.page]]) ? this.props.parsedAssessment.AssessmentArrS[Object.keys(this.props.parsedAssessment.AssessmentArrS)[id+4*this.props.page]] : {mcountN:0, mcountA:0, mcountM:0, mcountE:0, mcountU:'All'}} colOffset={id}/>
        }
            else return null
        })
        }
        </tr>
    }
}

module.exports = AssessmentHeadTR