import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Card, Button, Input, Tabs, Popover, Modal, message } from 'antd';
import PageHeaderLayout from 'src/layouts/PageHeaderLayout';
import { renderFormItem } from '../../common/formItem';

import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark, coy, duotoneDark } from 'react-syntax-highlighter/styles/prism';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './Index.less';

import { FormItems } from './pageConfig';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  }
};
@Form.create()
export default class Index extends PureComponent {
  state = {
    modalVisible: false,
    currentItem: {}
  }
  constructor(props) {
    super(props);
  }
  renderCode = () => {
    const { currentItem } = this.state;
    const code = JSON.stringify(currentItem, null, '\t')
    return <SyntaxHighlighter language='json' style={atomDark}>{code}</SyntaxHighlighter>;
  }
  renderCode1 = (item) => {
    const code = JSON.stringify(item, null, '\t')
    return (
      <div>
        <SyntaxHighlighter language='json' style={atomDark}>{code}</SyntaxHighlighter>
      </div>
    );
  }
  showModalVisibel = (item) => {
    this.setState({
      modalVisible: true,
      currentItem: item
    });
  }
  hideModalVisibel = () => {
    this.setState({
      modalVisible: false
    });
  }
  renderCopy = (item) => {
    const code = JSON.stringify(item, null, '\t');
    return (
      <CopyToClipboard
        text={code}
        onCopy={() => message.success('复制成功', 2)}
      >
        <div style={{ cursor: 'pointer' }}>复制代码</div>
      </CopyToClipboard>

    );
  }
  renderFormItem = () => {
    const { dispatch, form } = this.props;
    return FormItems.map((item, i) => {
      const InputType = renderFormItem(item, form);
      return (
        <Col lg={item.colSpan || 8} md={12} sm={24} key={`${item.key}_${i}`} style={{ marginBottom: 24 }}>
          {/* <Popover>
            
          </Popover> */}
          <Card hoverable actions={[<Popover content={this.renderCode1(item)} title={this.renderCopy(item)}>查看属性</Popover>]} title={item.label}>
            {/* <Card hoverable actions={[<a href="javascript:void(0)" onClick={() => { this.showModalVisibel(item) }}>查看属性</a>]} title={item.label}> */}
            <FormItem
              // label={`${item.label}`}
              hasFeedback={item.hasFeedback}
            >
              {InputType}
            </FormItem>
          </Card>

        </Col>
      );
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('values ', values);
      }
    });
  }
  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <PageHeaderLayout>
        <Card bordered={false} loading={false}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={24}>
              {this.renderFormItem()}
            </Row>
            <Row>
              <Col key="button">
                <FormItem
                >
                  <Button type="primary" htmlType="submit">提交</Button>
                  <Button htmlType="reset" style={{ marginLeft: 24 }} onClick={this.handleReset}>重置</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Modal
          destroyOnClose={true}
          visible={modalVisible}
          footer={null}
          onCancel={() => this.hideModalVisibel()}

        >
          {this.renderCode()}
        </Modal>
      </PageHeaderLayout>
    );
  }



}