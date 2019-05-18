import React from 'react';
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";

import { withMe, MeProps } from './codegen';
import Navbar from './components/navbar/Navbar';

class App extends React.Component<MeProps & RouteComponentProps> {

  render() {
    const loading = this.props.data && this.props.data.loading;
    const user = this.props.data && this.props.data.me ? this.props.data.me : null;
    if (loading) return null;
    if (!user && !loading) return <Redirect to="/login" />
    return (
      <div className="app">
        <Navbar />
      </div>
    );
  }
}

export default withMe()(withRouter(App));
