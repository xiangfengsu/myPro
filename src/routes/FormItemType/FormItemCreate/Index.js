import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Card, Button, Input, Tabs, Modal } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { renderFormItem } from '../../../common/formItem';
import DetailFormInfo from './ModalDetailForm/Index';
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
  renderFormItem = () => {
    const { dispatch, form } = this.props;
    return FormItems.map((item, i) => {
      const InputType = renderFormItem(item, form);
      return (
        <Col lg={item.colSpan || 8} md={12} sm={24} key={`${item.key}_${i}`} >
          <FormItem
            label={`${item.label}`}
            hasFeedback={item.hasFeedback}
          >
            {InputType}
          </FormItem>
        </Col>
      );
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values ', values);
      }
    });
  }
  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }
  showModalVisibel = (type, record) => {
    // const { detailFormItems } = this.state;
    // const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    // console.log(newDetailFormItems);
    this.setState({
      // showModalType: type,
      modalVisible: true,
      // currentItem: record,
      // detailFormItems: newDetailFormItems
    });
  }
  hideModalVisibel = () => {
    this.setState({
      modalVisible: false,
      currentItem: {}
    });
  }
  modalOkHandle = () => {

  }
  render() {
    const { modalVisible } = this.state;
    return (
      <PageHeaderLayout>
        <Card bordered={false} loading={false}>
          <div style={{ marginBottom: 24 }}>
            <Button icon="plus" type="primary" onClick={() => this.showModalVisibel('create', {})}>
              新建表单
            </Button>
          </div>
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
          onCancel={() => this.hideModalVisibel()}
          onOk={() => { this.modalOkHandle() }}

        >
          <DetailFormInfo
            ref={ref => { this.modalForm = ref }}
          // formItems={detailFormItems}
          />
        </Modal>
      </PageHeaderLayout>
    );
  }



}