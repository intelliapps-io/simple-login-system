import * as React from "react";
import { withMe, MeProps } from "../../codegen";
import Logout from "../account/Logout";

class Navbar extends React.Component<MeProps> {
  render() {
    const loading = this.props.data ? this.props.data.loading : true;
    const user = this.props.data && this.props.data.me ? this.props.data.me : null;
    return(
      <div>
        <h2>Navbar</h2>
        <h2>Welcome, {user ? user.name : null}!</h2>
        <Logout />
      </div>
    );
  };
}

export default withMe()(Navbar);