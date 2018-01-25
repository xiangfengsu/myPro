module.exports = {
  'GET /api/selectGroupLists': {
    status: 200,
    body: [{
      label: 'selectDynamicGroup1',
      childrenOptions: [{
        key: 'selectDynamicGroup1_1',
        value: 'selectDynamicGroup1_1'
      }, {
        key: 'selectDynamicGroup1_2',
        value: 'selectDynamicGroup1_2'
      }]
    }, {
      label: 'selectDynamicGroup2',
      childrenOptions: [{
        key: 'selectDynamicGroup2_1',
        value: 'selectDynamicGroup2_1'
      }, {
        key: 'selectDynamicGroup2_2 ',
        value: 'selectDynamicGroup2_2'
      }]
    }],
    errorMessage: ''
  },
  'GET /api/selectLists2': {
    status: 200,
    body: [{
      key: '广告1',
      value: '广告'
    }, {
      key: '网络2',
      value: '网络'
    }, {
      key: '中介3',
      value: '中介'
    }, {
      key: '其他4',
      value: '其他'
    }],
    errorMessage: ''
  }
}