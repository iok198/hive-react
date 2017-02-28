import React from 'react'

class MasteryStuTD extends React.Component {
    render(){
        return <td id={"mastery-col-" + this.props.ratingData.courseStrLOIDsID } className="mastery-column" >
                        <form>
                          <div class="form-group">
                            <select class="form-control" id="sel1">
                              <option>Not Yet</option>
                              <option>Approaching</option>
                              <option>Meeting</option>
                              <option>Exceeding</option>
                            </select>
                          </div>
                        </form>
                      <span className="lo-text-span">{this.props.ratingData.mRating0}</span>
                      <br />
                      <span id="" className="badge badgeNY">{this.props.ratingData.mcountN}</span>
                      <span id="" className="badge badgeA">{this.props.ratingData.mcountA}</span>
                      <span id="" className="badge badgeM">{this.props.ratingData.mcountM}</span>
                      <span id="" className="badge badgeE">{this.props.ratingData.mcountE}</span>

               </td>
    }
}

module.exports = MasteryStuTD