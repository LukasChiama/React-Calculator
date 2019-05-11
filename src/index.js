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
    const { value, operatorDisabled, answer } = this.state;
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
      if (answer.length && !answer.includes('error') && !value.length) {
        const ans = answer.slice(answer.indexOf('=') + 1).trim();
        value.push(ans);
      }
      value.push(keyboardInput);
      this.setState({ value })
    } else if (numbers.some(y => y === code)) {
      value.push(keyboardInput);
      this.setState({ value })
    } else {
      return;
    }
  }

  handleClick = (e) => {
    const { value } = this.state;
    const userInput = e.currentTarget.dataset.id;
    value.push(userInput);
    this.setState({ value });
  }

  handleClickOperator = (e) => {
    const { answer, value, operatorDisabled } = this.state;
    if (operatorDisabled) {
      return;
    } else {
      this.setState({ operatorDisabled: true })
      if (answer.length && !answer.includes('error') && !value.length) {
        const ans = answer.slice(answer.indexOf('=') + 1).trim();
        value.push(ans);
      }
      if (answer !== '') {
        this.setState({ value: answer})
      }
      const userInput1 = e.currentTarget.dataset.id;
      value.push(userInput1);
      this.setState({ value });
    }
  }

  handleClickEquals = () => {
    this.setState({ operatorDisabled: false });
    const { value } = this.state;
    const stringInput = value.join('');
    const regex = /[^\d.]/;
    const operatorIndex = stringInput.search(regex);
    const operator = regex.exec(stringInput);
    const number1 = Number(stringInput.slice(0, operatorIndex));
    const number2 = Number(stringInput.slice(operatorIndex + 1));
    if ((operatorIndex === 0 && operator[0] === "*") || (operatorIndex === 0 && operator[0] === "/") || (operatorIndex === stringInput.length - 1)) {
      this.setState({ answer: "error: incomplete expression" });
    } else if (operatorIndex === -1) {
      this.setState({ answer: `${stringInput} = ${stringInput}` })
    } else if (operator[0] === "+") {
      this.setState({ answer: `${number1} + ${number2} = ${(number1 + number2)}` })
    } else if (operator[0] === "-") {
      this.setState({ answer: `${number1} - ${number2} = ${(number1 - number2)}` })
    } else if (operator[0] === "*") {
      this.setState({ answer: `${number1} × ${number2} = ${(number1 * number2)}` })
    } else if (operator[0] === "/") {
      this.setState({ answer: `${number1} ÷ ${number2} = ${(number1 / number2)}` })
    } else {
      this.setState({ answer: '' })
    }
    this.setState({ value: [] })
  }

  handleClickMath = (val) => {
    let ans;
    const { value, answer } = this.state;
    if (answer && !answer.includes('error')) {
      ans = answer.slice(answer.indexOf('=') + 1).trim();
    }
    const input = Number(ans) || value.join('');
    if (val === '%') {
      return this.handleClickPercent(input);
    }
    if (val === '²') {
      return this.handleClickSquare(input);
    }
    if (val === '√') {
      return this.handleClickRoot(input);
    }
  }

  handleClickPercent = (input) => {
    const percentAnswer = input / 100;
    this.setState({ answer: `${input}% = ${percentAnswer}`, value: [] });
  }

  handleClickSquare = (input) => {
    const squaredAnswer = input ** 2;
    this.setState({ answer: `${input}² = ${squaredAnswer}`, value: [] });
  }

  handleClickRoot = (input) => {
    const rootAnswer = input ** 0.5;
    this.setState({ answer: `√${input} = ${rootAnswer}`, value: [] });
  }

  handleClickBack = () => {
    this.setState({ answer: '' });
    const { value } = this.state;
    const inputString4 = value.join('')
    value.pop();
    const regex = /[^\d.]/;
    const operator = regex.exec(inputString4);
    if (operator === undefined) {
      this.setState({ value });
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
              <td className='operator' onClick={() => this.handleClickMath('%')}>%</td>
              <td className='operator' onClick={() => this.handleClickMath('²')}>x²</td>
              <td className='operator' onClick={() => this.handleClickMath('√')}>√x</td>
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
      </div>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <div className='page'>
        <Body />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

