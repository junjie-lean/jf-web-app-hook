/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:47
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-10-17 17:10:47
 */

import React, {
  useEffect,
  useState,
  Fragment as F,
  ReactElement,
  PropsWithChildren,
} from "react";
import "./../../style/index.scss";
import {
  Layout,
  Button,
  Input,
  Space,
  Menu,
  Divider,
  Modal,
  message as MessageNotify,
  notification as NotifyModal,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

/**
 * @description 接口测试
 * @interface
 */
export interface HomeProps {}

/**
 * @description 测试入口组件
 * @param props
 * @returns ReactElement
 */
export function Home(props: PropsWithChildren<HomeProps>): ReactElement {
  //是否折叠菜单
  const [collapsed, setCollapsed] = useState<boolean>(false);

  //受控组件
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();

  /**
   * @description 点击切换菜单折叠状态
   */
  const toggleMenu = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  /**
   * @description 右侧通知事件
   */
  const notifyHandler = (type) => {
    NotifyModal[type]({
      message: type + "标题:",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  /**
   * @description 消息提示事件
   */
  const messageHandle = () => {
    MessageNotify.success("success");
    MessageNotify.error("error");
    MessageNotify.warning("warning");
  };

  /**
   * @description 模态框提示
   */
  const modalHandle = () => {
    Modal.confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  /**
   * @description componentDidMount
   */
  useEffect(() => {
    console.log("didMount");
    MessageNotify.info("component did mount");
  }, []);

  const menu1Item = [
    {
      label: "Menu 1",
      key: "1",
      icon: <UserOutlined />,
      onClick() {
        navigate("/state");
      },
    },
    {
      label: "Menu 2",
      key: "2",
      icon: <VideoCameraOutlined />,
      onClick() {
        navigate("/loading");
      },
    },
    {
      label: "Menu 3",
      key: "4",
      icon: <UploadOutlined />,
      onClick() {
        navigate("/transition");
      },
    },
  ];

  return (
    <F>
      <Layout className="jvfe-app-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menu1Item}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: "0 10px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignContent: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>jvfe react hook framework</span>
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
            }}
          >
            <span>折叠菜单切换 : </span>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={toggleMenu} />
            ) : (
              <MenuFoldOutlined onClick={toggleMenu} />
            )}
            <Divider />
            <Space size={10}>
              <span>Button: </span>
              <Button
                onClick={() => {
                  notifyHandler("success");
                }}
                type="default"
              >
                default
              </Button>
              <Button
                onClick={() => {
                  notifyHandler("error");
                }}
                danger
              >
                danger
              </Button>
              <Button
                onClick={() => {
                  notifyHandler("warning");
                }}
                type="primary"
              >
                primary
              </Button>
              <Button
                onClick={() => {
                  notifyHandler("info");
                }}
                type="ghost"
              >
                ghost
              </Button>
              <Button onClick={messageHandle} type="text">
                text
              </Button>
              <Button onClick={modalHandle} type="link">
                link
              </Button>
            </Space>
            <Divider />
            <div>
              <p className="input-component">
                <span>受控组件:</span>
                <Input
                  onChange={({ target: { value } }) => {
                    setInputValue(value);
                  }}
                  value={inputValue}
                />
                <span>反显:{inputValue}</span>
              </p>
              <p className="input-component">
                <span>非受控组件:</span>
                <Input />
              </p>
            </div>

            <div>
              <Button
                type="link"
                href="https://ant-design.gitee.io/components/overview-cn/"
                target="_blank"
              >
                更多组件示例
              </Button>
            </div>
          </Content>
        </Layout>
      </Layout>
    </F>
  );
}

export default Home;
