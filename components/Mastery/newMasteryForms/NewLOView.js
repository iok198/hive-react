import React from 'react'
import ReactDOM from 'react-dom'

class newLOView extends React.Component {
	constructor(props){
		super(props)
		this.state = {LOCode:'',LOText:'',LOs:this.props.LOs}
	}
	render(){
		return <div className="container">
			<div className="panel panel-default">
				<div className="panel-heading">
					New LO <button type="button" className="btn btn-success" aria-label="Submit" onClick={this._submitNewLO.bind(this)}>Submit</button><button type="button" className="btn btn-danger" aria-label="Close" onClick={this.props.cancel}>Cancel</button>
				</div>
				<div className="panel-body">
					<div className="form-group">
                    	<label htmlFor="LOCode"><span className="glyphicon glyphicon-comment"></span> LO Code:</label>
                    	<input className="form-control" value={this.state.LOCode} id="LOCode" onChange={function(e){this.changeInput({LOCode:e.target.value})}.bind(this)}/>
                      <br/>
                    	<label htmlFor="LOText"><span className="glyphicon glyphicon-comment"></span> LOText</label>
                    	<div className="input-group">
		                    <span className="input-group-addon" id="basic-addon3">I can</span>
	                    	<input className="form-control" value={this.state.LOText} id="LOText" rows="5" onChange={function(e){this.changeInput({LOText:e.target.value})}.bind(this)} />
	                  </div>
                      <br/>
                	  <br/>
                	  
                		<label htmlFor="LOSelect">{this.state.LOs.length} Current LOs: </label>
                		<div id="LOSelect" className="container">
                		<table className="table">
                		<tbody>
                		{this.state.LOs.map((LO,id) => (<tr key={LO.LOID} ><td>{LO.LOText}</td></tr>))}
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

	_submitNewLO(){
		this.props.postRequestForReact("/newlo",{LOCode:this.state.LOCode,
			LOText:"I can " + this.state.LOText,
			courseStr:this.props.courseStr
		},function(){
			var LOsC = this.state.LOs.slice()
			LOsC.push({LOCode:this.state.LOCode,
			LOText:"I can " + this.state.LOText,
			courseStr:this.props.courseStr,LOID:Math.random()
		})
			this.setState({LOCode:'',LOText:'',LOs:LOsC})
		}.bind(this))
	
}

}

module.exports = newLOView