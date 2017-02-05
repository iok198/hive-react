import React from 'react';
var BDRPanelTable = require('./BDRPanelTable');

class BDRPanel extends React.Component {
  render() {
    return <div id="" className="panel panel-default">
              <div id="" className="panel-body">
                  <div id="" className="panel panel-default">
                    <div id="" className="panel-body">
                      {this.props.bdr.studentName}
		      <BDRPanelTable bdr={this.props.bdr} />
                    </div>
                  </div>
              </div>
            </div>;
  }
}

module.exports = BDRPanel;
