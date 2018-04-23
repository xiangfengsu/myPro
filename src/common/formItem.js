import {
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  TreeSelect,
  TimePicker,
  Upload,
  DatePicker
} from "antd";

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const validateNumber = (value, prevValue, allValues) => {
  if (!value) {
    return value;
  }
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  if (reg.test(value) || value === "" || value === "-") {
    return value;
  } else {
    return prevValue;
  }
};
const validatePlusNumber = (value, prevValue, allValues) => {
  if (!value) {
    return value;
  }
  const reg = /^\d+$/;
  if (!isNaN(value) && reg.test(value)) {
    return value;
  } else {
    return prevValue;
  }
};
const validateMoney = (value, prevValue, allValues) => {
  if (!value) {
    return value;
  }
  const reg = /^\d+(\.\d{1,4})?$/;
  logs("value", reg.test(value));
  if (reg.test(value)) {
    return value;
  } else {
    return prevValue;
  }
};

export const renderFormItem = (item, form, dispatch) => {
  const { getFieldDecorator, setFieldsValue } = form;
  let InputType = null;
  switch (item.formType) {
    case "input":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: item.errorText || `${item.label}不能为空`
          }
        ]
      })(
        <Input
          type="text"
          disabled={item.disabled}
          placeholder={
            item.placeholder ? item.placeholder : `请输入${item.label}`
          }
          readOnly={item.isReadOnly}
          onClick={item.onClick ? item.onClick : () => {}}
        />
      );
      break;
    case "inputMail":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: item.errorText || `邮箱格式不正确`,
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
          }
        ]
      })(
        <Input
          type="text"
          disabled={item.disabled}
          placeholder={
            item.placeholder ? item.placeholder : `请输入${item.label}`
          }
          readOnly={item.isReadOnly}
          onClick={item.onClick ? item.onClick : () => {}}
        />
      );
      break;
    case "inputNumber":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        normalize: (value, prevValue, allValues) => {
          return validateNumber(value, prevValue, allValues);
        },
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <InputNumber
          style={{ width: "100%" }}
          disabled={item.disabled}
          placeholder={
            item.placeholder ? item.placeholder : `请输入${item.label}`
          }
        />
      );
      break;
    case "inputMoney":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        normalize: (value, prevValue, allValues) => {
          return validateNumber(value, prevValue, allValues);
        },
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`
            // pattern: item.pattern,
            // max: item.maxLen
          }
        ]
      })(
        <Input
          style={{ width: "100%" }}
          addonAfter="元"
          disabled={item.disabled}
          placeholder={
            item.placeholder ? item.placeholder : `请输入${item.label}`
          }
        />
      );
      break;
    case "inputPhone":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        normalize: (value, prevValue, allValues) => {
          return validatePlusNumber(value, prevValue, allValues);
        },
        rules: [
          {
            required: item.isRequired,
            message: item.errorText || "手机号码格式不正确",
            pattern: item.pattern || /^1[34578]\d{9}$/
          }
        ]
      })(
        <Input
          type="tel"
          maxLength="11"
          disabled={item.disabled}
          placeholder={
            item.placeholder ? item.placeholder : `请输入${item.label}`
          }
        />
      );
      break;
    case "textArea":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <Input.TextArea
          type="text"
          autosize={item.autosize || { minRows: 5, maxRows: 10 }}
          disabled={item.disabled}
          placeholder={
            item.placeholder ? item.placeholder : `请输入${item.label}`
          }
        />
      );
      break;
    case "select":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <Select
          onSelect={item.onSelect ? item.onSelect : () => {}}
          placeholder={
            item.placeholder ? item.placeholder : `请选择${item.label}`
          }
          getPopupContainer={() =>
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        >
          {item.selectOptions.map((option, i) => {
            return (
              <Select.Option key={`${option.key}_i`} value={option.key}>
                {option.value}
              </Select.Option>
            );
          })}
        </Select>
      );
      break;
    case "selectDynamic":
      const DynamicSelect = require("../components/DynamicSelect/Index")
        .default;
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <DynamicSelect
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={
            item.placeholder ? item.placeholder : `请选择${item.label}`
          }
          multiple={item.multiple}
          fetchUrl={item.fetchUrl}
          popupContainer={
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        />
      );
      break;
    case "selectGroup":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <Select
          placeholder={
            item.placeholder ? item.placeholder : `请选择${item.label}`
          }
          getPopupContainer={() =>
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        >
          {item.selectOptions.map((option, i) => {
            return (
              <Select.OptGroup label={option.label} key={`${i}_t`}>
                {option.childrenOptions.map((v, j) => {
                  return (
                    <Select.Option value={v.key} key={`${i}_${j}`}>
                      {v.value}
                    </Select.Option>
                  );
                })}
              </Select.OptGroup>
            );
          })}
        </Select>
      );
      break;
    case "selectDynamicGroup":
      const DynamicSelectGroup = require("../components/DynamicSelectGroup/Index")
        .default;
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <DynamicSelectGroup
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={
            item.placeholder ? item.placeholder : `请选择${item.label}`
          }
          fetchUrl={item.fetchUrl}
          popupContainer={
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        />
      );
      break;
    case "selectDynamicTree":
      const DynamicSelectTree = require("../components/DynamicSelectTree/Index")
        .default;
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
            validator: (rule, value, callback) => {
              if (item.isRequired && value === undefined) {
                callback("");
              }
              if (item.isRequired && value && value.length === 0) {
                callback("");
              }
              callback();
            }
          }
        ]
      })(
        <DynamicSelectTree
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={
            item.placeholder ? item.placeholder : `请选择${item.label}`
          }
          fetchUrl={item.fetchUrl}
          disabled={item.disabled}
          multiple={item.multiple}
          showCheckedStrategy={item.showCheckedStrategy}
          extraProp={item.extraProp || {}}
          // popupContainer={item.popupContainer && document.getElementById(item.popupContainer) || document.body}
        />
      );
      break;
    case "selectDynamicMenuTree":
      const DynamicSelectMenuTree = require("../components/MenuDynamicTree/Index")
        .default;
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
            validator: (rule, value, callback) => {
              logs("value", value);
              if (item.isRequired && value === undefined) {
                callback("");
              }
              callback();
            }
          }
        ]
      })(
        <DynamicSelectMenuTree
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={
            item.placeholder ? item.placeholder : `请选择${item.label}`
          }
          fetchUrl={item.fetchUrl}
          disabled={item.disabled}
          extraProp={item.extraProp || {}}
        />
      );
      break;
    case "datePicker":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: "object",
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <DatePicker
          showTime={item.showTime}
          format={item.showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
          style={{ width: "100%" }}
          placeholder={item.placeholder || "请选择日期"}
          getCalendarContainer={() =>
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        />
      );
      break;
    case "rangePicker":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: "array",
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <RangePicker
          style={{ width: "100%" }}
          showTime={item.showTime}
          format={item.showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
          getCalendarContainer={() =>
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        />
      );
      break;
    case "monthPicker":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: "object",
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <MonthPicker
          placeholder={item.placeholder || "请选择月份"}
          style={{ width: "100%" }}
          getCalendarContainer={() =>
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        />
      );
      break;
    case "timePicker":
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: "object",
            required: item.isRequired,
            message: `${item.label}不能为空`
          }
        ]
      })(
        <TimePicker
          placeholder={item.placeholder || "请选择月份"}
          style={{ width: "100%" }}
          getCalendarContainer={() =>
            (item.popupContainer &&
              document.getElementById(item.popupContainer)) ||
            document.body
          }
        />
      );
      break;
    case "upload":
      const UploadImg = require("../components/UploadImg/Index").default;
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
            validator: (rule, value, callback) => {
              if (item.isRequired && !value) {
                callback("");
              }
              if (
                item.isRequired &&
                value &&
                value.fileList &&
                value.fileList.length === 0
              ) {
                callback("");
              }
              callback();
            }
          }
        ]
      })(
        <UploadImg
          action={item.action}
          maxFileCounts={item.maxLength || item.maxFileCounts}
          multiple={item.multiple}
          acceptType={item.acceptType}
          maxFileSize={item.maxFileSize}
          listType={item.listType}
        />
      );
      break;
  }
  return InputType;
};
