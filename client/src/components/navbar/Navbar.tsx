import * as React from "react";
import "./Navbar.scss";
import { MeProps, LogoutDocument, MeDocument, LogoutProps } from "../../lib/codegen";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { compose, graphql, } from "react-apollo";

import { Layout, Menu, Icon } from 'antd';

interface IProps extends RouteComponentProps {
  logout: LogoutProps["mutate"],
  me: MeProps["data"]
}

class Navbar extends React.Component<IProps> {
  getRouteLocation() {
    return this.props.location.pathname
  }

  PublicMenu() {
    return [
      <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>,
      <Menu.Item key="/signup"><Link to="/signup">Signup</Link></Menu.Item>,
    ]
  }

  UserMenu() {
    return [
      <Menu.Item key="1">nav 1</Menu.Item>,
      <Menu.Item key="2">nav 2</Menu.Item>,
      <Menu.Item key="3">nav 3</Menu.Item>,
      <Menu.Item key="4" className="account" onClick={() => this.props.logout!()}>
        <Icon type="logout" /> Logout
      </Menu.Item>
    ]
  }

  render() {
    const user = this.props.me && this.props.me.me ? this.props.me.me : null;
    return (
      <div>
        <Layout.Header className="navbar">
          <Link to="/"><div className="logo"><span>My App</span></div></Link>
          <Menu className="menu" theme="dark" mode="horizontal" selectedKeys={[this.getRouteLocation()]}>
            {user && user.id ? this.UserMenu() : this.PublicMenu()}
          </Menu>
        </Layout.Header>
      </div>
    );
  };
}

export default compose(
  graphql(LogoutDocument, { name: 'logout', options: { awaitRefetchQueries: true, refetchQueries: [{ query: MeDocument }] } }),
  graphql(MeDocument, { name: 'me' })
)(withRouter(Navbar));