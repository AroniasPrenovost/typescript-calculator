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

  public handleClick = (e: any) => {
    const btnVal: string = e.target.getAttribute("data-value");

    switch (btnVal) {
      case "Clear":
        this.setState({
          operations: [],
          results: ""
        });
        break;
      case "=":
        let result: string = eval(this.state.operations.join(""));
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
          </div>
        </header>
      </div>
    );
  }
}

export default App;
