import React from 'react';

class BDRPTableCell extends React.Component {
  render(){
        return <div id="" className={"col-sm-" + this.props.colwidth } >
                    <strong id="" className="">{this.props.header }</strong><br/>
                    <span id="" className=""> {this.props.children } </span>
                  </div>;
  }
}

class BDRPanelTable extends React.Component {
  constructor(props){
    super(props)
    var bdr = this.props.bdr;
    bdr.bdrdate = bdr.incidentDateTime.split("-")[1] + '/' + bdr.incidentDateTime.split("-")[2].split("T")[0] + '/' + bdr.incidentDateTime.split("-")[2].split("T")[1];
    bdr.bdrHour = parseInt(bdr.incidentDateTime.split("T")[1].split(":")[0]) - 4;
    bdr.bdrAMPM = (bdr.bdrHour > 11) ? "PM" : "AM";
    bdr.bdrMinute = bdr.incidentDateTime.split("T")[1].split(":")[1];
    bdr.bdrtime = bdr.bdrHour + ":" + bdr.bdrMinute + " " + bdr.bdrAMPM;
    this.state = bdr;
  }

  render() {
    return <div id="" className="col-xs-12">


                <div id="" className="row ">
                  <BDRPTableCell colwidth="4" header="Date/Time"> {this.state.bdrdate} <br/> {this.state.bdrtime} <br/> {"Period " + this.state.incidentPeriod} </BDRPTableCell>
                  <BDRPTableCell colwidth="4" header="Student Name"> {this.state.studentName }</BDRPTableCell>
   		  <BDRPTableCell colwidth="4" header="Staff Name"> {this.state.staffName }</BDRPTableCell>
                </div>

                <div id="" className="row ">
                  <BDRPTableCell colwidth="4" header="Location"> {this.state.location} </BDRPTableCell>
		  <BDRPTableCell colwidth="4" header="Location"> {this.state.othersInvolved} </BDRPTableCell>
		  <BDRPTableCell colwidth="4" header="Possible Motivation"> {this.state.possibleMotivation} </BDRPTableCell>
                </div>

                <div id="" className="row ">
                  <BDRPTableCell colwidth="12" header="Incident Description"> {this.state.behaviorAnecdote } </BDRPTableCell>
                </div>
              </div>;
  }
}

module.exports = BDRPanelTable;
