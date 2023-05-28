import {Component} from "react";
import './App.css';
import React from "react";
import store from "../Calculator/store";

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            firstValue: '0',
            operation: '',
            secondValue: '0'
        }
        this.refScreen = React.createRef();
    }

    handleClickButton(value) {
        const currentValue = value;
        const display = this.refScreen.current;

        if (!this.state.operation) {
            if (this.state.firstValue === "0") {
                this.setState({
                    firstValue: currentValue
                });
            } else {
                this.setState((prevState) => ({
                    firstValue: prevState.firstValue + currentValue
                }));
            }
        } else {
            if (this.state.secondValue === "0") {
                this.setState({
                    secondValue: currentValue
                });
            } else {
                this.setState((prevState) => ({
                    secondValue: prevState.secondValue + currentValue
                }));
            }
        }
        if (display.value === "0") {
            display.value = "";
        }
        display.value += currentValue;
    }

    handleClickOperation(value) {
        const currentValue = value;
        const display = this.refScreen.current;

        if (value === "C") {
            this.setState({
                firstValue: "0",
                secondValue: "",
                operation: ""
            });
            display.value = "0";
        } else if (value === "=") {
            const firstValue = parseFloat(this.state.firstValue);
            const secondValue = parseFloat(this.state.secondValue);
            let result = 0;

            if (this.state.operation === "+") {
                result = firstValue + secondValue;
            } else if (this.state.operation === "-") {
                result = firstValue - secondValue;
            } else if (this.state.operation === "*") {
                result = firstValue * secondValue;
            } else if (this.state.operation === "/") {
                result = firstValue / secondValue;
            }

            this.setState({
                firstValue: result.toString(),
                secondValue: "",
                operation: ""
            });
            display.value = result.toString();
        } else {
            this.setState({
                operation: currentValue
            });
            display.value = currentValue;
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="screen">
                        <input ref={this.refScreen} type="text" defaultValue='0'/>
                    </div>
                    <div className="buttons">
                        {store.buttons.map(item => <button
                            onClick={() => {this.handleClickButton(item.value)}}
                            key={item.id}>{item.value}</button>)}
                        {store.operations.map(item => <button
                            onClick={() => {this.handleClickOperation(item.value)}}
                            key={item.id}>{item.value}</button>)}
                    </div>
                </div>

            </div>
        );
    }
}

