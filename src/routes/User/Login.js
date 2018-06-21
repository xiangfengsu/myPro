import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import config from 'src/config.js';
import Login from 'components/Login';
import styles from './Login.less';


const { UserName, Password, ImgCaptcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
  };

  onTabChange = (type) => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  renderMessage = (content) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={content}
        type="error"
        showIcon
      />
    );
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          {login.status === 'error' &&
            login.type === 'account' &&
            !login.submitting &&
            this.renderMessage(login.errorMessage)}
          <UserName name="username" placeholder="admin" />
          <Password name="password" placeholder="admin" />
          <ImgCaptcha
            name="code"
            placeholder="123"
            captcha={config.vcodeUrl}
          />
          {/* <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div> */}
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
