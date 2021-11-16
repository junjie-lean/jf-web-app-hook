/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:47
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 16:13:55
 */

import React, {
  useEffect,
  useState,
  FC,
  Fragment as F,
  ReactElement,
  PropsWithChildren,
} from 'react';
import './../../style/index.scss';
import {
  Layout,
  Button,
  Input,
  Space,
  Menu,
  Divider,
  Breadcrumb,
  Dropdown,
  Modal,
  message as MessageNotify,
  notification as NotifyModal,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;

/**
 * @interface
 */
interface HomeProps {}

/**
 * Renders a card around some content.
 *
 * ```tsx
 * <CardB variant="secondary">
 *     <h5>My Title</h5>
 *     <p>My content</p>
 * </CardB>
 * ```
 *
 * The props type is written directly in the function definition:
 *
 * ```
 * export function CardB({
 *     children,
 *     variant = "primary",
 * }: PropsWithChildren<{
 *     variant: "primary" | "secondary" | "success" | "danger" | "light" | "dark";
 * }>): ReactElement {
 *     // ...
 * }
 * ```
 *
 * This can make the TypeDoc documentation a bit cleaner for very simple components,
 * but it makes your code less readable.
 */
export function CardB({
  children,
  variant = 'primary',
}: PropsWithChildren<{
  /** The theme of the card. Defaults to `primary`. */
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'light' | 'dark';
}>): ReactElement {
  return <div className={`card card-${variant}`}>{children}</div>;
}

/**
 * @description 测试入口组件
 * @param props
 * @returns ReactElement
 */
function Home(props: HomeProps) {
  //是否折叠菜单
  const [collapsed, setCollapsed] = useState<boolean>(false);

  //受控组件
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * @description 点击切换菜单折叠状态
   */
  const toggleMenu = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  /**
   * @description 右侧通知事件
   */
  const notifiHandle = (type) => {
    NotifyModal[type]({
      message: type + '标题:',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  /**
   * @description 消息提示事件
   */
  const messageHandle = () => {
    MessageNotify.success('success');
    MessageNotify.error('error');
    MessageNotify.warning('warning');
  };

  /**
   * @description 模态框提示
   */
  const modalHandle = () => {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  /**
   * @description componentDidMount
   */
  useEffect(() => {
    console.log('didMount');
    MessageNotify.info('component did mount');
  }, []);

  return (
    <F>
      <Layout className="jvfe-app-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Menu 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Menu 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Menu 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: '0 10px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignContent: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>jvfe react hook framework</span>

            <Dropdown
              overlay={
                <Menu>
                  <Menu.ItemGroup title="Group title">
                    <Menu.Item>1st menu item</Menu.Item>
                    <Menu.Item>2nd menu item</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.SubMenu title="sub menu">
                    <Menu.Item>3rd menu item</Menu.Item>
                    <Menu.Item>4th menu item</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu title="disabled sub menu" disabled>
                    <Menu.Item>5d menu item</Menu.Item>
                    <Menu.Item>6th menu item</Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <span>下拉菜单</span> <DownOutlined />
              </a>
            </Dropdown>
          </Header>
          <div
            style={{
              margin: '24px 0 0 16px ',
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item href="./">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="./">
                <span>面包屑</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>导航</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              height: '100%',
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
                  notifiHandle('success');
                }}
                type="default"
              >
                default
              </Button>
              <Button
                onClick={() => {
                  notifiHandle('error');
                }}
                danger
              >
                danger
              </Button>
              <Button
                onClick={() => {
                  notifiHandle('warning');
                }}
                type="primary"
              >
                primary
              </Button>
              <Button
                onClick={() => {
                  notifiHandle('info');
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
