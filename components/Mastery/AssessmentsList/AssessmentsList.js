import React from 'react'
import ReactDOM from 'react-dom'

class AssessmentsList extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return (<div className="container">
			<div className="col-xs-6">
				<div className="panel panel-default ">
					<div className="panel-heading">
						Learning Outcomes
					</div>
					<div className="panel-body">
						<table className="table table-hover">
			        			<tbody>
			        				{this.props.LOs.map((lo,id) => (<tr key={lo.LOID} className="">
			        					<td>
			        						<h3>{lo.LOText}</h3>
			        						<p>{lo.courseStrLOID }</p>
			        						<p><button className='btn'><span className="glyphicon glyphicon-pencil pointer"></span></button></p>
			        					</td>
			        				</tr>))}
			        			</tbody>
			        		</table>
					</div>
				</div>
			</div>
			<div className="col-xs-6">
				<div className="panel panel-default col-6-xs">
					<div className="panel-heading">
						Assessments {/*<button type="button" className="btn btn-success" aria-label="Submit" onClick={this._submitNewAssess.bind(this)}>Submit</button><button type="button" className="btn btn-danger" aria-label="Close" onClick={this.props.cancel}>Cancel</button>*/}
					</div>
					<div className="panel-body">
						<table className="table table-hover">
			        			<tbody>
			        				{this.props.assessmentsArr.map((a,id) => (<tr key={a.entryID} className="">
			        					<td>
			        						<h3>{a.AssessTitle}</h3>
			        						<p><strong>Date: </strong>{a.AssessDate.substring(0,10)}</p>
			        						<p><button className='btn btn-default pointer' onClick={function(){this.props.getAssessmentGrades(a.courseStr,a.entryID)}.bind(this)}>Grades</button> <button className='btn'><span className="glyphicon glyphicon-pencil pointer"></span></button></p>
			        					</td>
			        				</tr>))}
			        			</tbody>
			        		</table>
			        </div>
			    </div>
			</div>
		</div>)
	}
}

module.exports = AssessmentsList