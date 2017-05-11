import React from 'react'
//possible parent: MasteryStuRow.js
class MasteryStuTD extends React.Component {
    render(){
        return <td id={"mastery-col-" + this.props.ratingData.courseStrLOIDsID } className="mastery-column" >
                        <form>
                          <div className="form-group">
                            <select className="form-control" id="sel1" value={ this.props.ratingData.mRating0 }>
                              <option>Not Yet</option>
                              <option>Approaching</option>
                              <option>Meeting</option>
                              <option>Exceeding</option>
                            </select>
                          </div>
                        </form>
                      <br />
                      <span id="" className="badge badgeNY">{this.props.ratingData.mcountN}</span>
                      <span id="" className="badge badgeA">{this.props.ratingData.mcountA}</span>
                      <span id="" className="badge badgeM">{this.props.ratingData.mcountM}</span>
                      <span id="" className="badge badgeE">{this.props.ratingData.mcountE}</span>

               </td>
    }
}

module.exports = MasteryStuTD