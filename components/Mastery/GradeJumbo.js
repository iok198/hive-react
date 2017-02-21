import React from 'react';
import ReactDOM from 'react-dom';

class GradeJumbo extends React.Component {
  render(){
      let name = this.props.user.title;
    
    return( <div id="" className="jumbotron">
              <h1>Hello {name}</h1>
	    </div> );
  }

}

module.exports = GradeJumbo;