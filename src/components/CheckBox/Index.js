import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'dva';

import { Select, Input } from 'antd';

const Option = Select.Option;
const cleanArray = (arr) => {
  if (!(arr instanceof Array)) {
    arr = [];
  }
  return arr.filter(function (e) {
    return (e !== undefined && e !== null && e !== '');
  });
}
@connect(state => ({
  dictionary: state.dictionary,
}))
export default class CustomCheckBox extends Component {
  constructor(props) {
    super(props);
    const { value, multiple } = this.props;
    if (value !== undefined) {
      const arrValue = (value + '').split(',');
      this.state = {
        selectValue: multiple ? (arrValue === '' ? undefined : arrValue) : value
      };
    } else {
      this.state = {
        selectValue: value
      };
    }

  }
  componentDidMount() {
    const { dispatch, fetchUrl, dictionaryKey } = this.props;
    dispatch({
      type: 'dictionary/query',
      payload: {
        fetchUrl,
        dictionaryKey
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value, multiple } = nextProps;
      // logs('value22', value);
      if (value !== undefined) {
        const arrValue = (value + '').split(',');
        // logs('arrValue', arrValue);
        this.setState({
          selectValue: multiple ? (arrValue === '' ? undefined : arrValue) : value
        })
      } else {
        this.setState({
          selectValue: value
        });
      }
    }
  }
  handleChange = (selectValue) => {
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    this.triggerChange(selectValue);
  }
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }
  render() {
    const state = this.state;
    const { dictionary = {}, dictionaryKey, placeholder, popupContainer, multiple } = this.props;
    return (
      <Select
        value={multiple ? cleanArray(state.selectValue) : state.selectValue}
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={this.handleChange}
        mode={multiple ? 'multiple' : ''}
        getPopupContainer={() => popupContainer}
      >
        {
          dictionary[dictionaryKey] && dictionary[dictionaryKey].map((v, i) => {
            return (
              <Option value={v.key} key={`${v.key}_${i}`}>
                {v.value}
              </Option>
            )
          })
        }
      </Select>

    );
  }
}



