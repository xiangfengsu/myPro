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
  message
} from "antd";
import cloneDeep from "lodash/cloneDeep";
import styles from "./Index.less";

import TreeTable from "../../../components/TreeTable/Index";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

import { PageConfig } from "./pageConfig.js";
import department from "../../../models/department";

import DetailFormInfo from "./ModalDetailForm";
// import Authorized from '../../../utils/Authorized';
import {
  formaterObjectValue,
  formItemAddInitValue
} from "../../../utils/utils";

const FormItem = Form.Item;

@connect(({ user, loading, department, dictionary }) => ({
  currentUser: user.currentUser,
  loading: loading.models.department,
  department,
  dictionary
}))
@Form.create()
export default class Index extends PureComponent {
  state = {
    modalVisible: false,
    showModalType: "",
    formValues: {},
    currentItem: {},
    selectedNode: [],
    detailFormItems: PageConfig.detailFormItems
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "department/fetch"
    });
  }
  updateFormItems = (type = "create", record = {}) => {
    const detailFormItems = cloneDeep(PageConfig.detailFormItems);
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    this.setState({ detailFormItems });
  };

  showModalVisibel = (type, record) => {
    this.updateFormItems(type, record);
    this.setState({
      showModalType: type,
      modalVisible: true,
      currentItem: record
    });
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
        title: "操作",
        render: (text, record) => {
          if (record.parentid !== 0) {
            return (
              <div>
                <a
                  onClick={() => {
                    this.showModalVisibel("update", record);
                  }}
                >
                  编辑
                </a>
                {/* &nbsp;
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={() => {
                    this.deleteTableRowHandle(record.id);
                  }}
                >
                  <a>删除</a>
                </Popconfirm> */}
              </div>
            );
          }
        }
      }
    ];
    return columns;
  };

  renderTable = () => {
    const { department, loading } = this.props;
    const { tableColumns } = PageConfig;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const { data: { list } } = department;
    const tableProps = {
      loading,
      dataSource: list,
      columns: newTableColumns
    };
    return <TreeTable {...tableProps} />;
  };

  modalOkHandle = () => {
    this.modalForm.validateFields((err, fieldsValue) => {
      if (err) return;
      logs("fieldsValue", fieldsValue);
      const { showModalType } = this.state;
      const fields = formaterObjectValue(fieldsValue);
      if (showModalType === "create") {
        this.props
          .dispatch({
            type: "department/add",
            payload: fields
          })
          .then(() => {
            const { statusCode } = this.props.department;
            if (statusCode === 200) this.hideModalVisibel();
          });
      } else if (showModalType === "update") {
        const { id } = this.state.currentItem;
        this.props
          .dispatch({
            type: "department/update",
            payload: { id, ...fields }
          })
          .then(() => {
            const { statusCode } = this.props.department;
            
            if (statusCode === 200) this.hideModalVisibel();
          });
      }
    });
  };

  deleteTableRowHandle = id => {
    this.props
      .dispatch({
        type: "department/remove",
        payload: { id }
      })
      .then(() => {
        const { statusCode } = this.props.department;
        showStautsMessageHandle("department", "delete", statusCode);
        if (statusCode === 200) this.hideModalVisibel();
      });
  };

  render() {
    const { modalVisible, detailFormItems } = this.state;
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
          <DetailFormInfo
            ref={ref => {
              this.modalForm = ref;
            }}
            formItems={detailFormItems}
            dictionary={dictionary}
          />
        </Modal>
      </PageHeaderLayout>
    );
  }
}
