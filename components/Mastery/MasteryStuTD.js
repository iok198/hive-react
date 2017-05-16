import React from 'react'
//possible parent: MasteryStuRow.js

class MasteryStuTD extends React.Component {
    constructor(props){
      super(props)
      this.state = {mRating0: this.props.ratingData.mRating0}
    }
  
  
    render(){
        return <td id={"mastery-col-" + this.props.ratingData.courseStrLOIDsID } className="mastery-column" >
                        <form>
                          <div className="form-group">
                            <select className="form-control" id="sel1" defaultValue={ this.state.mRating0 } onChange={this.props.changer(this.props.ratingData.stuUDID,this.props.ratingData.LOID, this.value)}>
                              <option value="1">Not Yet</option>
                              <option value="2">Approaching</option>
                              <option value="3">Meeting</option>
                              <option value="4">Exceeding</option>
                            </select>
                          </div>
                        </form>
                      
                      <span id="" className="badge badgeNY" >{this.props.ratingData.mcountN}</span>
                      <span id="" className="badge badgeA">{this.props.ratingData.mcountA}</span>
                      <span id="" className="badge badgeM">{this.props.ratingData.mcountM}</span>
                      <span id="" className="badge badgeE">{this.props.ratingData.mcountE}</span>

               </td>
    }
}

module.exports = MasteryStuTD