import * as React from "react";

interface IProps {
  topic?: string;
}

const Subtitle: React.FunctionComponent<IProps> = (props: IProps) => (
  <p>This is a subtitle, for this project concerning {props.topic}</p>
);

Subtitle.defaultProps = {
  topic: "civics"
};

export default Subtitle;
