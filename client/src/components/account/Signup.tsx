import * as React from "react";
import "./account.scss";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Button, Input, Form, Icon, Row, Col, Card } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { withRegister, RegisterProps, MeDocument } from "../../lib/codegen";
import { allowFormSubmit } from "../../lib/helpers/helpers";
import { parseApolloErrors } from "../../lib/helpers/parseApolloErrors";

interface IState {
  errors: string[]
}

type IProps = FormComponentProps & RegisterProps & RouteComponentProps;

class Signup extends React.Component<IProps, IState> {
  fieldNames = ['firstName', 'lastName', 'email', 'password']

  constructor(props: IProps) {
    super(props);
    this.state = {
      errors: []
    }
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.props.form.getFieldsValue(this.fieldNames);
    this.props.mutate!({ variables: { data: { firstName, lastName, email, password } } })
      .then(() => this.props.history.push("/login"))
      .catch((error) => this.setState({ errors: parseApolloErrors(error) }));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card className="signup">
        <h2>Create An Account</h2>
        <Form onSubmit={(event) => this.onSubmit(event)}>
          <Row>
            <Col span={11}>
              <Form.Item>
                {getFieldDecorator('firstName', { rules: [{ required: true, message: 'First Name is required!' }] })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="first name"
                    placeholder="First Name"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item>
                {getFieldDecorator('lastName', { rules: [{ required: true, message: 'Last Name is required!' }] })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="first name"
                    placeholder="Last Name"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            {getFieldDecorator('email', { rules: [{ required: true, message: 'Email is required!' }] })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="email"
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', { rules: [{ required: true, message: 'Password is required!' }] })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <div className="form-error">{this.state.errors.map((error, i) => <div className="error" key={i}>{error}</div>)}</div>
          <div className="form-footer">
            <Button className="form-submit" htmlType="submit" disabled={allowFormSubmit(this.fieldNames, this.props.form)}>Signup</Button>
            <Link to="/login" style={{ float: "right" }}>Have an account? Login Here</Link>
          </div>
        </Form>
      </Card>
    );
  };
}

export default Form.create({ name: 'signup' })(
  withRegister<FormComponentProps>()(withRouter(Signup))
);