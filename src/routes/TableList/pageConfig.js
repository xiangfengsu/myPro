import { Icon } from 'antd';
export const PageConfig = {
  name: 'test页',
  path: 'table-test',
  tableColumns: [{
    title: '序号',
    dataIndex: 'id'
  }, {
    title: '渠道名称',
    dataIndex: 'channelname'
  }, {
    title: '合作状态',
    dataIndex: 'cooperationstatus'
  }, {
    title: '渠道类型',
    dataIndex: 'channeltype'
  }, {
    title: '渠道来源',
    dataIndex: 'channelsource'
  }, {
    title: '地区名称',
    dataIndex: 'city'
  }, {
    title: '渠道性质',
    dataIndex: 'channelnature',
    render: (text, record, index) => {
      if (text == 0) {
        return '直营';
      } else {
        return '非直营';
      }
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    render: (text, record, index) => {
      if (text == 1) {
        return (<Icon type="check-circle" style={{ color: '#52c41a' }} />);
      } else {
        return (<Icon type="close-circle" style={{ color: '#f5222d' }} />);
      }
    }
  }, {
    title: '创建时间',
    dataIndex: 'createtime'
  },],
  searchForms: [{
    formType: 'input',
    disabled: false,
    isRequired: false,
    key: 'channelname',
    label: '渠道名称',
    placeholder: '渠道名称'
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'cooperationstatus',
    label: '合作状态',
    placeholder: '合作状态',
    dataType: 'static',
    selectOptions: [{
      key: '直营',
      value: '直营'
    }, {
      key: '小商户',
      value: '小商户'
    }],
  }, {
    formType: 'selectDynamic',
    disabled: false,
    isRequired: false,
    key: 'channeltype',
    label: '渠道类型',
    placeholder: '渠道类型',
    dataType: 'dynamic',
    dictionaryKey: 'selectLists2',
    fetchUrl: '/api/selectLists2'
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'channelsource',
    label: '渠道来源',
    placeholder: '渠道来源',
    dataType: 'static',
    selectOptions: [{
      key: '官网',
      value: '官网'
    }, {
      key: '百度',
      value: '百度'
    }, {
      key: '400介绍',
      value: '400介绍'
    }, {
      key: '老客户',
      value: '老客户'
    }],
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'channelnature',
    label: '渠道性质',
    placeholder: '渠道性质',
    dataType: 'static',
    selectOptions: [{
      key: 0,
      value: '直营'
    }, {
      key: 1,
      value: '非直营'
    }],
  }, {
    formType: 'datePicker',
    disabled: false,
    isRequired: false,
    key: 'createtime',
    label: '创建时间',
    placeholder: '请选择日期',
  }, {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'status',
    label: '状态',
    placeholder: '状态',
    dataType: 'static',
    selectOptions: [{
      key: 1,
      value: '通过'
    }, {
      key: 0,
      value: '拒绝'
    }],
    popupContainer: 'scorllArea'

  }
  ],
  detailFormItems: [{
    formType: 'input',
    disabled: false,
    isRequired: true,
    key: 'channelname',
    label: '渠道名称',
    placeholder: '渠道名称',
    colSpan: 24
  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'cooperationstatus',
    label: '合作状态',
    placeholder: '合作状态',
    dataType: 'static',
    selectOptions: [{
      key: '直营',
      value: '直营'
    }, {
      key: '小商户',
      value: '小商户'
    }],
    colSpan: 24

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'channeltype',
    label: '渠道类型',
    placeholder: '渠道类型',
    dataType: 'static',
    selectOptions: [{
      key: '广告',
      value: '广告'
    }, {
      key: '网络',
      value: '网络'
    }, {
      key: '中介',
      value: '中介'
    }, {
      key: '其他',
      value: '其他'
    }],
    colSpan: 24

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'channelsource',
    label: '渠道来源',
    placeholder: '渠道来源',
    dataType: 'static',
    selectOptions: [{
      key: '官网',
      value: '官网'
    }, {
      key: '百度',
      value: '百度'
    }, {
      key: '400介绍',
      value: '400介绍'
    }, {
      key: '老客户',
      value: '老客户'
    }],
    colSpan: 24

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'channelnature',
    label: '渠道性质',
    placeholder: '渠道性质',
    dataType: 'static',
    selectOptions: [{
      key: 0,
      value: '直营'
    }, {
      key: 1,
      value: '非直营'
    }],
    colSpan: 24

  }, {
    formType: 'select',
    disabled: false,
    isRequired: true,
    key: 'status',
    label: '状态',
    placeholder: '状态',
    dataType: 'static',
    selectOptions: [{
      key: 1,
      value: '通过'
    }, {
      key: 0,
      value: '拒绝'
    }],
    colSpan: 24

  },
  {
    formType: 'textArea',
    disabled: false,
    isRequired: true,
    key: 'description',
    label: '备注',
    placeholder: '备注',
    autosize: { minRows: 5, maxRows: 10 },
    colSpan: 24
  }]
};
