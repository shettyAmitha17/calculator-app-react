import React, { Component } from 'react';
import './App.scss';
import OutputDisplayComponent from './components/OutputDisplay';
import FormulaScreenComponent from './components/FormulaScreen';
import * as math from 'mathjs';
export function calcMe(str) {
    let result = math.evaluate(str)
    result = math.format(result, { precision: 14 })
    result = String(result)
    return result
}

class App extends Component {
    constructor() {
        super();

        this.state = {
            outputDisplay: "",
            inputDisplay: "",
            isResult: false
        }
    }


    handleOnClick = identifier => {
        switch (identifier) {
            case "=":
                this.setState(
                    { inputDisplay: this.state.outputDisplay,  isResult: true })
                this.calculate()
                break;
            case "CE":
                this.reset()
                break;
            case "C":
                if (this.state.outputDisplay === 'error' || this.state.outputDisplay === 'undefined') {
                    this.reset()
                } else {
                    this.backspace()
                }
                break;
            case "undo":
                if(!this.state.isResult) {
                const operands = this.state.outputDisplay.split(/([+,/,%,*,-])/)
                    .filter(it => it);
                if (operands.length > 0) {
                    this.setState({
                        outputDisplay: this.state.outputDisplay.replace(operands[operands.length - 1], '')
                    })
                }
            }
                break;
            case "sin": case "cos": case "tan":
                this.setState({
                    inputDisplay: `${identifier}(${this.state.outputDisplay})`,
                    isResult: true
                })
                try {
                    const result = String(math[identifier](math.evaluate(this.state.outputDisplay)))
                    this.setState({
                        outputDisplay: result
                    })
                } catch (e) {
                    this.setState({
                        outputDisplay: "error"
                    })

                }
                break;
            default:
                let result = this.state.outputDisplay + identifier;
                if (this.state.outputDisplay === 'error' || this.state.outputDisplay === 'undefined') {
                    result = identifier
                }
                this.setState({
                    outputDisplay: result,
                    isResult: false
                })
                break;
            // code block
        }
    };


    calculate = () => {
        var checkResult = this.state.outputDisplay;
        try {
            this.setState({
                // eslint-disable-next-line
                outputDisplay: (calcMe(checkResult) || "") + ""
            })
        } catch (e) {
            this.setState({
                outputDisplay: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            outputDisplay: "",
            inputDisplay: "",
            isResult: false
        })
    };

    backspace = () => {
        this.setState({
            outputDisplay: this.state.outputDisplay.slice(0, -1),
            isResult: false
        })
    };

    render() {
        return (
            <div>
                <h1 className="d-flex justify-center">Calculator</h1>
                <div className="calculator-body">
                    <OutputDisplayComponent output={this.state.outputDisplay} input={this.state.inputDisplay} />
                    <FormulaScreenComponent onClick={this.handleOnClick} />
                </div>
            </div>
        );
    }
}

export default App;
