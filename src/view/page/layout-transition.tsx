import React from "react";
import { Space, Button } from "antd";
import { Link, Outlet, useOutlet } from "react-router-dom";

export default function Trans(props): JSX.Element {
  const currentOutLet = useOutlet();
  return (
    <div style={{ padding: 30 }}>
      <h3>transition</h3>
      <div>
        <Space size={20}>
          <Link to="/home">to home</Link>
          <Link to="/transition">to transition</Link>
          <Link to="/transition/a">to a</Link>
          <Link to="/transition/b">to b</Link>
          <Link to="/transition/c">to c</Link>
        </Space>
      </div>
      {currentOutLet}
    </div>
  );
}
