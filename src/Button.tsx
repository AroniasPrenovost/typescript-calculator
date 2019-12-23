import * as React from "react";
import "./App.css";

export interface IProps {
  btnValue?: string;
  btnType?: string;
  onCLick: (e: any) => void;
}

interface IState {
  value: string;
  btnType: string;
}

class Button extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    btnValue: "0"
  };

  public state: IState = {
    value: "0",
    btnType: "hidden"
  };

  componentWillMount() {
    const value: string = this.props.btnValue!;
    this.setState({ value });
    const btnType: string = this.props.btnType!;
    this.setState({ btnType });
  }

  public render() {
    let btnClass = `button button-${this.state.btnType}`;
    return (
      <div
        className={btnClass}
        data-value={this.state.value}
        onClick={this.props.onCLick}
      >
        {this.state.value}
      </div>
    );
  }
}

export default Button;
