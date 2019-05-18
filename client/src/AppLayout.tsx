import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './components/navbar/Navbar';
import App from './components/App';
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";

class AppLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Navbar />
        <Layout.Content className="content">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={App} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  };
}

export default AppLayout;