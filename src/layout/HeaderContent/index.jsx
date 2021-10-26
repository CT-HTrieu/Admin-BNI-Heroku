import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Avatar, Menu, Dropdown } from "antd";

import { UserOutlined, ProfileTwoTone,LogoutOutlined  } from "@ant-design/icons";
import { logout } from "@/redux/auth/actions";
import uniqueId from "@/utils/uinqueId";
const { Header } = Layout;

export default function HeaderContent() {
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item key={`${uniqueId()}`} onClick={() => dispatch(logout())} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<ProfileTwoTone />}>
        <Link to="/profile" />
        Profile
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, background: "none" }}
    >
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}
