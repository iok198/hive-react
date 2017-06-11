import React from 'react'
//possible parent: AssessmentStuRow.js

class AssessmentStuTD extends React.Component {
    constructor(props){
      super(props)
      this.state = {mRating0: this.props.ratingData}
      this.changeSelect = this.changeSelect.bind(this)
      this.changeSelectState = this.changeSelectState.bind(this)
    }
    changeSelect(event){
      this.setState(this.changeSelectState(event.target.value),this.props.changer(this.props.ratingData.stuUDID,this.props.ratingData.LOID, event.target.value,this.props.mArrKey))
      
    }
    
    changeSelectState(val){
      return (prevState,props) =>
      {return {mRating0: val}}
      
    }
    
    //componentDidUpdate(){}
  
    render(){
        return <td id={"Assessment-col-" + this.props.ratingData.courseStrLOIDsID } className={"Assessment-column mback" + this.state.mRating0} >
                        <form>
                          <div className="form-group">
                            <select className="form-control" id="sel1" defaultValue={ this.state.mRating0 } onChange={this.changeSelect} disabled={this.props.mArrKey < 0}>
                              <option value="1">Not Yet</option>
                              <option value="2">Approaching</option>
                              <option value="3">Meeting</option>
                              <option value="4">Exceeding</option>
                            </select>
                          </div>
                        </form>
               </td>
    }
}

module.exports = AssessmentStuTD