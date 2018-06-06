import React, { Component } from 'react';
import { connect } from 'dva';

import { Select } from 'antd';

const { Option } = Select;
const cleanArray = (arr) => {
  if (!(arr instanceof Array)) {
    arr = []; /* eslint-disable-line */
  }
  return arr.filter((e) => {
    return e !== undefined && e !== null && e !== '';
  });
};
@connect(state => ({
  dictionary: state.dictionary,
}))
export default class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    const { value, multiple } = this.props;
    if (value !== undefined) {
      const arrValue = `${value}`.split(',');
      this.state = {
        selectValue: multiple ? (arrValue === '' ? undefined : arrValue) : value,
      };
    } else {
      this.state = {
        selectValue: value,
      };
    }
  }
  componentDidMount() {
    const { dispatch, fetchUrl, dictionaryKey } = this.props;
    dispatch({
      type: 'dictionary/query',
      payload: {
        fetchUrl,
        dictionaryKey,
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value, multiple } = nextProps;
      // logs('value22', value);
      if (value !== undefined) {
        const arrValue = `${value}`.split(',');
        // logs('arrValue', arrValue);
        this.setState({
          selectValue: multiple
            ? arrValue === '' ? undefined : arrValue
            : value,
        });
      } else {
        this.setState({
          selectValue: value,
        });
      }
    }
  }
  handleChange = (selectValue) => {
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    this.triggerChange(selectValue);
  };
  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    const { state } = this;
    const {
      dictionary = {},
      dictionaryKey,
      placeholder,
      popupContainer,
      multiple,
    } = this.props;
    return (
      <Select
        value={multiple ? cleanArray(state.selectValue) : state.selectValue}
        placeholder={placeholder}
        mode={multiple ? 'multiple' : ''}
        style={{ width: '100%' }}
        onChange={this.handleChange}
        getPopupContainer={() => popupContainer}
      >
        {dictionary[dictionaryKey] &&
          dictionary[dictionaryKey].map((option) => {
            return (
              <Select.OptGroup label={option.label} key={option.key}>
                {option.childrenOptions.map((v) => {
                  return (
                    <Option value={v.key} key={v.key}>
                      {v.value}
                    </Option>
                  );
                })}
              </Select.OptGroup>
            );
          })}
      </Select>
    );
  }
}
