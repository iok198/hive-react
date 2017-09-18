import React from 'react';
import ReactDOM from 'react-dom';
var MasteryContainer = require('./MasteryContainer.js')

var getRequestToArr = require('../../utilities/getRequestToArr.js')


class MasteryJumbo extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      mArr:[],
      activeCourse:{courseStr:'',courseTitle:''}
    }
    this.getMasteryForCourse = this.getMasteryForCourse.bind(this)
    this.changeMArrState = this.changeMArrState.bind(this)
    this.changeActiveCourseState = this.changeActiveCourseState.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  resetState(){
    this.setState({
      mArr:[],
      activeCourse:{courseStr:'',courseTitle:''}
    })
  }
  
  changeMArrState(arr){ 
    this.setState({mArr:arr})
  }

  changeActiveCourseState(course){ 
    this.setState({activeCourse:course})
  }
  
  getMasteryForCourse(course){
    var changeMArrState = this.changeMArrState.bind(this)
    var changeActiveCourseState = this.changeActiveCourseState;
    return function(){
      changeActiveCourseState(course)
      getRequestToArr("/mastery/" + course.courseStr,changeMArrState)}
  }
  
  render(){
      //let list = this._getMastery(this.state.parsedMastery);
    
    return( <div className="jumbotron">
              <h1><span onClick={this.resetState} className="home-header"><img height="100" src="./public/img/MasteryGraph.png"/>Mastery</span>{((this.state.activeCourse.courseTitle != '')  ? (<span onClick={this.getMasteryForCourse(this.state.activeCourse)}>{": " + this.state.activeCourse.courseTitle}</span>) : "" )}</h1>
        {(this.state.activeCourse.courseTitle == '') ? (<ul className="nav nav-pills">
            {Object.keys(this.props.stuCourseQuObj.strObj).map((key,id)=> (<li className={(this.state.activeCourse.courseStr == key) ? 'active' : ''} key={"masterynav" + key} onClick={this.getMasteryForCourse({courseStr:key,courseTitle:this.props.stuCourseQuObj.strObj[key]})}><a href="#" onClick={function(event){event.preventDefault();}}>{this.props.stuCourseQuObj.strObj[key]}</a></li>))}
        </ul>) : null}
        {(this.state.mArr.length > 0) ? <MasteryContainer getMasteryForCourse={this.getMasteryForCourse} course={this.state.activeCourse} mArr={this.state.mArr} viewer={this.props.viewer} /> : null}
	    </div> );
  }

}

module.exports = MasteryJumbo;
