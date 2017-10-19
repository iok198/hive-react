import React from 'react'
import ReactDOM from 'react-dom'


class LateOOUForm extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (<div className="container">
                		<table className="table">
                		<tbody>
                		{this.props.students.map((student,id) => (<tr key={student.entryID} ><td>{student.name + ' (' + student.classNo + ')'}</td><td><span className="btn btn-info">Late</span></td><td><span className="btn btn-info">Out of Uniform</span></td><td><span className="btn btn-info">Late & Out of Uniform</span></td></tr>))}
                		</tbody>
                		</table>
                		</div>)
  }
}

module.exports = LateOOUForm