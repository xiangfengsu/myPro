import React, { PureComponent } from 'react';
import { Tree, Card, Tag } from 'antd';

const { TreeNode } = Tree;

export default class Index extends PureComponent {
  state = {
    selectedNode: [],
  };
  componentDidMount() {
    const { parentId, parentName } = this.props;
    const selectedNode = [];
    if (parentId !== undefined && parentName !== undefined) {
      selectedNode.push({
        key: `${parentId}`,
        title: parentName,
      });
    }
    /* eslint-disable-next-line */
    this.setState({
      selectedNode,
    });
  }
  onSelect = (selectedKeys, info) => {
    const { selected, selectedNodes } = info;
    // console.log('selected', selectedKeys, info);
    const selectedNode = [];
    if (selected) {
      // logs(typeof selectedNodes[0].props.dataRef.value);
      selectedNode.push({
        key: selectedKeys[0],
        title: selectedNodes[0].props.dataRef.value,
      });
    }
    this.setState({
      selectedNode,
    });
  };

  onCheck = () => {
    // console.log('onCheck', checkedKeys, info);
  };
  getSelectedKey = () => {
    const { selectedNode } = this.state;
    return selectedNode;
  };
  renderNodeDisabledSelectable = (menuType) => {
    const { selectMenuTypeValue, currentItem } = this.props;
    const selectType = currentItem.menutype
      ? currentItem.menutype
      : selectMenuTypeValue;
    const obj = {};
    // console.log('selectType', selectType);
    switch (selectType) {
      case 1:
      case 2:
        if (menuType === 1) {
          Object.assign(obj, {
            disabled: false,
            selectable: true,
          });
        } else {
          Object.assign(obj, {
            disabled: true,
            selectable: false,
          });
        }
        break;
      case 3:
      default:
        if (menuType === 1) {
          Object.assign(obj, {
            disabled: false,
            selectable: false,
          });
        }
        if (menuType === 2) {
          Object.assign(obj, {
            disabled: false,
            selectable: true,
          });
        }
        if (menuType === 3) {
          Object.assign(obj, {
            disabled: true,
            selectable: false,
          });
        }
        break;
    }
    return obj;
  };
  renderTreeNodes = (data) => {
    return data.map((item) => {
      const { disabled, selectable } = this.renderNodeDisabledSelectable(
        item.menuType
      );
      let iconType = null;
      if (item.menuType === 1) {
        iconType = (
          <span>
            <Tag color="#f50">目录</Tag>
            {item.value}
          </span>
        );
      } else if (item.menuType === 2) {
        iconType = (
          <span>
            <Tag color="#2db7f5">菜单</Tag>
            {item.value}
          </span>
        );
      } else if (item.menuType === 4) {
        iconType = (
          <span>
            <Tag color="#108ee9">按钮</Tag>
            {item.value}
          </span>
        );
      } else {
        iconType = item.value;
      }
      if (item.children) {
        return (
          <TreeNode
            title={iconType}
            key={item.key}
            dataRef={item}
            disabled={disabled}
            selectable={selectable}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={iconType}
          key={item.key}
          dataRef={item}
          disabled={disabled}
          selectable={selectable}
        />
      );
    });
  };
  render() {
    const { parentId, treeNodes = [] } = this.props;
    const len = treeNodes.length;
    return (
      <Card bordered={false} loading={len === 0}>
        {len > 0 ? (
          <Tree
            // showLine
            // checkable
            // checkStrictly
            onSelect={this.onSelect}
            onCheck={this.onCheck}
            defaultExpandedKeys={[`${parentId}`]}
            defaultSelectedKeys={[`${parentId}`]}
          >
            {this.renderTreeNodes(treeNodes)}
          </Tree>
        ) : (
          ' '
        )}
      </Card>
    );
  }
}
