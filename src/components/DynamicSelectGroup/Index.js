import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'dva';

import { Select, Input } from 'antd';
const Option = Select.Option;

@connect(state => ({
  dictionary: state.dictionary,
}))
export default class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value || {};
    this.state = {
      selectValue: value.selectValue
    };
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
      const value = nextProps.value;
      if (value) {
        this.setState(value);
      } else {
        this.setState({ selectValue: undefined });
      }
    }
  }
  handleChange = (selectValue) => {
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    this.triggerChange({ selectValue });
  }
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render() {
    const state = this.state;
    const { dictionary = {}, dictionaryKey, placeholder, popupContainer } = this.props;
    return (
      <Select
        value={state.selectValue}
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={this.handleChange}
        getPopupContainer={() => popupContainer}
      >
        {
          dictionary[dictionaryKey] && dictionary[dictionaryKey].map((option, i) => {
            return (
              <Select.OptGroup label={option.label} key={`${i}_t`}>
                {
                  option.childrenOptions.map((v, j) => {
                    return (
                      <Option
                        value={v.key}
                        key={`${v.key}_${i}_${j}`}
                      >
                        {v.value}
                      </Option>
                    )
                  })
                }
              </Select.OptGroup>
            )
          })
        }
      </Select>

    );
  }
}



