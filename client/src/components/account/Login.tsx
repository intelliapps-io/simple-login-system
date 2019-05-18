import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import "./account.scss";
import { Button, Input, Form, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { withLogin, LoginProps, MeDocument } from "../../codegen";
import { allowFormSubmit } from "../../helpers/helpers";

interface IState {
  error: string | null
}

type IProps = FormComponentProps & LoginProps & RouteComponentProps;

class Login extends React.Component<IProps, IState> {
  fieldNames = ["email", "password"]

  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null
    }
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { email, password } = this.props.form.getFieldsValue(this.fieldNames) as { email: string, password: string };
    this.props.mutate!({
      variables: { email, password },
      refetchQueries: [{ query: MeDocument }],
      awaitRefetchQueries: true
    }).then(() => { this.props.history.push("/") }).catch(() => this.setState({ error: "email or password is incorrect." }));
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <div className="login">
        <h2>Login</h2>
        <Form onSubmit={(event) => this.onSubmit(event)}>
          <Form.Item>
            {getFieldDecorator('email', { rules: [{ required: true, message: 'Email is required!' }] })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="email"
                placeholder="Email"
                className="input"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', { rules: [{ required: true, message: 'Password is required!' }] })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                className="input"
              />
            )}
          </Form.Item>
          {this.state.error ? <div>{this.state.error}</div> : null }
          <div className="form-footer">
            <Button className="form-submit" htmlType="submit" disabled={allowFormSubmit(this.fieldNames, this.props.form)}>Login</Button>
            <Link to="/signup" style={{ float: "right" }}>No account? Signup Here</Link>
          </div>
        </Form>
      </div>
    );
  };
}

export default Form.create({ name: 'login' })(
  withLogin<FormComponentProps>()(withRouter(Login))
);