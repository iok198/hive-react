import React from 'react'
import ReactDOM from 'react-dom'
var BDRPanel = require('./BDRPanel.js')
var SWIPContainer = require('./SWIPTables/SWIPTable.js')
var getRequestToArr = require('../../utilities/getRequestToArr.js')

class BDRJumbo extends React.Component {
  constructor(props){
    super(props);

    this.state = {showBDRs: false,swipArr:[],swipThreshold:"le20",nameFilter:'',classFilter:''}
    this.getSWIPsForThreshold = this.getSWIPsForThreshold.bind(this)
    this.changeSWIPThreshold = this.changeSWIPThreshold.bind(this)
    this.changeSelectState = this.changeSelectState.bind(this)
    this.filterSWIPStu = this.filterSWIPStu.bind(this)
   }
  
  getSWIPsForThreshold(swipThreshold){
    var changeSWIPArrState = this.changeSWIPArrState.bind(this)
    return function(){
      getRequestToArr("/swips/" + swipThreshold,changeSWIPArrState)}
  }
  
  
  changeSWIPArrState(arr){
    this.setState({swipArr:arr})
  }
  
  changeSWIPThreshold(event){
    this.setState(this.changeSelectState(event.target.value))
  }
  
  changeSelectState(val){
      return (prevState,props) =>
      {return {swipThreshold: val}}
      
    }
  
  filterSWIPStu(text){
    this.setState({nameFilter:text})
  }
  
  filterSWIPClass(text){
    this.setState({classFilter:text})
  }
  
  componentWillMount(){this.getSWIPsForThreshold("le20")()}
  
  render(){
    let list;
    let buttonText = 'Show BDRs';
    
    if (this.state.showBDRs){
      buttonText = 'Hide BDRs';
      list = this._getBDRs();
    }
    
    
    return( <div id="" className="jumbotron">
              <button type="button" className="btn btn-primary" onClick={this._handleClick.bind(this)}>{buttonText}</button>
              <select className="form-control" id="sel1" onChange={this.changeSWIPThreshold}>
                <option value={"le20"}>{"All"}</option>
                <option value={"le13"}>{"<=13"}</option>
                <option value={"ee15"}>{"15"}</option>
                <option value={"gt12"}>{">12"}</option>
              </select>
              <select className="form-control" id="sel2" onChange={function(e){this.filterSWIPClass(e.target.value)}.bind(this)}>
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
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={function(e){this.filterSWIPStu(e.target.value)}.bind(this)} />
              </div>
              <br />
              <SWIPContainer swipRows={this.state.swipArr} swipThreshold={this.state.swipThreshold} nameFilter={this.state.nameFilter} classFilter={this.state.classFilter}/>
              {list}
	    </div> );
}

  _handleClick(){
    this.setState({showBDRs: !this.state.showBDRs});
  }
  

  _getBDRs(){
    const bdrArr = this.props.bdrs;
    return bdrArr.map((bdr) => (<BDRPanel key={bdr.entryID} bdr={bdr} />));
  }
}

module.exports = BDRJumbo;