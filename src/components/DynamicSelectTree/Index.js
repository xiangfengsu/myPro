import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'dva';

import { TreeSelect, Tag, Card } from 'antd';
const TreeNode = TreeSelect.TreeNode;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_CHILD = TreeSelect.SHOW_CHILD
@connect(state => ({
  dictionary: state.dictionary,
}))
export default class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value;
    this.state = {
      selectValue: value === undefined ? undefined : (value + '').split(',')
    };
  }
  componentDidMount() {
    const { dispatch, dictionaryKey, fetchUrl } = this.props;
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
      if ('value' in nextProps) {
        const value = nextProps.value;
        this.setState({ selectValue: value === undefined ? undefined : (value + '').split(',') });
      }
    }
  }
  handleChange = (selectValue) => {
    
    // console.log('label',label);
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    this.triggerChange(selectValue);
  }
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    logs('changedValue', changedValue);
    if (onChange) {
      onChange(changedValue);
    }
  }
  renderNodeDisabledSelectable = (menuType = 0) => {
    const { extraProp: { selectMenuTypeValue = 0 } } = this.props;
    const obj = {};
    switch (selectMenuTypeValue) {
      case 1:
      case 2:
        if (menuType === 1) {
          Object.assign(obj, {
            disabled: false,
            selectable: true
          });
        } else {
          Object.assign(obj, {
            disabled: true,
            selectable: false
          });
        }
        break;
      case 4:
        if (menuType === 1) {
          Object.assign(obj, {
            disabled: false,
            selectable: false
          });
        }
        if (menuType === 2) {
          Object.assign(obj, {
            disabled: false,
            selectable: true
          });
        }
        if (menuType === 4) {
          Object.assign(obj, {
            disabled: true,
            selectable: false
          });
        }
        break;
      default:
        Object.assign(obj, {
          disabled: false,
          selectable: true
        });
        break;
    }
    return obj;
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      let iconType = null;
      const menutype = item.menutype;
      const { disabled, selectable } = this.renderNodeDisabledSelectable(menutype);
      if (menutype === 1) {
        iconType = (<span><Tag color="#f50">目录</Tag>{item.value}</span>)
      } else if (menutype === 2) {
        iconType = (<span><Tag color="#2db7f5">菜单</Tag>{item.value}</span>)
      } else if (menutype === 3) {
        iconType = (<span><Tag color="#87d068">列表</Tag>{item.value}</span>)
      }else if (menutype === 4) {
        iconType = (<span><Tag color="#108ee9">按钮</Tag>{item.value}</span>)
      }  else {
        iconType = item.value;
      }
      if (item.children&&item.children.length>0) {
        return (
          <TreeNode title={iconType} value={item.key + ''} key={item.key} dataRef={item} disabled={disabled} selectable={selectable} >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={iconType} value={item.key + ''} key={item.key} dataRef={item} disabled={disabled} selectable={selectable} />;
    });
  }
  render() {
    const state = this.state;
    const { dictionary = {}, dictionaryKey, placeholder, popupContainer, disabled, multiple, showCheckedStrategy } = this.props;
    let len = dictionary[dictionaryKey] && dictionary[dictionaryKey].length;
    return (
      <TreeSelect
        value={state.selectValue}
        // treeCheckStrictly={true}
        treeCheckable={multiple}
        placeholder={placeholder}
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        onChange={this.handleChange}
        disabled={disabled}
        showCheckedStrategy={showCheckedStrategy ? SHOW_PARENT : SHOW_CHILD}
      >
        {
          len > 0 && this.renderTreeNodes(dictionary[dictionaryKey])
        }
      </TreeSelect>

    );
  }
}



