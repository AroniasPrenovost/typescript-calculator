import * as React from "react";

interface IProps {
  name?: string;
}

const Header: React.FunctionComponent<IProps> = (props: IProps) => (
  <h1>{props.name}</h1>
);

Header.defaultProps = {
  name: "Default Project Name"
};

export default Header;
