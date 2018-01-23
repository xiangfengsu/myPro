import { Icon } from 'antd';
const inputTypeLists = [{
  key: 'input',
  value: 'input'
}, {
  key: 'inputNumber',
  value: 'inputNumber'
}];
const isTrueOrFalse = [{
  key: 'true',
  value: '是'
}, {
  key: 'false',
  value: '否'
}];
export const FormItems = {
  commonInput: [{
    formType: 'select',
    isRequired: true,
    key: 'inputType',
    label: '表单类型',
    selectOptions: inputTypeLists,
    hasFeedback: true
  }, {
    formType: 'input',
    isRequired: true,
    key: 'key',
    label: 'key',
    hasFeedback: true
  }, {
    formType: 'input',
    isRequired: true,
    key: 'label',
    label: 'label',
    hasFeedback: true
  }, {
    formType: 'input',
    isRequired: false,
    key: 'placeholder',
    label: 'placeholder',
    hasFeedback: true
  }, {
    formType: 'inputNumber',
    key: 'inputNumber',
    label: 'colSpan',
    initialValue: 8,
    hasFeedback: true
  }, {
    formType: 'select',
    initialValue: 'false',
    isRequired: true,
    key: 'isDisabled',
    label: 'disabled',
    placeholder: '请选择表单是否可编辑',
    selectOptions: isTrueOrFalse,
    hasFeedback: true
  }, {
    formType: 'select',
    initialValue: 'false',
    isRequired: true,
    key: 'isRequired',
    label: 'isRequired',
    placeholder: '请选择表单是否必填',
    selectOptions: isTrueOrFalse,
    hasFeedback: true
  },],
  selectStaticInput: [{

  }]
};
export function getFormItems(inputType) {
  let inputTypeList = [];
  switch (inputType) {
    case 'input':
    case 'inputNumber':
    case 'inputMoney':
    case 'inputPhone':
      inputTypeList = FormItems.commonInput;
      break;
  }
  return inputTypeList;
} 