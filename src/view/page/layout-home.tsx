/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:47
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-04-26 15:04:58
 */

import React, { useEffect, useState, useRef, FC } from "react";
import "./../../style/index.scss";
import { Button, Input } from "antd";
import { useSelector } from "react-redux";
import Axios from "axios";

interface UserName {
  title: string;
  first: string;
  last: string;
}

interface ResponseItem {
  gender: string;
  name: UserName;
  email: string;
}

type respostItem = ResponseItem;

function Home(props: any) {
  const [count, setCount] = useState(1);
  const [res, setRes] = useState(null);
  const [isReady, setReadyState] = useState(false);

  const getData = (page: number) => {
    Axios.get("https://www.randomuser.me/api?page=" + page).then((res) => {
      setRes(res.data);
      setReadyState(true);
    });
  };

  useEffect(() => {
    getData(count);
  }, [count]);

  return (
    <div style={{ padding: 20 }}>
      <p>---------- {count}</p>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        计数器+1
      </Button>
      <br />
      {isReady ? (
        <div>
          {res?.results?.map((item: respostItem) => {
            return (
              <div key={item.email}>
                <div>name:{item.name?.first}</div>
                <div>gender:{item.gender}</div>
              </div>
            );
          })}
        </div>
      ) : (
        "请求中.."
      )}
    </div>
  );
}

export default Home;
