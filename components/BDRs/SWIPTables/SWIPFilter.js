import React from 'react'
import ReactDOM from 'react-dom'

class SWIPFilter extends React.Component {
	constructor(props){
		super(props)
	}
	render(){

		return  (<div className="form-inline">
					<div className="form-group">
	                  <select className="form-control" id="sel1" onChange={this.props.changeSWIPThreshold}>
	                    <option value={"le20"}>{"All"}</option>
	                    <option value={"le13"}>{"<=13"}</option>
	                    <option value={"ee15"}>{"15"}</option>
	                    <option value={"gt12"}>{">12"}</option>
	                  </select>
	                  <select className="form-control" id="sel2" onChange={function(e){this.props.filterSWIPClass(e.target.value)}.bind(this)}>
	                    <option value={""}>{"All"}</option>
	                    <option value={"601"}>601</option>
	                    <option value={"602"}>602</option>
	                    <option value={"603"}>603</option>
	                    <option value={"701"}>701</option>
	                    <option value={"702"}>702</option>
	                    <option value={"703"}>703</option>
	                    <option value={"801"}>801</option>
	                    <option value={"802"}>802</option>
	                    <option value={"803"}>803</option>
	                  </select>
	                  <div className="input-group">
	                    <span className="input-group-addon" id="basic-addon3">Name:</span>
	                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={function(e){this.props.filterSWIPStu(e.target.value)}.bind(this)} />
	                  </div>
	                </div>
	            </div>)
	}
}

module.exports = SWIPFilter