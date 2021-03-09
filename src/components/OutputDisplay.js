import React, { Component } from 'react'

export default class OutputDisplayComponent extends Component {


    render() {
        let { output, input } = this.props;
        return (
            <div className="calculator-display">
                <div>{input}</div>
                <div>{output}</div>
            </div>
        )
    }
}
