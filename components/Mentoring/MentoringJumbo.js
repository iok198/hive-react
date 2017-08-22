import React from 'react';
import ReactDOM from 'react-dom';

class MentoringJumbo extends React.Component {
  render(){
      //let name = this.props.user.title;
    
    return( <div id="" className="jumbotron">
              <h1>Mentoring: {this.props.mentoringStr}</h1>
	    </div> );
  }

}

module.exports = MentoringJumbo;