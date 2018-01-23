import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Card, Button, Input, Tabs } from 'antd';

import { renderFormItem } from '../../../../common/formItem';
import styles from './Index.less';
import { FormItems } from './pageConfig';

const { commonInput } = FormItems;

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
export default class DetailFormInfo extends PureComponent {
  constructor(props) {
    super(props);
  }
  renderFormItem = () => {
    const { dispatch, form } = this.props;
    return commonInput.map((item, i) => {
      const InputType = renderFormItem(item, form);
      return (
        <Col key={`${item.key}_${i}`} >
          <FormItem
            {...formItemLayout}
            label={`${item.label}`}
            hasFeedback
          >
            {InputType}
          </FormItem>
        </Col>
      );
    });
  }
  render() {
    return (
      <Card bordered={false} loading={false}>
        <Form >
          <Row gutter={24}>
            {this.renderFormItem()}
          </Row>
        </Form>
      </Card>

    );
  }



}