import * as React from "react";
import "./App.css";
import Button from "./Button";
import Header from "./Header";
import logo from "./logo.svg";

interface IProps {
  operations?: Array<string>;
  results?: string;
  previousResult?: string;
}

interface IState {
  operations: Array<string>;
  results?: string;
  previousResult?: string;
}

// let isBalancedParenthesis = (str: string) => {
//   return !str.split('').reduce((uptoPrevChar, thisChar) => {
//     if (thisChar === '(' || thisChar === '{' || thisChar === '[') {
//       return ++uptoPrevChar;
//     } else if (thisChar === ')' || thisChar === '}' || thisChar === ']') {
//       return --uptoPrevChar;
//     }
//     return uptoPrevChar // bool 
//   }, 0);
// }

// let isValidOperatorOrder = (arr: Array<string>) => {
//   let operators: Array<string> = ['-', '+', '/', '*'];
//   let decimal: string = '.';
//   if (operators.includes(arr[0]) || operators.includes(arr[arr.length - 1])) {
//     return false;
//   }
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === decimal && arr[i + 1] === decimal) {
//       return false;
//     }
//     // validate '-' for negative numbers 
//     if (arr[i] === '-' && arr[i + 1] === '-' && operators.includes(arr[i + 2])) {
//       return false;
//     }
//     if (arr[i] === '-' && operators.includes(arr[i + 1])) {
//       return false;
//     }
//   }
//   return true;
// }

class App extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    operations: [],
    results: "",
    previousResult: ""
  };

  public state: IState = {
    operations: []
  };

  public constructor(props: {}) {
    super(props);
    this.state = { operations: [] };
  }

  // public evaluateInput = (args: Array<string>) => {

  //   // validate parenthesis 
  //   const parenthesis = (char: string) => char === ')' || char === '(';
  //   let filteredParenthesis: string = args.filter(parenthesis).join('');
  //   if (!isBalancedParenthesis(filteredParenthesis)) {
  //     return false;
  //   }

  //   // validate equation
  //   if (!isValidOperatorOrder(args)) {
  //     return false
  //   }

  //   // solve nested equations 
  //   let arr: Array<number> = [];
  //   for (let i = 0; i < args.length; i++) {
  //     if (args[i] === '(') {
  //       let index: number = args.indexOf(args[i]);
  //       arr.push(index)
  //     }
  //     if (args[i] === ')') {
  //       let index: number = args.indexOf(args[i]);
  //       arr.push(index)
  //     }
  //     if (arr.length === 2) {
  //       let argsString: string = args.join('');
  //       let end: string = argsString.split(/\)(.+)/)[1];
  //       let solution: string = eval(argsString.slice(arr[0] + 1, arr[1]));
  //       solution = argsString.replace(argsString.substring(arr[0], arr[1 + 1]), "").concat('*' + solution);
  //       if (end !== undefined) { solution = solution.concat(end); }
  //       solution = eval(solution)
  //       return solution;
  //     }
  //   }
  // }

  public handleClick = (e: any) => {
    const value: string = e.target.getAttribute("data-value");
    let result: string;
    let previousResult: string;
    switch (value) {
      case "Clear":
        this.setState({
          operations: [],
          results: ""
        });
        break;
      case "Backspace": // Backspace
        result = this.state.operations.slice(0, -1).join("");
        this.setState({
          results: result,
          operations: this.state.operations.slice(0, -1)
        });
        break;
      case "=":
        // let testResult: Array<string> = this.state.operations;
        // console.log(this.evaluateInput(testResult));
        result = eval(this.state.operations.join(""));
        previousResult = this.state.operations.join("").concat(' = ' + result);
        this.setState({
          results: result,
          operations: [result],
          previousResult: previousResult
        });
        break;
      default:
        this.state.operations.push(value);
        this.setState({
          operations: this.state.operations,
          results: this.state.operations.join("")
        });
        break;
    }
  };

  public handleOnKeyPress = (es: any) => {
    const value: string = es.key;
    let result: string;
    let previousResult: string;
    const allowed = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "+",
      "-",
      "*",
      "/",
      "=",
      ".",
      "Enter",
      "equal",
      "Escape",
      "C",
      "Backspace"
    ];

    if (allowed.includes(value)) {
      switch (value) {
        case "Escape":
          this.setState({
            operations: [],
            results: ""
          });
          break;
        case "Backspace":
          result = this.state.operations.slice(0, -1).join("");
          this.setState({
            results: result,
            operations: this.state.operations.slice(0, -1)
          });
          break;
        case "=":
        case "Enter":
          // let testResult: Array<string> = this.state.operations;
          // console.log(this.evaluateInput(testResult));
          result = eval(this.state.operations.join(""));
          previousResult = this.state.operations.join("").concat(' = ' + result);
          this.setState({
            results: result,
            operations: [result],
            previousResult: previousResult
          });
          break;
        default:
          this.state.operations.push(value);
          console.log(this.state.operations)
          this.setState({
            operations: this.state.operations,
            results: this.state.operations.join("")
          });
          break;
      }
    }
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Header name="React TypeScript Calculator" />
          <div className="Container">
            <div className="buttonRow">
              <input
                className={"Calc-results"}
                readOnly
                value={this.state.results || ""}
              />
              <input
                className={"Calc-results"}
                readOnly
                value={this.state.previousResult || ""}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"Clear"}
                btnType={"clear"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"Backspace"}
                btnType={"operator"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"/"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"7"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"8"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"9"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"*"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"4"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"5"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"6"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"-"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"1"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"2"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"3"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"+"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"0"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"."}
                btnType={"operator"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"="}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              {/* <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={"("}
                btnType={"operator"}
              />
              <Button
                onCLick={this.handleClick}
                onKeyPress={this.handleOnKeyPress}
                btnValue={")"}
                btnType={"operator"}
              /> */}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
