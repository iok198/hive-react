import React from 'react'

class MasteryStuRow extends React.Component {
    render(){
        return <div id={"mastery-row-" + this.props.stuUDID } className="mastery-row" style={{height: 148 + 'px'}}>
                {this.props.children}
               </div>
    }
}

module.exports = MasteryStuRow