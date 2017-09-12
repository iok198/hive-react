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
      viewOption:'',
      swipCount:20
    }
    this.getSWIPsForThreshold = this.getSWIPsForThreshold.bind(this)
    this.changeSWIPThreshold = this.changeSWIPThreshold.bind(this)
    this.changeSelectState = this.changeSelectState.bind(this)
    this.filterSWIPStu = this.filterSWIPStu.bind(this)
    this.filterSWIPClass = this.filterSWIPClass.bind(this)
    this.getBDRsByUDID = this.getBDRsByUDID.bind(this)
    this.setSWIPTableFilterByUDID = this.setSWIPTableFilterByUDID.bind(this)
    this.mergeBDRsToComments = this.mergeBDRsToComments.bind(this)
    this.updateBDRComments = this.updateBDRComments.bind(this)
    this.swipCounter = this.swipCounter.bind(this)

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
      console.log('swips update')
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
    this.setState({bdrArr:this.mergeBDRsToComments(arr),swipCount:this.swipCounter(arr[0])})
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
  
  componentWillMount(){this.props.viewer.courseStr.substring(0,1) != 's' ? this.getSWIPsForThreshold("le20")() : this._viewOptionSelect('mybdr')}
  
  render(){
    let list

    if (this.state.viewOption == "bdr"){
      list = this._getBDRs();
    } else if (this.state.viewOption == "swipTable"){
      list = <div><SWIPFilter setSWIPTableFilterByUDID={this.setSWIPTableFilterByUDID} changeSWIPThreshold={this.changeSWIPThreshold} filterSWIPClass={this.filterSWIPClass} filterSWIPStu={this.filterSWIPStu}/>
      <SWIPContainer setSWIPTableFilterByUDID={this.setSWIPTableFilterByUDID} swipRows={this.state.swipArr} getBDRsByUDID={this.getBDRsByUDID} swipThreshold={this.state.swipThreshold} nameFilter={this.state.nameFilter} classFilter={this.state.classFilter} udidFilter={this.state.udidFilter}/></div>
    } else if (this.state.viewOption == "stulookup") {
      list = <div><SWIPContainer setSWIPTableFilterByUDID={this.setSWIPTableFilterByUDID} swipRows={this.state.swipArr} getBDRsByUDID={function(){return null}} swipThreshold={"le20"} nameFilter={""} classFilter={""} udidFilter={this.state.udidFilter} /> {this._getBDRs()}</div>
    } else if (this.state.viewOption == "newBDR") {
      list = <NewBDRPanel authorUDID={this.props.viewer.entryID} newBDRTrigger={function(){this._viewOptionSelect('mybdr')}.bind(this)}/>
    }
    else list = null
    
    
    return( <div id="" className="jumbotron">
             <h1><img height="100" src="./public/img/SWIPSGraph.png"/>{(this.props.viewer.courseStr.substring(0,1) != 's' ? null : this.state.swipCount)} SWIPs</h1>
             {this.props.viewer.courseStr.substring(0,1) != 's' ?
              (<div><button type="button" className="btn btn-primary" onClick={function(){this._viewOptionSelect('mybdr')}.bind(this)}>View My BDRs</button>
              <button type="button" className="btn btn-primary" onClick={function(){this._viewOptionSelect('swipTable')}.bind(this)}>View the SWIP Table</button>
              <button type="button" className="btn btn-primary" onClick={function(){this._viewOptionSelect('newBDR')}.bind(this)}>Write New BDR</button>

              <br /></div>) : null}
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
      case "newBDR":
        this.setState({viewOption:"newBDR"})
        break
      case "mybdr":
        this.getBDRsByUDID(this.props.viewer.entryID)()
        this.setState({viewOption:"bdr"})
        break
      default:
        return
    }
  }

  _getBDRs(){
    console.log('__getBDRs')
    console.log(this.state.bdrArr)
    var bdrArr = this.state.bdrArr
    var bdrMap = bdrArr.map((bdr,id) => {
        if(!bdr.hasOwnProperty('comments')){bdr.comments = []}
      return (<BDRPanel key={bdr.entryID} bdr={bdr} viewerID={this.props.viewer.entryID} viewer={this.props.viewer} updateBDRComments={function(comment){this.updateBDRComments(id,comment)}.bind(this)}/>)
    })
    //bdrMap.splice(0,0,<NewBDRPanel key={0}/>)
    return bdrMap
  }

  updateBDRComments(bdrArrID,comment){
    var bdrArr = this.state.bdrArr.slice()
    if(bdrArr[bdrArrID].swipCode > 0 && comment.restoring){
      bdrArr[bdrArrID].swipCode = parseInt((bdrArr[bdrArrID].swipCode)*-1)
      //this.getSWIPsForThreshold.bind(this)("le20")
    }
    bdrArr[bdrArrID].comments.push(comment)
    this.setState.bind(this)(()=>{bdrArr:bdrArr},this.getSWIPsForThreshold.bind(this)("le20"))
  }

  swipCounter(arr){
    var count = 20
    arr.forEach((bdr)=>{
      if(bdr.swipCode >= 0){
        console.log(bdr.swipCode + 'swips')
        count = count - bdr.swipCode
      }
    })
    return count
  }

}

module.exports = BDRJumbo;