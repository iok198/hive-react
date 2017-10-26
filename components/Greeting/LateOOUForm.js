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
                    {this.props.students.map((student,id) => {
                      var buttons = null
                      if(!student.problemBehavior){
                        buttons = (<tr key={id}><td>{student.name + ' (' + student.classNo + ')'}</td><td><span className="btn btn-info" onClick={function(){this.props.sendLateOOU(student.entryID,'Late Arrival: ')}.bind(this)}>Late</span></td><td><span className="btn btn-info" onClick={function(){this.props.sendLateOOU(student.entryID,'Out of Uniform Arrival: ')}.bind(this)}>Out of Uniform</span></td><td><span className="btn btn-info" onClick={function(){this.props.sendLateOOU(student.entryID,'Late & Out of Uniform Arrival: ')}.bind(this)}>Late & Out of Uniform</span></td></tr>)
                      }
                      else {
                        if(student.problemBehavior.substring(0,31) == 'Late & Out of Uniform Arrival: '){
                          if(parseInt(student.swipCode) == 2){
                            buttons = (<tr key={id}><td>{student.name + ' (' + student.classNo + ') late & oou'}</td><td><span className="btn btn-info" onClick={function(){this.props.upgradeLateOOU(student.entryID,"Student attended same-day Lunch Detention.",student.bdrID)}.bind(this)}>Attended Lunch Detention</span></td><td><span className="btn btn-info" onClick={function(){this.props.upgradeLateOOU(student.entryID,'Student attended same-day Late Dismissal.',student.bdrID)}.bind(this)}>Attended Late Dismissal</span></td></tr>)
                          }
                          else if (parseInt(student.swipCode) < 0) {
                            buttons = (<tr key={id}><td>{student.name + ' (' + student.classNo + ') late & oou'}</td><td>Attended same-day Lunch Detention & Late Dismissal</td></tr>)
                          }
                          else if (student.commentText = 'Student attended same-day Lunch Detention.') {
                            buttons = (<tr key={id}><td>{student.name + ' (' + student.classNo + ') late & oou'}</td><td><span className="btn btn-info" onClick={function(){this.props.restoreLateOOU(student.entryID,"Student attended same-day Late Dismissal.",student.bdrID)}.bind(this)}>Attended Late Dismissal</span></td></tr>)
                          }
                          else if (student.commentText = 'Student attended same-day Late Dismissal.'){
                              buttons = (<tr key={id}><td>{student.name + ' (' + student.classNo + ') late & oou'}</td><td><span className="btn btn-info" onClick={function(){this.props.restoreLateOOU(student.entryID,"Student attended same-day Lunch Detention.",student.bdrID)}.bind(this)}>Attended Lunch Detention</span></td></tr>)
                          }
                        }
                        else {
                          console.log(student)
                          if (parseInt(student.swipCode) < 0) {
                            buttons = (<tr key={id}><td>{student.name + ' (' + student.classNo + ') late & oou'}</td><td>Attended same-day Late Dismissal</td></tr>)
                          }
                          else {
                          buttons = (<tr key={id}><td>{student.name + ' (' + student.classNo + ') only 1'}</td><td><span className="btn btn-info" onClick={function(){this.props.restoreLateOOU(student.entryID,"Student attended same-day Late Dismissal.",student.bdrID)}.bind(this)}>Attended Late Dismissal</span></td></tr>)
                          }
                        }
                      }
                      return buttons
                      })}
                    </tbody>
                    </table>
                    </div>)
  }
}

module.exports = LateOOUForm