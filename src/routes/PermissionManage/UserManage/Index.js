import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form, Row, Col, Card, Modal, Button, Input, Popconfirm } from "antd";
import cloneDeep from "lodash/cloneDeep";

import styles from "./Index.less";

import TableList from "components/GeneralTableList/Index";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

import SearchForms from "components/GeneralSearchForm/Index";

import { PageConfig } from "./pageConfig.js";

import DetailFormInfo from "./ModalDetailForm";

import MenuTree from "components/TreeSelectModal/Index";
import { formaterObjectValue, formItemAddInitValue } from "utils/utils";

const FormItem = Form.Item;

@connect(({ user, loading, usermanage, dictionary }) => ({
  currentUser: user.currentUser,
  loading: loading.models.usermanage,
  usermanage,
  dictionary
}))
@Form.create()
export default class Index extends PureComponent {
  state = {
    showModalType: "",
    formValues: {},
    queryValues: {},
    currentItem: {},
    selectedNode: [],
    isShowMenuTree: false,
    detailFormItems: PageConfig.detailFormItems
  };
  static childContextTypes = {
    currentItem: PropTypes.object,
    form: PropTypes.object
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "usermanage/fetch",
      payload: this.queryParamsFormater()
    });
  }
  updateFormItems = (type = "create", record = {}) => {
    const detailFormItems = cloneDeep(PageConfig.detailFormItems);
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    this.setState({ detailFormItems });
  };
  changeModalVisibel = flag => {
    this.props.dispatch({
      type: "usermanage/modalVisible",
      payload: {
        modalVisible: flag
      }
    });
  };
  showModalVisibel = (type, record, isShowMenuTree = false) => {
    if (!isShowMenuTree) {
      this.updateFormItems(type, record);
      this.changeModalVisibel(true);
      this.setState({
        showModalType: type,
        currentItem: record,
        isShowMenuTree
      });
    } else {
      this.queryStructorTreeHandle();
      this.changeModalVisibel(true);
      this.setState({
        currentItem: record,
        isShowMenuTree
      });
    }
  };
  hideModalVisibel = () => {
    this.changeModalVisibel(false);
    this.setState({
      currentItem: {}
    });
  };
  extraTableColumnRender = () => {
    const columns = [
      {
        title: "菜单权限",
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.showModalVisibel("create", record, true)}>
                查看
              </a>
            </div>
          );
        }
      },
      {
        title: "操作",
        render: (text, record) => (
          <div>
            <a
              onClick={() => {
                this.showModalVisibel("update", record);
              }}
            >
              编辑
            </a>
            &nbsp;
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => {
                this.deleteTableRowHandle(record.id);
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        )
      }
    ];
    return columns;
  };
  queryStructorTreeHandle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "dictionary/query",
      payload: {
        fetchUrl: "/sys/menu/dic",
        dictionaryKey: "menuStructure"
      }
    });
  };
  renderSearchForm = () => {
    const { form, dispatch } = this.props;
    const { searchForms } = PageConfig;
    const props = {
      form,
      formInfo: {
        layout: "inline",
        formItems: searchForms
      },
      handleSearchSubmit: formValues => {
        const { createtime, channeltype } = formValues;
        const params = Object.assign(formValues, {});
        const payload = formaterObjectValue(params);
        this.setState({
          queryValues: payload
        });
        dispatch({
          type: "usermanage/fetch",
          payload: this.queryParamsFormater(payload, 1)
        });
      },
      handleFormReset: () => {
        this.setState({
          queryValues: {}
        });
        dispatch({
          type: "usermanage/fetch",
          payload: this.queryParamsFormater()
        });
      }
    };
    return <SearchForms {...props} />;
  };
  renderTable = () => {
    const { usermanage, loading } = this.props;
    const { tableColumns } = PageConfig;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const { data: { list, pagination } } = usermanage;
    const tableProps = {
      loading,
      bordered: false,
      dataSource: list,
      pagination: Object.assign(pagination, { pageSize: 10 }),
      columns: newTableColumns,
      handleTableChange: ({ current }) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        const payload = {
          page: current,
          pageSize: 10,
          ...formValues
        };
        dispatch({
          type: "usermanage/fetch",
          payload: this.queryParamsFormater(payload, 4)
        });
      },
      bordered: false
    };
    return <TableList {...tableProps} />;
  };
  getChildContext() {
    return {
      currentItem: this.state.currentItem
    };
  }
  modalOkHandle = () => {
    const { isShowMenuTree } = this.state;
    if (!isShowMenuTree) {
      this.modalForm.validateFields((err, fieldsValue) => {
        if (err) return;
        const { showModalType } = this.state;
        const fields = formaterObjectValue(fieldsValue);
        if (showModalType === "create") {
          this.props.dispatch({
            type: "usermanage/add",
            payload: this.queryParamsFormater(fields, 3)
          });
        } else if (showModalType === "update") {
          this.props.dispatch({
            type: "usermanage/update",
            payload: this.queryParamsFormater(fields, 2)
          });
        }
      });
    } else {
      this.hideModalVisibel();
    }
  };
  deleteTableRowHandle = id => {
    this.props.dispatch({
      type: "usermanage/remove",
      payload: this.queryParamsFormater({ id }, 2)
    });
  };
  queryParamsFormater = (fields, type) => {
    // type 1:查询  2:update|delete  3:save  4:分页
    const { data: { pagination } } = this.props.usermanage;
    delete pagination.total;
    const params = {
      form: {},
      query: {},
      pagination: {
        current: 1,
        pageSize: 10
      }
    };
    switch (type) {
      case 1:
        Object.assign(params, {
          query: { ...fields },
          pagination
        });
        break;
      case 2:
        Object.assign(params, {
          query: { ...this.state.queryValues },
          form: { ...fields },
          pagination
        });
        break;
      case 3:
        Object.assign(params, {
          form: { ...fields }
        });
        break;
      case 4:
        Object.assign(params, {
          query: { ...this.state.queryValues },
          pagination: { current: fields.page, pageSize: fields.pageSize }
        });
        break;
      default:
        Object.assign(params, {});
    }
    return params;
  };
  render() {
    const {
      // modalVisible,
      detailFormItems,
      isShowMenuTree,
      currentItem
    } = this.state;
    const {
      form: { getFieldDecorator },
      currentUser: { btnAuth = [] },
      loading,
      usermanage: { modalVisible, confirmLoading },
      dictionary
    } = this.props;
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSearchForm()}
              <div className={styles.tableListOperator}>
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => this.showModalVisibel("create", {})}
                >
                  新建
                </Button>
              </div>
              {this.renderTable()}
            </div>
          </div>
        </Card>
        <Modal
          // width={modalWidth}
          destroyOnClose
          confirmLoading={confirmLoading}
          visible={modalVisible}
          onCancel={() => this.hideModalVisibel()}
          onOk={() => {
            this.modalOkHandle();
          }}
        >
          {!isShowMenuTree ? (
            <DetailFormInfo
              ref={ref => {
                this.modalForm = ref;
              }}
              formItems={detailFormItems}
              dictionary={dictionary}
            />
          ) : (
            <MenuTree currentItem={currentItem} dictionary={dictionary} />
          )}
        </Modal>
      </PageHeaderLayout>
    );
  }
}
