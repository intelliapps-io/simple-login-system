import React from 'react';
import { Redirect } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';

import { withMe, MeProps } from '../lib/codegen';
import Navbar from './navbar/Navbar';

const { Header, Content, Footer } = Layout;

class App extends React.Component<MeProps> {
  render() {
    const loading = this.props.data && this.props.data.loading;
    const user = this.props.data && this.props.data.me ? this.props.data.me : null;
    if (loading) return null;
    if (!user && !loading) return <Redirect to="/login" />
    return (
      <div>
        app!
      </div>
    );
  }
}

export default withMe()(App);
