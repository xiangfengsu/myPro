import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form, Row, Col, Card, Modal, Button, Input, Popconfirm } from "antd";
import styles from "./Index.less";
import cloneDeep from "lodash/cloneDeep";
import TreeTable from "components/TreeTable/Index";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

import { PageConfig } from "./pageConfig.js";

import DetailFormInfo from "./ModalDetailForm";
// import Authorized from '../../../utils/Authorized';
import { formaterObjectValue, formItemAddInitValue } from "utils/utils";

const FormItem = Form.Item;

const formItemObject = PageConfig.detailFormItems;
@connect(({ user, loading, menumanage, dictionary }) => ({
  currentUser: user.currentUser,
  loading: loading.models.menumanage,
  menumanage,
  dictionary
}))
@Form.create()
export default class Index extends PureComponent {
  static childContextTypes = {
    updateFormItems: PropTypes.func,
    setTreeNodeParentId: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      showModalType: "",
      formValues: {},
      currentItem: {},
      selectedNode: [],
      detailFormItems: [],
      treeNodeParentId: undefined
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "menumanage/fetch"
    });
  }
  updateFormItems = (id = 1, type = "create", record = {}) => {
    const detailForm = cloneDeep(PageConfig.detailFormItems);
    const detailFormItems = [
      ...detailForm.selectFormItem,
      ...detailForm[id],
      ...detailForm.textArea
    ];
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    if (type === "update") {
      newDetailFormItems[0].colSpan = 0;
    }
    this.setState({ detailFormItems });
  };
  showModalVisibel = (type, record) => {
    const typeId = record.menutype;
    this.updateFormItems(typeId, type, record);
    this.changeModalVisibel(true);
    this.setState({
      showModalType: type,
      currentItem: record,
      treeNodeParentId: record.parentmenuid
    });
  };
  hideModalVisibel = () => {
    this.changeModalVisibel(false);
    this.setState({
      currentItem: {},
      detailFormItems: []
    });
  };
  changeModalVisibel = flag => {
    this.props.dispatch({
      type: "menumanage/modalVisible",
      payload: {
        modalVisible: flag
      }
    });
  };
  extraTableColumnRender = () => {
    const columns = [
      {
        title: "操作",
        render: (text, record, index) => {
          if (record.parentid !== 0) {
            if (record.menutype !== 3) {
              return (
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
              );
            }
          }
        }
      }
    ];
    return columns;
  };
  queryStructorTreeHandle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "dictionary/query",
      payload: {
        fetchUrl: "/api/queryMenuStructure",
        dictionaryKey: "menuStructure"
      }
    });
  };
  renderTable = () => {
    const { menumanage, loading } = this.props;
    const { tableColumns } = PageConfig;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const { data: { list, pagination } } = menumanage;
    const tableProps = {
      loading,
      dataSource: list,
      columns: newTableColumns
    };
    return <TreeTable {...tableProps} />;
  };
  getChildContext() {
    return {
      updateFormItems: this.updateFormItems,
      setTreeNodeParentId: treeNodeParentId => {
        this.setState({ treeNodeParentId });
      }
    };
  }
  modalOkHandle = () => {
    this.modalForm.validateFields((err, fieldsValue) => {
      if (err) return;
      logs("fieldsValue", fieldsValue);
      const { showModalType } = this.state;
      const fields = formaterObjectValue(fieldsValue);
      if (showModalType === "create") {
        this.props.dispatch({
          type: "menumanage/add",
          payload: fields
        });
      } else if (showModalType === "update") {
        this.props.dispatch({
          type: "menumanage/update",
          payload: fields
        });
      }
    });
  };
  deleteTableRowHandle = id => {
    this.props.dispatch({
      type: "menumanage/remove",
      payload: { id }
    });
  };
  render() {
    const {
      detailFormItems,
      currentItem,
      showModalType,
      treeNodeParentId,
      currentItem: { parentmenuid, parentmenuname }
    } = this.state;
    const {
      form: { getFieldDecorator },
      currentUser: { btnAuth = [] },
      loading,
      menumanage: { modalVisible, confirmLoading },
      dictionary
    } = this.props;
    const treeNodes = dictionary.menuStructure;
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
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
          confirmLoading={confirmLoading}
          onCancel={() => this.hideModalVisibel()}
          onOk={() => {
            this.modalOkHandle();
          }}
        >
          <DetailFormInfo
            ref={ref => {
              this.modalForm = ref;
            }}
            formItems={detailFormItems}
            showModalType={showModalType}
            dictionary={dictionary}
            treeNodes={treeNodes}
            parentId={treeNodeParentId}
            parentName={parentmenuname}
            currentItem={currentItem}
            queryStructorTreeHandle={this.queryStructorTreeHandle}
          />
        </Modal>
      </PageHeaderLayout>
    );
  }
}
