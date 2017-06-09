import React from 'react';
import BDRPanelTable from './BDRPanelTable.js'

class BDRPanel extends React.Component {
  constructor(props) {
    super(props)
    this.createRestoreDialog = this.createRestoreDialog.bind(this)
  }
  render() {
    return (
      <div id="" className="panel panel-default">
        <div id="" className="panel-body">
          <div id="" className="panel panel-default">
            <div id="" className={"panel-body panel-" + this.props.bdr.swipCode + "swip"}>
              {((parseInt(this.props.bdr.swipCode) > 0) ? ("-" + this.props.bdr.swipCode + " SWIP(s): ") : "Restored: ") + " " + this.props.bdr.problemBehavior}
            </div>
          </div>
          <BDRPanelTable bdr={this.props.bdr} />
          <div className="col-sm-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {"Restore Anecdote"}
              </div>
              <div className="panel-body">
                {!!this.props.bdr.restoreAnecdote ? this.props.bdr.restoreAnecdote : this.createRestoreDialog(this.props.bdr.entryID)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  createRestoreDialog(bdrID) {
    return (
      <div className="form-group">
        <textarea className="form-control" rows="5" id={"restore" + bdrID}></textarea>
        <button type="button" className="btn btn-success" onClick={this.props.restore}>{"Restore"}</button>
      </div>
    )
  }

}

export default BDRPanel
