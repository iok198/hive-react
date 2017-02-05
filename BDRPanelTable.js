import React from 'react';



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
                  <div id="" className="col-sm-4 ">
                    <strong id="" className="">Date/Time</strong><br/>
                    <span id="" className=""> {this.state.bdrdate } <br/> { this.state.bdrtime }<br/>Period {this.state.incidentPeriod }</span>
                  </div>
                  <div id="" className="col-sm-4 ">
                    <strong id="" className="">Student</strong><br/>
                    <span id="" className=""> {this.state.studentName} </span>
                  </div>
    

                  <div id="" className="col-sm-4 ">
                  <strong id="" className="">Staff</strong><br/>
                  <span id="bdrStaffName-167" className=""> {this.state.staffName} </span>
                  </div>
                </div>
                <div id="" className="row ">
                  <div id="" className="col-sm-4 ">
                    <strong id="" className="">Location</strong><br/>
                    <span id="" className=""> {this.state.location} </span>
                  </div>
		  <div id="" className="col-sm-4 ">
                    <strong id="" className="">Others Involved</strong><br/>
                    <span id="" className=""> {this.state.othersInvolved} </span>
                  </div>
		  <div id="" className="col-sm-4 ">
                    <strong id="" className="">Possible Motivation</strong><br/>
                    <span id="" className=""> {this.state.possibleMotivation} </span>
                   </div>
                </div>

                <div id="" className="row ">
                  <div id="" className="col-sm-12 anecdoteTD">
                    <strong id="" className="">Incident Description</strong><br/>
                    <span id="" className=""> {this.state.behaviorAnecdote } </span>
                  </div>
                </div>
              </div>;
  }
}

module.exports = BDRPanelTable;
