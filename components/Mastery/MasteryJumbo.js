import React from 'react'
import ReactDOM from 'react-dom'
import MasteryContainer from './MasteryContainer.js'
import getRequestToArr from '../../utilities/getRequestToArr.js'


class MasteryJumbo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mArr: []
    }
    this.getMasteryForCourse = this.getMasteryForCourse.bind(this)
    this.changeMArrState = this.changeMArrState.bind(this)
  }

  changeMArrState(arr) {
    this.setState({ mArr: arr })
  }

  getMasteryForCourse(courseStr) {
    const changeMArrState = this.changeMArrState.bind(this)
    return () => {
      getRequestToArr(`/mastery/${courseStr}`, changeMArrState)
    }
  }

  render() {
    //let list = this._getMastery(this.state.parsedMastery)

    return (
      <div className="jumbotron">
        <ul className="nav nav-pills">
          {Object.keys(this.props.stuCourseQuObj.strObj).map((key, id) => (<li key={`masterynav${key}`} onClick={this.getMasteryForCourse(key)}><a href="#" onClick={event => { event.preventDefault() }}>{this.props.stuCourseQuObj.strObj[key]}</a></li>))}
        </ul>
        {(this.state.mArr.length > 0) ? <MasteryContainer mArr={this.state.mArr} /> : null}
      </div>
    )
  }

}

export default MasteryJumbo
