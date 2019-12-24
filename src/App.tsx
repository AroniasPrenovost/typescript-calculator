import * as React from "react";
import "./App.css";
import Button from "./Button";
import Header from "./Header";
import logo from "./logo.svg";

interface IProps {
  operations?: Array<string>;
  results?: string;
}

interface IState {
  operations: Array<string>;
  results?: string;
}

let isBalancedParenthesis = (str: string) => {
  return !str.split('').reduce((uptoPrevChar, thisChar) => {
    if (thisChar === '(' || thisChar === '{' || thisChar === '[') {
      return ++uptoPrevChar;
    } else if (thisChar === ')' || thisChar === '}' || thisChar === ']') {
      return --uptoPrevChar;
    }
    return uptoPrevChar // bool 
  }, 0);
}

let isValidOperatorOrder = (arr: Array<string>) => {
  let operators: Array<string> = ['-', '+', '/', '*'];
  let decimal: string = '.';
  if (operators.includes(arr[0]) || operators.includes(arr[arr.length - 1])) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === decimal && arr[i + 1] === decimal) {
      return false;
    }
    // validate '-' for negative numbers 
    if (arr[i] === '-' && arr[i + 1] === '-' && operators.includes(arr[i + 2])) {
      return false;
    }
    if (arr[i] === '-' && operators.includes(arr[i + 1])) {
      return false;
    }
  }
  return true;
}

class App extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    operations: [],
    results: ""
  };

  public state: IState = {
    operations: []
  };

  public constructor(props: {}) {
    super(props);
    this.state = { operations: [] };
  }

  public evaluateInput = (args: Array<string>) => {

    // validate parenthesis 
    const parenthesis = (char: string) => char === ')' || char === '(';
    let filteredParenthesis: string = args.filter(parenthesis).join('');
    if (!isBalancedParenthesis(filteredParenthesis)) {
      return false;
    }

    // validate equation
    if (!isValidOperatorOrder(args)) {
      return false
    }

    // solve nested equations 
    let arr: Array<number> = [];
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '(') {
        let index: number = args.indexOf(args[i]);
        arr.push(index)
      }
      if (args[i] === ')') {
        let index: number = args.indexOf(args[i]);
        arr.push(index)
      }
      if (arr.length === 2) {
        let argsString: string = args.join('');
        let end: string = argsString.split(/\)(.+)/)[1];
        let solution: string = eval(argsString.slice(arr[0] + 1, arr[1]));
        solution = argsString.replace(argsString.substring(arr[0], arr[1 + 1]), "").concat('*' + solution);
        if (end !== undefined) { solution = solution.concat(end); }
        solution = eval(solution)
        return solution;
      }
    }
  }

  public handleClick = (e: any) => {
    const btnVal: string = e.target.getAttribute("data-value");
    let result: string;
    switch (btnVal) {
      case "Clear":
        this.setState({
          operations: [],
          results: ""
        });
        break;
      case "Backspace": // Backspace
        result = this.state.operations.slice(0, -1).join('');
        this.setState({
          results: result,
          operations: this.state.operations.slice(0, -1)
        });
        break;
      case "=":
        // working...   
        // let result: string = eval(this.state.operations.join(""));

        // new 
        let realResult: Array<string> = this.state.operations;
        console.log(this.evaluateInput(realResult) + ' ---');

        result = eval(this.state.operations.join(""));
        console.log(result);

        // 

        this.setState({
          results: result,
          operations: [result]
        });
        break;
      default:
        this.state.operations.push(btnVal);
        this.setState({
          operations: this.state.operations,
          results: this.state.operations.join("")
        });
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
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                btnValue={"Clear"}
                btnType={"clear"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"0"}
                btnType={"hidden"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"/"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                btnValue={"7"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"8"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"9"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"*"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                btnValue={"4"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"5"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"6"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"-"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                btnValue={"1"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"2"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"3"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"+"}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                btnValue={"0"}
                btnType={"number"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"."}
                btnType={"operator"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"="}
                btnType={"operator"}
              />
            </div>
            <div className="buttonRow">
              <Button
                onCLick={this.handleClick}
                btnValue={"Backspace"}
                btnType={"operator"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={"("}
                btnType={"operator"}
              />
              <Button
                onCLick={this.handleClick}
                btnValue={")"}
                btnType={"operator"}
              />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
