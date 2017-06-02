import React from 'react'
import ReactDOM from 'react-dom'
var BDRPanel = require('./BDRPanel.js')
var SWIPContainer = require('./SWIPTables/SWIPTable.js')
var getRequestToArr = require('../../utilities/getRequestToArr.js')

class BDRJumbo extends React.Component {
  constructor(props){
    super(props);

    this.state = {showBDRs: false,swipArr:[]}
    this.getSWIPsForThreshold = this.getSWIPsForThreshold.bind(this)
   }
  
  getSWIPsForThreshold(swipThreshold){
    var changeSWIPArrState = this.changeSWIPArrState.bind(this)
    return function(){
      getRequestToArr("/swips/" + swipThreshold,changeSWIPArrState)}
  }
  
  changeSWIPArrState(arr){
    this.setState({swipArr:arr})
  }
  
  componentWillMount(){this.getSWIPsForThreshold("le20")}
  
  render(){
    let list;
    let buttonText = 'Show BDRs';
    
    if (this.state.showBDRs){
      buttonText = 'Hide BDRs';
      list = this._getBDRs();
    }
    
    
    return( <div id="" className="jumbotron">
              <button type="button" className="btn btn-primary" onClick={this._handleClick.bind(this)}>{buttonText}</button>
              <br />
              <SWIPContainer swipRows={this.state.swipArr}/>
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