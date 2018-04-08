import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Row, Col, Card, Modal, Button, Input, Popconfirm } from 'antd';
import styles from './Index.less';

import PageHeaderLayout from 'src/layouts/PageHeaderLayout';
import SearchForms from 'components/GeneralSearchForm/Index';
import TableList from 'components/GeneralTableList/Index';
import DetailFormInfo from './ModalDetailForm';

import Authorized from 'utils/Authorized';
import { PageConfig } from './pageConfig.js';
import { formaterObjectValue, formItemAddInitValue } from 'utils/utils';

const FormItem = Form.Item;

@connect(({ user, channel, loading }) => ({
  currentUser: user.currentUser,
  channel,
  loading: loading.models.channel
}))
@Form.create()
export default class Index extends PureComponent {
  state = {
    modalVisible: false,
    showModalType: '',
    formValues: {},
    currentItem: {},
    detailFormItems: PageConfig.detailFormItems
  }
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'channel/fetch',
    });
  }
  renderSearchForm = () => {
    const { form, dispatch } = this.props;
    const { searchForms } = PageConfig;
    const props = {
      form,
      formInfo: {
        layout: 'inline',
        formItems: searchForms
      },
      handleSearchSubmit: (formValues) => {
        const { createtime, channeltype } = formValues;
        const params = Object.assign(formValues, {
          createtime: createtime ? createtime.format('YYYY-MM-DD') : '',
          channeltype: channeltype && channeltype.constructor.name === 'Object' ? channeltype.selectValue : ''
        });
        const payload = formaterObjectValue(params);
        this.setState({
          formValues: payload
        });
        dispatch({
          type: 'channel/fetch',
          payload
        });
      },
      handleFormReset: () => {
        this.setState({
          formValues: {}
        });
        dispatch({
          type: 'channel/fetch',
          payload: {}
        });
      }
    }
    return (
      <SearchForms {...props} />
    );
  }
  showModalVisibel = (type, record) => {
    const { detailFormItems } = this.state;
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    console.log(newDetailFormItems);
    this.setState({
      showModalType: type,
      modalVisible: true,
      currentItem: record,
      detailFormItems: newDetailFormItems
    });
  }
  hideModalVisibel = () => {
    this.setState({
      modalVisible: false,
      currentItem: {}
    });
  }
  deleteTableRowHandle = (id) => {
    this.props.dispatch({
      type: 'channel/remove',
      payload: { id }
    });
  }
  extraTableColumnRender = () => {
    const columns = [
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a onClick={() => { this.showModalVisibel('update', record) }}>编辑</a>
            &nbsp;
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => { this.deleteTableRowHandle(record.id) }}
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        ),
      }
    ];
    return columns;
  }
  renderTable = () => {
    const { channel, loading } = this.props;
    const { tableColumns } = PageConfig;
    const { data: { list, pagination } } = channel;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const tableProps = {
      loading,
      dataSource: list,
      columns: newTableColumns,
      pagination: Object.assign(pagination, { pageSize: 10 }),
      handleTableChange: (current) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        const payload = {
          page: current,
          pageSize: 10,
          ...formValues,
        };
        dispatch({
          type: 'channel/fetch',
          payload
        });

      },
      bordered: false
    };
    return (<TableList {...tableProps} />);
  }
  modalOkHandle = () => {
    this.modalForm.validateFields((err, fieldsValue) => {
      if (err) return;
      logs('fieldsValue', fieldsValue);
      const { showModalType, currentItem } = this.state;
      if (showModalType === 'create') {
        this.props.dispatch({
          type: 'channel/add',
          payload: fieldsValue
        });
      } else if (showModalType === 'update') {
        this.props.dispatch({
          type: 'channel/update',
          payload: Object.assign(currentItem, fieldsValue)
        });
      }

      this.hideModalVisibel();
    });
  }
  render() {
    const { modalVisible, detailFormItems } = this.state;
    const modalWidth = document.documentElement.clientWidth - 300;
    const { form: { getFieldDecorator }, currentUser: { btnAuth = [] } } = this.props;

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSearchForm()}
              <div className={styles.tableListOperator}>
                <Authorized authority={() => ~btnAuth.indexOf('新建渠道')} >
                  <Button icon="plus" type="primary" onClick={() => this.showModalVisibel('create', {})}>
                    新建
                 </Button>
                </Authorized>
              </div>
              {this.renderTable()}
            </div>
          </div>
        </Card>
        <Modal
          // width={modalWidth}
          destroyOnClose={true}
          visible={modalVisible}
          onCancel={() => this.hideModalVisibel()}
          onOk={() => { this.modalOkHandle() }}

        >
          <DetailFormInfo
            ref={ref => { this.modalForm = ref }}
            formItems={detailFormItems}
          />
        </Modal>
      </PageHeaderLayout>
    );
  }
}

