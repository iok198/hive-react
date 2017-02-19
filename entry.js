import React from 'react';
import ReactDOM from 'react-dom';
var BDRPanel = require('./BDRPanel.js');

class BDRs extends React.Component {
  render(){
    var list = this.props.bdrs.map((bdr) => (<BDRPanel key={bdr.entryID} bdr={bdr} />));
    let buttonText = 'Show BDRs';
    
    if (this.state.showBDRs){
      buttonText = 'Hide BDRs';
    }
    
    return( <div id="" className="jumbotron">
              <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
              {list}
	    </div> );
}

  _handleClick(){
    this.setState({showBDRs: !this.state.showBDRs});
  }
}

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          // Data reception is done, do whatever with it!
    var parsed = JSON.parse(this.responseText);
    var arr = parsed.map((user) => user);
    ReactDOM.render(
    <BDRs bdrs={arr}/>,
    document.getElementById('content')
    );
    }
  };
  xhttp.open("GET", "/query", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
