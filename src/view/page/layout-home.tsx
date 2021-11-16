/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:47
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 10:19:55
 */

import React, { useEffect, useState, FC, Fragment as F } from 'react';
import './../../style/index.scss';
import { Layout, Button, Input, Space, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;

interface HomeProps {}

function Home(props: HomeProps) {
  //是否折叠菜单
  const [collapsed, setCollapsed] = useState<boolean>(false);

  //切换菜单折叠
  const toggleMenu = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  return (
    <F>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={toggleMenu} />
            ) : (
              <MenuFoldOutlined onClick={toggleMenu} />
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Space size={10}>
              <Button type="default">default</Button>
              <Button danger>danger</Button>
              <Button type="primary">primary</Button>
              <Button type="ghost">ghost</Button>
              <Button type="text">text</Button>
              <Button type="link">link</Button>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </F>
  );
}

export default Home;
