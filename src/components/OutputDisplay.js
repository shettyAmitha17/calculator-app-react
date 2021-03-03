import React, { Component } from 'react'

export default class OutputDisplayComponent extends Component {


    render() {
        let { output } = this.props;
        return (
            <div className="calculator-display">
                <div>{output}</div>
            </div>
        )
    }
}
