import React from 'react';
import ReactDOM from 'react-dom';
var MasteryContainer = require('./MasteryContainer.js')

var getRequestToArr = require('../../utilities/getRequestToArr.js')


class MasteryJumbo extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      mArr:[]
    }
    
  }
  
  componentWillMount(){
  getRequestToArr("/mastery/s7..........",(arr) => ( 
          this.setState({mArr:arr})
  
  ))
  }
  
  render(){
      //let list = this._getMastery(this.state.parsedMastery);
    
    return( <div className="jumbotron">
        <ul className="nav nav-pills">
            {Object.keys(this.props.user.stuCourseQuObj.strObj).map((key,id)=> (<li key={"masterynav" + key}><a href="#" onClick={function(event){event.preventDefault();}}>{this.props.user.stuCourseQuObj.strObj[key]}</a></li>))}
        </ul>
        {(this.state.mArr.length > 0) ? <MasteryContainer mArr={this.state.mArr} /> : null}
	    </div> );
  }

}

module.exports = MasteryJumbo;
