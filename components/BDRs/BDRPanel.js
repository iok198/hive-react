import React from 'react';
var BDRPanelTable = require('./BDRPanelTable.js');
var BDRComments = require('./BDRComments.js')

class BDRPanel extends React.Component {
  constructor(props){
      super(props)
      console.log('bdrpanel props')
      console.log(this.props)
      this.createRestoreDialog = this.createRestoreDialog.bind(this)
  }
  render() {
    return <div id="" className="panel panel-default">
              <div id="" className="panel-body">
                  <div id="" className="panel panel-default">
                    <div id="" className={"panel-body panel-" + this.props.bdr.swipCode + "swip"}>
                      {((parseInt(this.props.bdr.swipCode) > 0) ? ("-" + this.props.bdr.swipCode + " SWIP(s): ") : "Restored: ") + " " + this.props.bdr.problemBehavior}
                    </div>
                  </div>
		<BDRPanelTable bdr={this.props.bdr} />
		<div className="col-sm-12">
		<div className="panel panel-default">
		  <div className="panel-heading">
		    {"Comments"}
		  </div>
		  <div className="panel-body">
		    {!!this.props.bdr.restoreAnecdote ? this.props.bdr.restoreAnecdote : this.createRestoreDialog(this.props.bdr.entryID)}
		  </div>
      <BDRComments comments={this.props.bdr.comments} bdr={this.props.bdr} />
      {/*<ul className="list-group">
        {this.props.bdr.comments.map((comment)=>(<li key={comment.entryID} className="list-group-item">{comment.commentText}</li>))}
      </ul>*/}
      {/*this.props.bdr.comments.map((comment)=>(<p key={comment.entryID}>{comment.commentText}</p>))*/}
		</div>
		</div>
              </div>
            </div>;
  }
  
  createRestoreDialog(bdrID){
    return <div className="form-group">
      <textarea className="form-control" rows="5" id={"restore" +  bdrID}></textarea>
      <button type="button" className="btn btn-success" onClick={this.props.restore}>{"Restore"}</button>
    </div> 
  }
  
}

module.exports = BDRPanel;
