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
  static contextTypes = {
    updateFormItems: PropTypes.func
  };
  state = {
    modalVisible: false,
    selectedKey: ""
  };
  constructor(props) {
    super(props);
  }

  selectTreeModal = () => {
    this.props.queryStructorTreeHandle();
    this.showModalVisibel();
  };

  selectMenuType = value => {
    this.context.updateFormItems(value);
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

  renderMenuTree = () => {
    const InputType = getFieldDecorator("menuids", {
      initialValue: item.initialValue,
      rules: [
        {
          required: item.isRequired,
          message: `${item.label}不能为空`
        }
      ]
    })(
      <DynamicSelect
        dispatch={dispatch}
        dictionaryKey={item.dictionaryKey}
        placeholder={
          item.placeholder ? item.placeholder : `请选择${item.label}`
        }
        fetchUrl={item.fetchUrl}
        popupContainer={
          (item.popupContainer &&
            document.getElementById(item.popupContainer)) ||
          document.body
        }
      />
    );
    return (
      <Col lg={24} md={12} sm={24} key={-1}>
        <FormItem label="菜单权限" {...formItemLayout} hasFeedback>
          {InputType}
        </FormItem>
      </Col>
    );
  };
  renderFormItem = () => {
    const { formItems, dispatch, form } = this.props;
    const formItemList = formItems.map((item, i) => {
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
    return formItemList;
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
