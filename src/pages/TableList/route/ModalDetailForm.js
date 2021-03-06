import React, { PureComponent } from 'react';
import { Form, Row, Col, Card } from 'antd';

import { renderFormItem } from 'core/common/formItem';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
@Form.create()
export default class DetailFormInfo extends PureComponent {
  renderFormItem = () => {
    const { formItems, form } = this.props;
    return formItems.map(item => {
      const InputType = renderFormItem(item, form);
      const { colSpan = 8 } = item;
      return (
        <Col lg={colSpan} md={12} sm={24} key={item.key}>
          <FormItem label={`${item.label} `} {...formItemLayout} hasFeedback>
            {InputType}
          </FormItem>
        </Col>
      );
    });
  };

  render() {
    return (
      <Card bordered={false} loading={false}>
        <Form>
          <Row gutter={24}>{this.renderFormItem()}</Row>
        </Form>
      </Card>
    );
  }
}
