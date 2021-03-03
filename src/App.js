import React, { Component } from 'react';
import './App.scss';
import OutputDisplayComponent from './components/OutputDisplay';
import FormulaScreenComponent from './components/FormulaScreen';

export function calcMe(str) {
    const noWsStr = str.replace(/\s/g, '');
    const operators = noWsStr.replace(/[\d.,]/g, '').split('');
    const operands = noWsStr.replace(/[+/%*-]/g, ' ')
        .replace(/\,/g, '.')
        .split(' ')
        .map(parseFloat)
        .filter(it => it);

   
    while (operators.includes('*')) {
        let opIndex = operators.indexOf('*');
        operands.splice(opIndex, 2, operands[opIndex] * operands[opIndex + 1]);
        operators.splice(opIndex, 1);
    };
    while (operators.includes('/')) {
        let opIndex = operators.indexOf('/');
        operands.splice(opIndex, 2, operands[opIndex] / operands[opIndex + 1]);
        operators.splice(opIndex, 1);
    };
    while (operators.includes('%')) {
        let opIndex = operators.indexOf('%');
        operands.splice(opIndex, 2, operands[opIndex] % operands[opIndex + 1]);
        operators.splice(opIndex, 1);
    };

    let result = operands[0];
    for (let i = 0; i < operators.length; i++) {
        operators[i] === '+' ? (result += operands[i + 1]) : (result -= operands[i + 1])
    }
    return result

}

class App extends Component {
    constructor() {
        super();

        this.state = {
            outputDisplay: ""
        }
    }


    handleOnClick = identifier => {
        if (identifier === "=") {
            this.calculate()
        }

        else if (identifier === "CE") {
            this.reset()
        }
        else if (identifier === "C") {
            this.backspace()
        }

        else {
            this.setState({
                outputDisplay: this.state.outputDisplay + identifier
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if(this.state.outputDisplay.includes('--')){
            checkResult = this.state.outputDisplay.replace('--','+')
        }

        else {
            checkResult = this.state.outputDisplay
        }

        try {
            this.setState({
                // eslint-disable-next-line
                outputDisplay: (eval(checkResult) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                outputDisplay: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            outputDisplay: ""
        })
    };

    backspace = () => {
        this.setState({
            outputDisplay: this.state.outputDisplay.slice(0, -1)
        })
    };

    render() {
        return (
            <div>
                <h1 className="d-flex justify-center">Calculator</h1>
                <div className="calculator-body">
                    <OutputDisplayComponent output={this.state.outputDisplay} />
                    <FormulaScreenComponent onClick={this.handleOnClick} />
                </div>
            </div>
        );
    }
}

export default App;
