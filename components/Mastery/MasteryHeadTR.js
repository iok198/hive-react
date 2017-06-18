import React from 'react'
var MasteryHeadTD = require('./MasteryHeadTD.js')
//possible parents: GradeJumbo.js
class MasteryHeadTR extends React.Component {
    constructor(props){
        super(props)
        
    }
    render(){
        return <tr id={"mastery-row-head" } className="mastery-row" >
        <td><div className="panel panel-default"><div className="panel-body">{"Student"}
                    <div className="btn-group-vertical" role="group" aria-label="...">
                      <button type="button" className="btn btn-default" onClick={this.props.upVPage}><span className="glyphicon glyphicon-arrow-up" ></span></button>
                      <button type="button" className="btn btn-default" onClick={this.props.downVPage}><span className="glyphicon glyphicon-arrow-down" ></span></button>
                    </div>
                    <div className="input-group">
                      <span className="input-group-addon" id="basic-addon3">Name:</span>
                      <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onClick={function(e){this.props.filterMasteryStu(e.target.value)}} />
                    </div>
                </div>
            </div>
            <div className="btn-group pager">
                <button type="button" className="btn btn-default"  onClick={this.props.prevPage}><span className="glyphicon glyphicon-arrow-left" ></span></button>
                <button type="button" className="btn btn-default"  onClick={this.props.nextPage}><span className="glyphicon glyphicon-arrow-right" ></span></button>
            </div>
        </td>
        {[0,1,2,3].map((id,index) => 
        {
        if(!!this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]]){
        return <MasteryHeadTD key={this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]].courseStrLOID} mRecord={(!!this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]]) ? this.props.parsedMastery.masteryArrS[Object.keys(this.props.parsedMastery.masteryArrS)[id+4*this.props.page]] : {mcountN:0, mcountA:0, mcountM:0, mcountE:0}} colOffset={id}/>
        }
            else return null
        })
        }
        </tr>
    }
}

module.exports = MasteryHeadTR