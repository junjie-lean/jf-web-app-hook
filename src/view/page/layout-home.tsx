/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:47
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 10:52:34
 */

import React, { useEffect, useState, FC, Fragment as F } from 'react';
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
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  DownOutlined,
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
