import React, { useState, useEffect } from "react";


interface IProps {
  [key:string]:any
}

interface IState {
  count: number;
}

export class CA extends React.Component<IProps, IState> {
  readonly state: IState = {
    count: 1,
  };
  constructor(props) {
    super(props);
  }

  add = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  reset = () => {
    this.setState({
      count: 1,
    });
  };

  render() {
    return (
      <div>
        <h1>class component </h1>
        <button onClick={this.add}>add</button>
        <button onClick={this.reset}>reset</button>
        <h3>{this.state.count}</h3>
      </div>
    );
  }
}

export function CB(props:IProps) {
  const [count, setCount] = useState<number>(1);

  return (
    <div>
      <h1>function component </h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          setCount(1);
        }}
      >
        reset
      </button>
      <h3>{count}</h3>
    </div>
  );
}

export default CA;
