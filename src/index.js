import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Body extends React.Component {
  state = {
    value: [],
    answer: '',
    operatorDisabled: false,
  }

  handleKeyPress = (e) => {
    e.preventDefault();
    const operatorDisabled = this.state.operatorDisabled;
    this.setState({ answer: '' });
    const keyboardInput = e.key;
    const code = e.keyCode;
    const operators = [106, 107, 109, 111];
    const numbers = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110]
    if (keyboardInput === 'Enter') {
      this.handleClickEquals();
    } else if (code === 8) {
      this.handleClickBack();
    } else if (operators.some(x => x === code) && !operatorDisabled) {
      this.setState({ operatorDisabled: true});
      this.state.value.push(keyboardInput);
      this.setState({ value: this.state.value })
    } else if (numbers.some(y => y === code)) {
      this.state.value.push(keyboardInput);
      this.setState({ value: this.state.value })
    } else {
      const invalid = '';
      this.state.value.push(invalid);
    }
  }

  handleClick = (e) => {
    this.setState({ answer: '' });
    const userInput = e.currentTarget.dataset.id;
    this.state.value.push(userInput);
    this.setState({ value: this.state.value });
  }

  handleClickOperator = (e) => {
    if (this.state.operatorDisabled === true) {
      const noInput = '';
      this.state.value.push(noInput);
      this.setState({ value: this.state.value });
    } else {
      this.setState({ operatorDisabled: true })
      const userInput1 = e.currentTarget.dataset.id;
      this.state.value.push(userInput1);
      this.setState({ value: this.state.value });
    }
  }

  handleClickEquals = () => {
    this.setState({ operatorDisabled: false });
    const inputArray = this.state.value;
    const stringInput = inputArray.join('');
    const regex = /[^\d.]/;
    const operatorIndex = stringInput.search(regex);
    const operator = regex.exec(stringInput);
    const number1 = Number(stringInput.slice(0, operatorIndex));
    const number2 = Number(stringInput.slice(operatorIndex + 1));
    if ((operatorIndex === 0 && operator[0] === "*") || (operatorIndex === 0 && operator[0] === "/") || (operatorIndex === stringInput.length - 1)) {
      this.setState({ answer: "error: incomplete expression" });
    } else if (operatorIndex === -1) {
      this.setState({ answer: stringInput + " = " + stringInput })
    } else if (operator[0] === "+") {
      this.setState({ answer: number1 + " + " + number2  + " = " + (number1 + number2) })
    } else if (operator[0] === "-") {
      this.setState({ answer: number1 + " - " + number2 + " = " + (number1 - number2) })
    } else if (operator[0] === "*") {
      this.setState({ answer: number1 + " × " + number2 + " = " + (number1 * number2) })
    } else if (operator[0] === "/") {
      this.setState({ answer: number1 + " ÷ " + number2 + " = " + (number1 / number2) })
    } else {
      this.setState({ answer: '' })
    }
    this.setState({ value: [] })
  }

  handleClickPercent = () => {
    const inputArray1 = this.state.value;
    const inputString1 = inputArray1.join('');
    const percentAnswer = inputString1 / 100;
    this.setState({ answer: percentAnswer });
    this.setState({ value: [] })
  }

  handleClickSquare = () => {
    const inputArray2 = this.state.value;
    const inputString2 = inputArray2.join('');
    const squareAnswer = Math.pow(inputString2, 2);
    this.setState({ answer: squareAnswer });
    this.setState({ value: [] })
  }

  handleClickRoot = () => {
    const inputArray3 = this.state.value;
    const stringInput3 = inputArray3.join('');
    const rootAnswer = Math.pow(stringInput3, 0.5);
    this.setState({ answer: rootAnswer });
    this.setState({ value: [] })
  }

  handleClickBack = () => {
    this.setState({ answer: 0 })
    const inputArray4 = this.state.value;
    const inputString4 = inputArray4.join('')
    const lastDigit = inputArray4.pop();
    const regex = /[^\d.]/;
    const operator = regex.exec(inputString4);
    if (operator === undefined) {
      this.setState({ value: inputArray4 });
    } else {
      this.setState({ operatorDisabled: false });
    }
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody tabIndex="0" onKeyDown={this.handleKeyPress}>
            <tr className='row'>
              <td className='display-value' colSpan='4'>{this.state.value}</td>
            </tr>
            <tr>
              <td className='display-answer' colSpan='4'>{this.state.answer}</td>
            </tr>
            <tr className='row'>
              <td className='operator' onClick={this.handleClickPercent}>%</td>
              <td className='operator' onClick={this.handleClickSquare}>x²</td>
              <td className='operator' onClick={this.handleClickRoot}>√x</td>
              <td className='delete' onClick={this.handleClickBack}>⌫</td>
            </tr>
            <tr className='row'>
              <td className='item' data-id='7' onClick={this.handleClick}>7</td>
              <td className='item' data-id='8' onClick={this.handleClick}>8</td>
              <td className='item' data-id='9' onClick={this.handleClick}>9</td>
              <td className='operator' data-id='-' onClick={this.handleClickOperator}>-</td>
            </tr>
            <tr className='row'>
              <td className='item' data-id='4' onClick={this.handleClick}>4</td>
              <td className='item' data-id='5' onClick={this.handleClick}>5</td>
              <td className='item' data-id='6' onClick={this.handleClick}>6</td>
              <td className='operator' data-id='+' onClick={this.handleClickOperator}>+</td>
            </tr>
            <tr className='row'>
              <td className='item' data-id='1' onClick={this.handleClick}>1</td>
              <td className='item' data-id='2' onClick={this.handleClick}>2</td>
              <td className='item' data-id='3' onClick={this.handleClick}>3</td>
              <td className='operator' data-id='*' onClick={this.handleClickOperator}>×</td>
            </tr>
            <tr className='row'>
              <td className='item' data-id='0' onClick={this.handleClick}>0</td>
              <td className='item' data-id='.' onClick={this.handleClick}>.</td>
              <td className='operator' data-id='/' onClick={this.handleClickOperator}>÷</td>
              <td className='equals' data-id='=' onClick={this.handleClickEquals}>=</td>
            </tr>
          </tbody>
        </table>
        <div ></div>
      </div>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <div>
        <Body />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

