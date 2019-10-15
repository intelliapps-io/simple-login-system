import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import { Navbar } from './components/navbar/Navbar';
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import ConfirmAccount from "./components/account/ConfirmAccount";
import { Home } from "./pages/home/Home";
import { Account } from "./pages/account/Account";
import { useResponsive } from "./lib/helpers/hooks/useResponsive";
import { useMeQuery } from "./lib/codegen";
import { AppContext } from "./lib/helpers/AppContext";

export const AppLayout: React.FC = props => {
  const { responsiveSize, responsiveCalc } = useResponsive()
  const meQuery = useMeQuery()

  return (
    <AppContext.Provider value={{
      user: meQuery.data && meQuery.data.me ? meQuery.data.me : null,
      meQuery,
      responsiveSize,
      responsiveCalc
    }}>
      <Layout className="layout">
        <Navbar />
        <Layout.Content className="content">
          <Switch>
            <Route exact path="/account/confirm/:userId" component={ConfirmAccount} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/account" component={Account} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout.Content>
      </Layout>
    </AppContext.Provider>
  );
}

export default AppLayout;