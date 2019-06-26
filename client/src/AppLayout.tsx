import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './components/navbar/Navbar';
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import ConfirmAccount from "./components/account/ConfirmAccount";
import { Home } from "./pages/home/Home";

class AppLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Navbar />
        <Layout.Content className="content">
          <Switch>
            <Route exact path="/account/confirm/:userId" component={ConfirmAccount} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  };
}

export default AppLayout;