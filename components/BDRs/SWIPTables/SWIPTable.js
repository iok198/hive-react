import React from 'react'
import ReactDOM from 'react-dom'

class SWIPContainer extends React.Component {
  constructor(props){
    super(props);

     
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
      {Object.keys(this.props.swipRows).map((swipRow) => (<tr>
            <td>{swipRow.name}</td><td>{swipRow.classNo}</td><td>{swipRow.swips}</td>
        </tr>))}
    </tbody>
  </table>
  }
}

module.exports = SWIPContainer