import { Button, Card, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MeDocument, useLoginMutation } from "../../lib/codegen";
import { AppContext } from "../../lib/helpers/AppContext";
import { allowFormSubmit } from "../../lib/helpers/helpers";
import "./account.less";

interface LoginProps {

}

export const Login: React.FC<LoginProps> = props => {
  // hooks
  const [form] = useForm()
  const [loginMutation] = useLoginMutation()
  const { router } = useContext(AppContext)

  // state
  const [errors, setErrors] = useState<String[]>([])

  // consts
  const fieldNames = ["email", "password"]

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = form.getFieldsValue(fieldNames) as { email: string, password: string };
    loginMutation({
      variables: { email, password },
      refetchQueries: [{ query: MeDocument }],
      awaitRefetchQueries: true
    }).then(() => { router.history.push("/account") }).catch(() => setErrors(["Email or password is incorrect"]));
  }

  return (
    <Card className="login">
      <h2>Login</h2>
      <Form form={form} onFinish={(event) => onSubmit(event)}>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Email is required!' }]}
        >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
              className="input"
            />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Password is required!' }]}
        >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              className="input"
            />
        </Form.Item>

        <div className="form-error">{errors.map((error, i) => <div className="error" key={i}>{error}</div>)}</div>
        <div className="form-footer">
          <Button className="form-submit" htmlType="submit" disabled={allowFormSubmit(fieldNames, form)}>Login</Button>
          <Link to="/signup" style={{ float: "right" }}>No account? Signup Here</Link>
        </div>
      </Form>
    </Card>
  );
}