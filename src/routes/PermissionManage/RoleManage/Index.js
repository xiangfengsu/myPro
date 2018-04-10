import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import {
  Form,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Input,
  Popconfirm,
  Tag
} from "antd";
import cloneDeep from "lodash/cloneDeep";

import styles from "./Index.less";

import SearchForms from "components/GeneralSearchForm/Index";
import TableList from "components/GeneralTableList/Index";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

import { PageConfig } from "./pageConfig.js";

import DetailFormInfo from "./ModalDetailForm";

import MenuTree from "components/TreeSelectModal/Index";
import {
  formaterObjectValue,
  formItemAddInitValue
} from "utils/utils";
const FormItem = Form.Item;

@connect(({ user, loading, rolemanage, dictionary }) => ({
  currentUser: user.currentUser,
  loading: loading.models.rolemanage,
  rolemanage,
  dictionary
}))
@Form.create()
export default class Index extends PureComponent {
  state = {
    modalVisible: false,
    showModalType: "",
    queryValues: {},
    formValues: {},
    currentItem: {},
    selectedNode: [],
    isShowMenuTree: false,
    detailFormItems: PageConfig.detailFormItems
  };
  static childContextTypes = {
    currentItem: PropTypes.object,
    form: PropTypes.object
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "rolemanage/fetch",
      payload: this.queryParamsFormater()
    });
  }
  updateFormItems = (type = "create", record = {}) => {
    const detailFormItems = cloneDeep(PageConfig.detailFormItems);
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    this.setState({ detailFormItems });
  };
  showModalVisibel = (type, record, isShowMenuTree = false) => {
    logs("record", record);
    if (!isShowMenuTree) {
      this.updateFormItems(type, record);
      this.setState({
        showModalType: type,
        modalVisible: true,
        currentItem: record,
        isShowMenuTree
      });
    } else {
      this.queryStructorTreeHandle();
      this.setState({
        modalVisible: true,
        currentItem: record,
        isShowMenuTree
      });
    }
  };
  hideModalVisibel = () => {
    this.setState({
      modalVisible: false,
      currentItem: {}
    });
  };
  extraTableColumnRender = () => {
    const columns = [
      {
        title: "菜单权限",
        render: (text, record) => {
          return (
            <Tag
              color="#1890ff"
              onClick={() => this.showModalVisibel("create", record, true)}
            >
              查看
            </Tag>
            // <div>
            //   <a onClick={() => this.showModalVisibel('create', record, true)}>查看</a>
            // </div>
          );
        }
      },
      {
        title: "操作",
        render: (text, record) => (
          <div>
            <a
              color="#1890ff"
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
              <a color="#f5222d">删除</a>
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
      handleSearchSubmit: queryValues => {
        const { createtime } = queryValues;
        const params = Object.assign(queryValues, {
          // createtime: createtime ? createtime.format("YYYY-MM-DD") : ""
        });
        const payload = formaterObjectValue(params);
        this.setState({
          queryValues: payload
        });
        dispatch({
          type: "rolemanage/fetch",
          payload: this.queryParamsFormater(payload, 1)
        });
      },
      handleFormReset: () => {
        this.setState({
          queryValues: {}
        });
        dispatch({
          type: "rolemanage/fetch",
          payload: this.queryParamsFormater()
        });
      }
    };
    return <SearchForms {...props} />;
  };
  renderTable = () => {
    const { rolemanage, loading } = this.props;
    const { tableColumns } = PageConfig;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const { data: { list, pagination } } = rolemanage;
    const tableProps = {
      loading,
      bordered: false,
      dataSource: list,
      columns: newTableColumns,
      pagination: Object.assign(pagination, { pageSize: 10 }),
      handleTableChange: ({current}) => {
        const { dispatch } = this.props;
        const payload = {
          page: current,
          pageSize: 10
        };
        dispatch({
          type: "rolemanage/fetch",
          payload: this.queryParamsFormater(payload, 4)
        });
      }
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
        logs("fieldsValue", fieldsValue);
        const { showModalType } = this.state;
        const fields = formaterObjectValue(fieldsValue);
        if (showModalType === "create") {
          this.props
            .dispatch({
              type: "rolemanage/add",
              payload: this.queryParamsFormater(fields, 3)
            })
            .then(() => {
              const { statusCode } = this.props.rolemanage;
              if (statusCode === 200) this.hideModalVisibel();
            });
        } else if (showModalType === "update") {
          this.props
            .dispatch({
              type: "rolemanage/update",
              payload: this.queryParamsFormater(fields, 2)
            })
            .then(() => {
              const { statusCode } = this.props.rolemanage;
              if (statusCode === 200) this.hideModalVisibel();
            });
        }
      });
    } else {
      this.hideModalVisibel();
    }
  };
  deleteTableRowHandle = id => {
    this.props.dispatch({
      type: "rolemanage/remove",
      payload: this.queryParamsFormater({ id }, 2)
    });
  };
  queryParamsFormater = (fields, type) => {
    // type 1:查询  2:update|delete  3:save  4:分页
    const { data: { pagination } } = this.props.rolemanage;
    delete pagination.total;
    let params = {
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
      modalVisible,
      detailFormItems,
      isShowMenuTree,
      currentItem
    } = this.state;
    const {
      form: { getFieldDecorator },
      currentUser: { btnAuth = [] },
      loading,
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
          destroyOnClose={true}
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
