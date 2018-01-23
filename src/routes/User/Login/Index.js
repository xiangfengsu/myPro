import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Index.less';

const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
export default class Login extends Component {
  state = {

  }
  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, dispatch, location } = this.props;
    validateFields({ force: true },
      (err, values) => {
        if (!err) {
          const { from } = location.state || { from: { pathname: '/' } }
          dispatch({
            type: 'login/login',
            payload: {
              ...values,
              // from
            },
          });
        }
      }
    );
  }
  render() {
    const { form, login, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        {
          login.status === 'error' &&
          this.renderMessage(login.errorMessage)
        }
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{
                    required: true,
                    message: '请输入账户名！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="admin"
                  />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '请输入密码！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="admin"
                  />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={14}>
              <FormItem>
                {getFieldDecorator('imgcaptcha', {
                  rules: [{
                    required: true, message: '请输入验证码！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="safety" className={styles.prefixIcon} />}
                    placeholder="123"
                  />
                  )}
              </FormItem>
            </Col>
            <Col span={8} offset={2}>
              <img src="http://fhmcar.chunlvbank.com/FHM_car300/code.do?t=1514361580358" style={{ float: 'right', height: 40 }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem className={styles.additional}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
                  )}
                <a className={styles.forgot} href="javascript:void(0)">忘记密码</a>
                <Button size="large" loading={submitting} className={styles.submit} type="primary" htmlType="submit">
                  登录
                </Button>
              </FormItem>
            </Col>
          </Row>

        </Form>

      </div>
    );
  }
}
