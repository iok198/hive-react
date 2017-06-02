import React from 'react'
import ReactDOM from 'react-dom'

class SWIPContainer extends React.Component {
  constructor(props){
    super(props);

    //this.changeSelect = this.changeSelect.bind(this)
    //this.changeSelectState = this.changeSelectState.bind(this)
   }
    
  compare = {
    "lt": (x,y) => (x<y),
    "le": (x,y) => (x<=y),
    "ee": (x,y) => (x==y),
    "ge": (x,y) => (x>=y),
    "gt": (x,y) => (x>y)
  }
  render(){
      return <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Class</th>
        <th>SWIPS</th>
      </tr>
    </thead>
    <tbody>
      {this.props.swipRows.map((swipRow,id) => (this.compare[this.props.swipThreshold.substring(0,2)](swipRow.swips,parseInt(this.props.swipThreshold.substring(2))) ? <tr key={swipRow.stuUDID}>
            <td>{swipRow.name}</td><td>{swipRow.classNo}</td><td>{swipRow.swips}</td>
        </tr> : null))}
    </tbody>
  </table>
  }
}

module.exports = SWIPContainer