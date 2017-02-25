import React from 'react'

class MasteryStuRow extends React.Component {
    render(){
        return <div id={"mastery-row-" + this.props.stuUDID } className="mastery-row" style={{top: (40 + this.props.colOffset*140) + 'px'}}>
                {this.props.children}
               </div>
    }
}

module.exports = MasteryStuRow