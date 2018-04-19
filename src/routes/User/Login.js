import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';
import config from '../../config';

const { autoLogin, hasPhoneLogin } = config;
const { Tab, UserName, Password, Mobile, Captcha, ImgCaptcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.captchaImgUrl = 'http://fhmcar.chunlvbank.com/FHM_car300/code.do';
  }
  state = {
    type: 'account',
    autoLogin: false,
    captchaUrl:this.captchaImgUrl
  }

  componentDidMount() {
    this.setState({
      autoLogin
    });
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

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
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }
  captchaRefreshHandle=()=>{
    const t = new Date().getTime();
    this.setState({
      captchaUrl:`${this.captchaImgUrl}?t=${t}`
    });
  }
  render() {
    const { login, submitting } = this.props;
    const { type,captchaUrl } = this.state;
    return (
      <div className={styles.main}>
        {
          hasPhoneLogin ? (
            <Login
              defaultActiveKey={type}
              onTabChange={this.onTabChange}
              onSubmit={this.handleSubmit}
              hasPhoneLogin={hasPhoneLogin}
            >
              <Tab key="account" tab="账户登录">
                {
                  login.status === 'error' &&
                  login.type === 'account' &&
                  !login.submitting &&
                  this.renderMessage(login.errorMessage)
                }
                <UserName name="userName" placeholder="admin" />
                <Password name="password" placeholder="admin" />
                <ImgCaptcha name="imgcaptcha" placeholder="123" />
              </Tab>
              <Tab key="mobile" tab="手机号登录">
                {
                  login.status === 'error' &&
                  login.type === 'mobile' &&
                  !login.submitting &&
                  this.renderMessage(login.errorMessage)
                }
                <Mobile name="mobile" />
                <Captcha name="captcha" />
              </Tab>
              {/* <div style={{ marginBottom: 24 }}>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div> */}
              <Submit loading={submitting}>登录</Submit>
            </Login>
          ) : (
              <Login
                defaultActiveKey={type}
                onTabChange={this.onTabChange}
                onSubmit={this.handleSubmit}
                hasPhoneLogin={hasPhoneLogin}
              >
                {
                  login.status === 'error' &&
                  login.type === 'account' &&
                  !login.submitting &&
                  this.renderMessage(login.errorMessage)
                }
                <UserName name="username" placeholder="请输入账号" />
                <Password name="password" placeholder="请输入密码" />
                <ImgCaptcha name="code" placeholder="请输入验证码" captcha={`${config.domain}/sys/vcode`} />
                {/* <div style={{ marginBottom: 24 }}>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div> */}
                <Submit loading={submitting}>登录</Submit>
              </Login>
            )
        }

      </div>
    );
  }
}
