import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import "./account.less";

type IProps = RouteComponentProps<{ userId?: string }>

class ConfirmAccount extends React.Component<IProps> {
  render() {
    console.log(this.props.match.params.userId);
    return(
      <div>
        <h2>Confirm Account</h2>
      </div>
    );
  };
}

export default withRouter(ConfirmAccount);