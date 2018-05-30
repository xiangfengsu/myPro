import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Input,
  Tabs,
  Modal,
  message
} from "antd";

import { renderFormItem } from "../../../common/formItem";
import styles from "./Index.less";

import { FormItems } from "./pageConfig";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};
@Form.create()
export default class DetailFormInfo extends PureComponent {
  state = {
    modalVisible: false,
    selectedKey: ""
  };
  constructor(props) {
    super(props);
  }

  selectTreeModal = () => {
    this.showModalVisibel();
  };
  showModalVisibel = () => {
    this.setState({
      modalVisible: true
    });
  };
  hideModalVisibel = () => {
    this.setState({
      modalVisible: false
    });
  };
  modalOkHandle = () => {
    this.hideModalVisibel();
  };
  renderFormItem = () => {
    const { formItems, dispatch, form } = this.props;
    return formItems.map((item, i) => {
      // if (item.key === 'parentdepartmentname') {
      //   item.onClick = this.selectTreeModal;
      // }
      const InputType = renderFormItem(item, form);
      return (
        <Col
          lg={item.colSpan === 0 ? 0 : item.colSpan || 8}
          md={item.colSpan === 0 ? 0 : 12}
          sm={item.colSpan === 0 ? 0 : 24}
          key={`${item.key}_${i}`}
        >
          <FormItem label={`${item.label}`} {...formItemLayout} hasFeedback>
            {InputType}
          </FormItem>
        </Col>
      );
    });
  };
  render() {
    const { modalVisible, parentKey, currentKey } = this.state;
    return (
      <Card bordered={false} loading={false}>
        <Form>
          <Row gutter={24}>{this.renderFormItem()}</Row>
        </Form>
      </Card>
    );
  }
}
