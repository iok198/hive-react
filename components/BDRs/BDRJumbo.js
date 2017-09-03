import React from 'react'
import ReactDOM from 'react-dom'
var BDRPanel = require('./BDRPanel.js')
var SWIPContainer = require('./SWIPTables/SWIPTable.js')
var SWIPFilter = require('./SWIPTables/SWIPFilter.js')
var getRequestToArr = require('../../utilities/getRequestToArr.js')
var NewBDRPanel = require('./NewBDRPanel.js')

class BDRJumbo extends React.Component {
  constructor(props){
    super(props)

    this.state = {bdrArr: this.mergeBDRsToComments(this.props.bdrs),
      showBDRs: false,
      swipArr:[],
      swipThreshold:"le20",
      nameFilter:'',
      classFilter:'',
      udidFilter:0,
      viewOption:''
    }
    this.getSWIPsForThreshold = this.getSWIPsForThreshold.bind(this)
    this.changeSWIPThreshold = this.changeSWIPThreshold.bind(this)
    this.changeSelectState = this.changeSelectState.bind(this)
    this.filterSWIPStu = this.filterSWIPStu.bind(this)
    this.filterSWIPClass = this.filterSWIPClass.bind(this)
    this.getBDRsByUDID = this.getBDRsByUDID.bind(this)
    this.setSWIPTableFilterByUDID = this.setSWIPTableFilterByUDID.bind(this)
    this.mergeBDRsToComments = this.mergeBDRsToComments.bind(this)

   }
  
  getBDRsByUDID(udid){
    var changeBDRArrState = this.changeBDRArrState.bind(this)
    var mergeBDRsToComments = this.mergeBDRsToComments.bind(this)
    return function(){
      //getRequestToArr("/bdrs/" + udid,changeBDRArrState)
      //getRequestToArr("/bdrsplusc/" + udid,mergeBDRsToComments)
      getRequestToArr("/bdrsplusc/" + udid,changeBDRArrState)
    }
  }

  mergeBDRsToComments(bdrArr){
    var mergedObj = {}
    bdrArr[0].forEach((item)=>{
      mergedObj[item.entryID] = item
      mergedObj[item.entryID].comments = []}
      )
    bdrArr[1].forEach((comment)=>{mergedObj[comment.bdrID].comments.push(comment)})
    var mergedArr = Object.keys(mergedObj).map((item)=>mergedObj[item])
    //console.log(mergedArr)
    //this.changeBDRArrState.bind(this)(mergedArr)
    return mergedArr
  }

  getSWIPsForThreshold(swipThreshold){
    var changeSWIPArrState = this.changeSWIPArrState.bind(this)
    return function(){
      getRequestToArr("/swips/" + swipThreshold,changeSWIPArrState)}
  }

  setSWIPTableFilterByUDID(udid){
    var changeUDIDFilterState = this.changeUDIDFilterState.bind(this)
    return function(){
      changeUDIDFilterState(udid)
    }
  }

  changeUDIDFilterState(udid){
    this.setState({udidFilter:udid,viewOption:'stulookup'})
  }

  changeBDRArrState(arr){
    //console.log(arr)
    console.log("changing bdrArr")
    console.log(arr)
    this.setState({bdrArr:this.mergeBDRsToComments(arr)})
  }
  
  changeSWIPArrState(arr){
    this.setState({swipArr:arr})
  }
  
  changeSWIPThreshold(event){
    this.setState(this.changeSelectState(event.target.value))
  }
  
  changeSelectState(val){
      return (prevState,props) =>
      {return {swipThreshold: val}}
      
    }
  
  filterSWIPStu(text){
    this.setState({nameFilter:text})
  }
  
  filterSWIPClass(text){
    this.setState({classFilter:text})
  }
  
  componentWillMount(){this.getSWIPsForThreshold("le20")()}
  
  render(){
    let list
    
    if (this.state.viewOption == "bdr"){
      list = this._getBDRs();
    } else if (this.state.viewOption == "swipTable"){
      list = <div><SWIPFilter setSWIPTableFilterByUDID={this.setSWIPTableFilterByUDID} changeSWIPThreshold={this.changeSWIPThreshold} filterSWIPClass={this.filterSWIPClass} filterSWIPStu={this.filterSWIPStu}/>
      <SWIPContainer setSWIPTableFilterByUDID={this.setSWIPTableFilterByUDID} swipRows={this.state.swipArr} getBDRsByUDID={this.getBDRsByUDID} swipThreshold={this.state.swipThreshold} nameFilter={this.state.nameFilter} classFilter={this.state.classFilter} udidFilter={this.state.udidFilter}/></div>
    } else if (this.state.viewOption == "stulookup") {
      list = <div><SWIPContainer setSWIPTableFilterByUDID={this.setSWIPTableFilterByUDID} swipRows={this.state.swipArr} getBDRsByUDID={function(){return null}} swipThreshold={"le20"} nameFilter={""} classFilter={""} udidFilter={this.state.udidFilter} /> {this._getBDRs()}</div>
    } 
    else list = null
    
    
    return( <div id="" className="jumbotron">
             <h1><img height="100" src="./public/img/SWIPSGraph.png"/> SWIPs</h1>
              <button type="button" className="btn btn-primary" onClick={function(){this._viewOptionSelect('bdr')}.bind(this)}>My BDRs</button>
              <button type="button" className="btn btn-primary" onClick={function(){this._viewOptionSelect('swipTable')}.bind(this)}>SWIP Table</button>
              
              <br />
              {list}
	    </div> );
}

  _toggleBDRs(){
    this.setState({showBDRs: !this.state.showBDRs});
  }

  _viewOptionSelect(arg){
    switch(arg){
      case "bdr":
        this.setState({viewOption:"bdr"})
        break
      case "swipTable":
        this.setState({viewOption:"swipTable",udidFilter:0})
        break
      default:
        return
    }
  }
  
  _getBDRs2(){
    const bdrArr = this.props.bdrs;
    return (<table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Class</th>
        <th>SWIPS</th>
      </tr>
    </thead>
    <tbody>
    {bdrArr.map((bdr) => (<tr key={bdr.entryID} bdr={bdr} ></tr>))}
    </tbody>
    </table>
    )}

  _getBDRs(){
    console.log('__getBDRs')
    console.log(this.state.bdrArr)
    var bdrArr = this.state.bdrArr;
    var bdrMap = bdrArr.map((bdr) => {
        if(!bdr.hasOwnProperty('comments')){bdr.comments = []}
      return (<BDRPanel key={bdr.entryID} bdr={bdr} />)
    })
    bdrMap.splice(0,0,<NewBDRPanel key={0}/>)
    return bdrMap
  }
}

module.exports = BDRJumbo;