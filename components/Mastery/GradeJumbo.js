import React from 'react';
import ReactDOM from 'react-dom';
var BDRPanel = require('./MasteryPanel.js')

class GradeJumbo extends React.Component {
  constructor(){
    super();
  }
  
  render(){
      let list = this._getMastery();
    
    return( <div id="" className="jumbotron">
              <h1>Hello Jared</h1>
              {list}
	    </div> );
  }
  
  _getMastery(){
    const masteryArr = this.props.mArr;
    return masteryArr.map((mRecord) => (<MasteryPanel key={mRecord.courseStrLOID} mRecord={mRecord} />));
  }

}

module.exports = GradeJumbo;