import React from 'react'

class MasteryStuTR extends React.Component {
    render(){
        return <tr id={"mastery-row-" + this.props.stuUDID } className="mastery-row" >{this.props.children}</tr>
    }
}

module.exports = MasteryStuTR