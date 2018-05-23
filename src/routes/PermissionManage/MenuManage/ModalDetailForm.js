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
  message,
  Icon,
  Tooltip
} from "antd";

import TreeSelectModal from "../../../components/MenuTreeSelectModal/Index";

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
    updateFormItems: PropTypes.func,
    setTreeNodeParentId: PropTypes.func
  };
  state = {
    modalVisible: false,
    selectedKey: "",
    selectMenuTypeValue: 1
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
    this.setState({
      selectMenuTypeValue: value
    });
    this.props.form.resetFields();
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
  showErrorMsg = () => {
    const { selectMenuTypeValue } = this.state;
    switch (selectMenuTypeValue) {
      case 1:
      case 2:
        message.error("必须选择一个父级目录!");
        break;
      case 3:
        message.error("必须选择一个父级菜单!");
        break;
    }
  };
  modalOkHandle = () => {
    const selectedNode = this.treeSelectModal.getSelectedKey();
    if (selectedNode.length !== 0) {
      const { key, title } = selectedNode[0];
      this.props.form.setFieldsValue({
        parentmenuid: key,
        parentmenuname: title
      });
      this.context.setTreeNodeParentId(key);
      this.hideModalVisibel();
    } else {
      this.showErrorMsg();
    }
  };
  renderFormItem = () => {
    const { selectMenuTypeValue } = this.state;
    const {
      formItems,
      dispatch,
      form,
      showModalType,
      currentItem
    } = this.props;
    return formItems.map((item, i) => {
      if (item.formType === "selectDynamicTree") {
        Object.assign(item, {
          extraProp: { selectMenuTypeValue }
        });
      }
      if (item.key === "menutype") {
        item.onSelect = this.selectMenuType;
      }
      if (item.key === "parentid") {
        if (showModalType === "update" && currentItem.menutype === 4) {
          Object.assign(item, {
            disabled: true
          });
        }
        item.onClick = this.selectTreeModal;
      }
      const InputType = renderFormItem(item, form);
      return (
        <Col
          lg={item.colSpan === 0 ? 0 : item.colSpan || 8}
          md={item.colSpan === 0 ? 0 : 12}
          sm={item.colSpan === 0 ? 0 : 24}
          key={`${item.key}_${i}`}
        >
          <FormItem
            {...formItemLayout}
            label={
              item.tooltip ? (
                <span>
                  {item.label}&nbsp;
                  <Tooltip title={item.tooltip}>
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              ) : (
                item.label
              )
            }
            hasFeedback
          >
            {InputType}
          </FormItem>
        </Col>
      );
    });
  };
  render() {
    const {
      modalVisible,
      parentKey,
      currentKey,
      selectMenuTypeValue
    } = this.state;
    return (
      <Card bordered={false} loading={false}>
        <Form>
          <Row gutter={24}>{this.renderFormItem()}</Row>
        </Form>
        <Modal
          destroyOnClose={true}
          visible={modalVisible}
          maskStyle={{ backgroundColor: "transparent" }}
          onCancel={() => this.hideModalVisibel()}
          onOk={() => {
            this.modalOkHandle();
          }}
        />
      </Card>
    );
  }
}
