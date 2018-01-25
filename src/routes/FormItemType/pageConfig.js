import { Icon } from 'antd';
export const FormItems = [{
  formType: 'input',
  disabled: false,
  isRequired: false,
  key: 'channelname',
  label: 'input',
  colSpan: 8,
  placeholder: 'input',
  hasFeedback: true
}, {
  formType: 'inputNumber',
  disabled: false,
  isRequired: false,
  key: 'inputNumber',
  label: 'inputNumber',
  placeholder: 'inputNumber',
  colSpan: 8,
  hasFeedback: true
}, {
  formType: 'inputMoney',
  disabled: false,
  isRequired: false,
  key: 'inputMoney',
  label: 'inputMoney',
  placeholder: 'inputMoney',
  colSpan: 8,
  hasFeedback: true
}, {
  formType: 'inputPhone',
  disabled: false,
  isRequired: false,
  key: 'inputPhone',
  label: 'inputPhone',
  placeholder: 'inputPhone',
  colSpan: 8,
  hasFeedback: true
}, {
  formType: 'select',
  disabled: false,
  isRequired: false,
  key: 'select',
  label: 'select',
  placeholder: 'select',
  selectOptions: [{
    key: 'select1',
    value: 'select1'
  }, {
    key: 'select2',
    value: 'select2'
  }],
  popupContainer: 'scorllArea',
  hasFeedback: true

}, {
  formType: 'selectDynamic',
  disabled: false,
  isRequired: false,
  key: 'selectDynamic',
  label: 'selectDynamic',
  placeholder: 'selectDynamic',
  dictionaryKey: 'selectDynamic1',
  fetchUrl: '/api/selectLists2',
  // initialValue: '其他',
  popupContainer: 'scorllArea',
  hasFeedback: true

}, {
  formType: 'selectGroup',
  key: 'selectGroup',
  label: 'selectGroup',
  placeholder: 'selectGroup',
  selectOptions: [{
    label: 'selectGroup1',
    childrenOptions: [{
      key: 'selectGroup1_1',
      value: 'selectGroup1_1'
    }, {
      key: 'selectGroup1_2',
      value: 'selectGroup1_2'
    }]
  }, {
    label: 'selectGroup2',
    childrenOptions: [{
      key: 'selectGroup2_1',
      value: 'selectGroup2_1'
    }, {
      key: 'selectGroup2_2 ',
      value: 'selectGroup2_2'
    }]
  }],
  popupContainer: 'scorllArea',
  hasFeedback: true

}, {
  formType: 'selectDynamicGroup',
  disabled: false,
  isRequired: false,
  key: 'selectGroupDynamic',
  label: 'selectGroupDynamic',
  placeholder: 'selectDynamic',
  dictionaryKey: 'selectGroupDynamic',
  fetchUrl: '/api/selectGroupLists',
  // initialValue: '其他',
  popupContainer: 'scorllArea',
  hasFeedback: true

}, {
  formType: 'datePicker',
  showTime: false,

  disabled: false,
  isRequired: false,
  key: 'datePicker',
  label: 'datePicker',
  placeholder: 'datePicker',
  popupContainer: 'scorllArea'
}, {
  formType: 'datePicker',
  showTime: true,
  disabled: false,
  isRequired: false,
  key: 'datePickerShowTime',
  label: 'datePickerShowTime',
  placeholder: 'datePicker',
  popupContainer: 'scorllArea'
},
{
  formType: 'rangePicker',
  disabled: false,
  isRequired: false,
  key: 'rangePicker',
  label: 'rangePicker',
  popupContainer: 'scorllArea'
},
{
  formType: 'rangePicker',
  showTime: true,
  disabled: false,
  isRequired: false,
  key: 'rangePickerShowTime',
  label: 'rangePickerShowTime',
  popupContainer: 'scorllArea'
},
{
  formType: 'monthPicker',
  disabled: false,
  isRequired: false,
  key: 'monthPicker',
  label: 'monthPicker',
  popupContainer: 'scorllArea'
},
{
  formType: 'timePicker',
  disabled: false,
  isRequired: false,
  key: 'timePicker',
  label: 'timePicker',
  popupContainer: 'scorllArea'
},
{
  formType: 'upload',
  disabled: false,
  isRequired: false,
  key: 'upload1',
  label: 'upload-listType-text',
  placeholder: 'upload1',
  action: 'http://127.0.0.1:7001/form',
  multiple: true,
  acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
  listType: 'text', // 1:text  2:picture 3:picture-card
  maxFileSize: 3,// 单位是M
  maxFileCounts: 3,
  colSpan: 12,
},
{
  formType: 'upload',
  disabled: false,
  isRequired: false,
  key: 'upload3',
  label: 'upload-listType-picture',
  placeholder: 'upload-listType-picture',
  action: 'http://127.0.0.1:7001/form',
  multiple: true,
  acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
  listType: 'picture', // 1:text  2:picture 3:picture-card
  maxFileSize: 3,// 单位是M
  maxFileCounts: 3,
  colSpan: 12
},
{
  formType: 'upload',
  disabled: false,
  isRequired: false,
  key: 'upload2',
  label: 'upload-listType-picture-card',
  placeholder: 'upload-listType-picture-card',
  action: 'http://127.0.0.1:7001/form',
  multiple: true,
  acceptType: '*', //.jpg,.png,.pdf,.mp4,.gif,.word
  listType: 'picture-card', // 1:text  2:picture 3:picture-card
  maxFileSize: 3,// 单位是M
  maxFileCounts: 2,
  colSpan: 12
},
{
  formType: 'textArea',
  // disabled: false,
  // isRequired: false,
  key: 'textArea',
  label: 'textArea',
  colSpan: 24
  // autosize: { minRows: 3, maxRows: 7 }
  // placeholder: 'inputPhone'
},
]