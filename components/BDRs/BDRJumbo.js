import React from 'react'
import ReactDOM from 'react-dom'
var BDRPanel = require('./BDRPanel.js')
var SWIPContainer = require('./SWIPTables/SWIPTable.js')
var getRequestToArr = require('../../utilities/getRequestToArr.js')

class BDRJumbo extends React.Component {
  constructor(props){
    super(props);

    this.state = {showBDRs: false,swipArr:[],swipThreshold:"le20"}
    this.getSWIPsForThreshold = this.getSWIPsForThreshold.bind(this)
    this.changeSWIPThreshold = this.changeSWIPThreshold.bind(this)
    this.changeSelectState = this.changeSelectState.bind(this)
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
              <br />
              <SWIPContainer swipRows={this.state.swipArr} threshold={this.state.swipThreshold}/>
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