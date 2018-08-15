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

  onTabChange = type => {
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

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    const { env } = config;
    const uPlaceholder = env === 'development' ? 'admin' : '请输入用户名';
    const pPlaceholder = env === 'development' ? 'admin' : '请输入密码';
    const cPlaceholder = env === 'development' ? '123' : '请输入验证码';
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          {login.status === 'error' &&
            login.type === 'account' &&
            !login.submitting &&
            this.renderMessage(login.errorMessage)}
          <UserName name="username" placeholder={uPlaceholder} />
          <Password name="password" placeholder={pPlaceholder} />
          <ImgCaptcha name="code" placeholder={cPlaceholder} captcha={config.vcodeUrl} />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
