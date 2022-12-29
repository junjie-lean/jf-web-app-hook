/*
 * @Author: junjie.lean
 * @Date: 2021-11-17 09:43:56
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-10-19 09:23:28
 */

import React, {
  PropsWithChildren,
  useState,
  useEffect,
  MouseEventHandler,
  CSSProperties,
} from "react";

import { Input, List, Button, Row, Col, Space } from "antd";
export interface StateDemoProps extends PropsWithChildren {}
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function State(props: StateDemoProps): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [renderList, setRenderList] = useState<string[]>(["测试数据"]);

  const itemStyle: CSSProperties = {
    border: "1px solid gray",
    color: "#c4c4c4",
    marginBottom: "5px",
  };

  const pushToList: MouseEventHandler = (e): void => {
    const doPush = (value) => {
      let arr = [...renderList];
      for (let i = 0; i < 10; i++) {
        arr.push(`${value}_${i + 1}`);
      }
      setRenderList(arr);
    };

    if (value.trim() === "") {
      const val = Math.floor(Math.random() * 1e10).toLocaleString();
      doPush(val);
      return;
    } else {
      doPush(value);
      setValue("");
    }
  };

  const randomDelete: MouseEventHandler = (): void => {
    const arr = [...renderList];
    arr.splice(Math.floor(Math.random() * arr.length), 1);
    setRenderList(arr);
  };

  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
      <div>
        <Row>
          <Col span={5}>
            <Input
              onChange={({ target: { value } }) => setValue(value)}
              value={value}
            />
          </Col>
          <Col span={2} offset={1}>
            <Button
              onClick={pushToList}
              type="primary"
              style={{ width: "100%" }}
            >
              添 加 * 10
            </Button>
          </Col>
          <Col span={2} offset={1}>
            <Button
              onClick={randomDelete}
              type="primary"
              style={{ width: "100%" }}
            >
              随 机 删 除
            </Button>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col span={11}>
            <TransitionGroup>
              {/* <List
                size="large"
                bordered
                dataSource={renderList}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              /> */}

              {renderList.map((item, index) => {
                return (
                  <CSSTransition key={index} timeout={1000} classNames="alert">
                    <div style={itemStyle}>{item}</div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </Col>
        </Row>
      </div>
    </Space>
  );
}
