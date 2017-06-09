import React from 'react'
import ReactDOM from 'react-dom'
import MasteryPanel from './MasteryPanel.js'
import MasteryHeadTR from './MasteryHeadTR.js'
import MasteryHeadTD from './MasteryHeadTD.js'
import MasteryStuTR from './MasteryStuTR.js'
import MasteryStuTD from './MasteryStuTD.js'
import parseMastery from './utilities/parseMastery.js'
import postRequestForReact from '../../utilities/postRequestForReact.js'

class MasteryTable extends React.Component {
  constructor(props) {
    super(props)
    //console.log(this.props.mArrS)
    this.state = {
    }
    //this.upVPage = this.props.upVPage.bind(this)
    //this.downVPage = this.props.downVPage.bind(this)
    //this.changeMastery = this.props.changeMastery.bind(this)
    //this.parseMastery = parseMastery.bind(this)
    //this.parseMastery = parseMastery.bind(this)

  }

  render() {
    //let list = this._getMastery(this.state.parsedMastery)

    return (
      <table id="" className="table table-bordered">
        <tbody>
          {(<MasteryHeadTR key={3813} parsedMastery={this.props.parsedMastery} colOffset={0} page={this.props.page} upVPage={this.props.upVPage} downVPage={this.props.downVPage} />)}
          {/*console.log(this.props.parsedMastery.rowsByStu)*/}
          {Object.keys(this.props.parsedMastery.rowsByStu).slice(0 + 5 * (this.props.vpage), 5 + 5 * (this.props.vpage)).map((stuUDID, id1) => (<MasteryStuTR key={stuUDID} stuData={this.props.parsedMastery.rowsByStu[stuUDID]} mRating0s={this.props.parsedMastery.mRating0s[stuUDID]} mRatingStr={this.props.parsedMastery.mRatingStrs[stuUDID]} stuBio={this.props.parsedMastery.stuBios[stuUDID]} stuUDID={stuUDID} colOffset={id1} page={this.props.page} changer={this.props.changeMastery} />))}
        </tbody>
      </table>)
  }


}

export default MasteryTable
