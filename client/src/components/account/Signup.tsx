import { Button, Card, Col, Form, Input, Row } from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"
import { useForm } from "antd/lib/form/Form"
import React, { useContext, useState } from "react"
import { useRegisterMutation } from "../../lib/codegen"
import { AppContext } from "../../lib/helpers/AppContext"
import { parseApolloErrors } from "../../lib/helpers/parseApolloErrors"
import { Link } from "react-router-dom"
import { allowFormSubmit } from "../../lib/helpers/helpers"
import "./account.less";

interface SignupProps {

}

export const Signup: React.FC<SignupProps> = props => {
  // hooks
  const [form] = useForm()
  const [registerMutation] = useRegisterMutation()
  const { router } = useContext(AppContext)

  // state
  const [errors, setErrors] = useState<String[]>([])

  // consts
  const fieldNames = ['firstName', 'lastName', 'email', 'password']

  const onSubmit = (event: React.FormEvent) => {
    const { firstName, lastName, email, password } = form.getFieldsValue(fieldNames)
    registerMutation({ variables: { data: { firstName, lastName, email, password } } })
      .then(() => router.history.push("/login"))
      .catch((error) => setErrors(parseApolloErrors(error)));
  }

  return (
    <Card className="signup">
      <h2>Create An Account</h2>
      <Form form={form} onFinish={(event) => onSubmit(event)}>
        <Row>
          <Col span={11}>
            <Form.Item
              name='firstName'
              rules={[{ required: true, message: 'First Name is required!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="first name"
                placeholder="First Name"
              />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item
              name='lastName'
              rules={[{ required: true, message: 'Last Name is required!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="first name"
                placeholder="Last Name"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <Input
            prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="email"
            placeholder="Email"
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
          />
        </Form.Item>
        <div className="form-error">{errors.map((error, i) => <div className="error" key={i}>{error}</div>)}</div>
        <div className="form-footer">
          <Button className="form-submit" htmlType="submit" disabled={false}>Signup</Button>
          <Link to="/login" style={{ float: "right" }}>Have an account? Login Here</Link>
        </div>
      </Form>
    </Card>
  );
}