import React from 'react';
var BDRPanelTable = require('./BDRPanelTable.js');

class BDRPanel extends React.Component {
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
		<div className="panel panel-success">
		  <div className="panel-heading">
		    {"Restore Anecdote"}
		  </div>
		  <div className="panel-body">
		    {this.props.bdr.restoreAnecdote}
		  </div>
		</div>
		</div>
              </div>
            </div>;
  }
}

module.exports = BDRPanel;
