import React from "react";

interface iProps {}

interface iState {
  msg: string;
  sseRef: any;
}

export default class SSE extends React.Component<iProps, iState> {
  readonly state: iState = {
    msg: "",
    sseRef: null,
  };

  constructor(props: iProps) {
    super(props);
  }

  private beginSSE = () => {
    const sseRef = new EventSource("http://localhost:3084/users/sse/1");

    sseRef.addEventListener("open", () => {
      let _msg = `${this.state.msg} \n 开始连接`;
      this.setState({
        msg: _msg,
      });
    });
 

    sseRef.addEventListener("message", (e) => {
      console.log(e.data);
      let _msg = `${this.state.msg} \n ${e.data} \n`;
      this.setState({
        msg: _msg,
      });
    });

    sseRef.addEventListener("error", (e) => {
      console.log("error:", e);
    });

    sseRef.addEventListener("close", (e) => {
      sseRef.close();
      let _msg = `${this.state.msg} \n 关闭连接`;
      this.setState({
        msg: _msg,
      });
    });
  };

  public componentDidMount(): void {}

  public render(): JSX.Element {
    const {
      state: { msg },
      beginSSE,
    } = this;

    return (
      <div>
        <button onClick={beginSSE}>begin</button>
        <div>{msg}</div>
      </div>
    );
  }
}
