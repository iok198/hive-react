import React from 'react'
import ReactDOM from 'react-dom'
var BDRPanel = require('./BDRPanel.js')
var SWIPContainer = require('./SWIPTables/SWIPTable.js')

class BDRJumbo extends React.Component {
  constructor(){
    super();

    this.state = {showBDRs: false};  
   }

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
              <SWIPContainer swipRows={[{name:"jared",classNo:383,swips:13,stuUDID:34}]}/>
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