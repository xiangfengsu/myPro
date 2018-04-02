import React, { Component } from "react";
import PropTypes from 'prop-types';
class QRcode extends Component {
  static propTypes = {
    captcha:PropTypes.string.isRequired
  }
  static defaultProps = {
    captcha:''
  }
  constructor(props) {
    super(props);
    this.state = {
      codeUrl: props.captcha
    };
    this.refreshCode = this.refreshCode.bind(this);
  }
  refreshCode() {
    const { codeUrl } = this.state;
    this.setState({
      codeUrl: `${codeUrl}?num=${new Date().getTime()}`
    });
  }
  render() {
    const { codeUrl } = this.state;
    return (
      <img
        onClick={this.refreshCode}
        src={codeUrl}
        style={{ width: "100px", height: "40px", cursor: "pointer" ,'border': '1px solid #d9d9d9'}}
      />
    );
  }
}
export default QRcode;
