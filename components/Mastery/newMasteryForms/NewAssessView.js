import React from 'react'
import ReactDOM from 'react-dom'
var datesList = require('../../../devutil/dates.js')

class newAssessView extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			loalign: [],
			AssessTitle:"",
			AssessDesc:"",
			AssessLink:"",
			AssessDate:"2017-07-01",
			LOAlign:"mn"
		}
		//this.changeInput = this.changeInput.bind(this)
	}

	render(){
		return <div className="container">
			<div className="panel panel-default">
				<div className="panel-heading">
					New Assessment <button type="button" className="btn btn-success" aria-label="Submit" onClick={this._submitNewAssess.bind(this)}>Submit</button><button type="button" className="btn btn-danger" aria-label="Close" onClick={this.props.cancel}>Cancel</button>
				</div>
				<div className="panel-body">
					<div className="form-group">
                    	<label htmlFor="AssessTitle"><span className="glyphicon glyphicon-comment"></span> Assessment Title:</label>
                    	<input className="form-control" value={this.state.AssessTitle} id="AssessTitle" onChange={function(e){this.changeInput({AssessTitle:e.target.value})}.bind(this)}/>
                      <br/>
                    	<label htmlFor="AssessDesc"><span className="glyphicon glyphicon-comment"></span> Assessment Description:</label>
                    	<textarea className="form-control" value={this.state.AssessDesc} id="AssessDesc" rows="5" onChange={function(e){this.changeInput({AssessDesc:e.target.value})}.bind(this)}></textarea>
                      <br/>
                    	<label htmlFor="AssessLink"><span className="glyphicon glyphicon-comment"></span> Assessment Link:</label>
                    	<input className="form-control" value={this.state.AssessLink} id="AssessLink" onChange={function(e){this.changeInput({AssessLink:e.target.value})}.bind(this)}/>
                      <br/>
                    	<label htmlFor="assessSelDate"><span className="glyphicon glyphicon-calendar"></span> Date:</label>
                    	<select className="form-control" value={this.state.AssessDate} id="assessSelDate" onChange={function(e){var assessDJ = new Date(e.target.value).toJSON(); var str = assessDJ.substring(0,10) + ' ' + assessDJ.substring(11,19); this.changeInput({AssessDate:str})}.bind(this)}>
                    		{datesList.map((date,id)=>(<option key={id}>{date}</option>))}
                    	</select>
                	  <br/>
                	  <br/>
                		<label htmlFor="LOSelect">{this.state.loalign.length} Learning Outcome(s) Assessed: <button className="btn btn-success" onClick={function(){this._handleLOClick('all')}.bind(this)}>Select All</button><button className="btn btn-default" onClick={function(){this._handleLOClick('none')}.bind(this)}>Select None</button></label>
                		<div id="LOSelect" className="container">
                		<table className="table table-hover">
                		<tbody>
                		{this.props.LOs.map((LO,id) => (<tr key={LO.LOID} onClick={function(){this._handleLOClick(LO.LOID)}.bind(this)} className={"pointer " + (this.state.loalign.indexOf(LO.LOID) > -1 ? 'success' : '')}><td>{LO.LOText}</td></tr>))}
                		</tbody>
                		</table>
                		</div>
                    </div>
				</div>
			</div>
		</div>
	}

	changeInput(obj){
		this.setState(obj)
	}

	_handleLOClick(loid){
		var loalignC
		if (loid == 'all'){loalignC = this.props.LOs.map((LO,id) => (LO.LOID))}
			else if (loid == 'none') {loalignC = []}
		else{
			loalignC = this.state.loalign.slice()
			var index = loalignC.indexOf(loid)
			if(index > -1 ){
				loalignC.splice(index,1)
				
				
			} else {
				loalignC.push(loid)
				
			}
			
		}
		this.setState({loalign:loalignC,LOAlign:"m" + loalignC.join("nm") + "n"})
	}

	_submitNewAssess(){
		this.props.postRequestForReact("/newassessment",{AssessTitle:this.state.AssessTitle,
			AssessDesc:this.state.AssessDesc,
			AssessLink:this.state.AssessLink,
			AssessDate:this.state.AssessDate,
			LOAlign:this.state.LOAlign,
			courseStr:this.props.courseStr
		},this.props.submitter)
	}
}

module.exports = newAssessView