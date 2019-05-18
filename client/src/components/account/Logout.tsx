import * as React from "react";
import { withLogout, LogoutProps, MeDocument } from "../../lib/codegen";
import { Button } from "antd";

class Logout extends React.Component<LogoutProps> {
  logout() {
    this.props.mutate!({
      refetchQueries: [{ query: MeDocument }],
      awaitRefetchQueries: true
    })
  }

  render() {
    return <Button onClick={() => this.logout()}>Logout</Button>;
  };
}

export default withLogout()(Logout);