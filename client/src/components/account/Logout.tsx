import * as React from "react";
import { MeDocument, useLogoutMutation } from "../../lib/codegen";
import { Button } from "antd";
import "./account.less";

interface LogoutProps {

}

export const Logout: React.FC<LogoutProps> = props => {
  const [logoutMutation] = useLogoutMutation()

  const logout = () => {
    logoutMutation({
      refetchQueries: [{ query: MeDocument }],
      awaitRefetchQueries: true
    })
  }

  return (
    <Button onClick={() => logout()}>Logout</Button>
  );
}