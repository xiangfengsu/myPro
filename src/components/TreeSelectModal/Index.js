import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Tree, Card, Icon, Tag } from "antd";

import styles from "./Index.less";
const TreeNode = Tree.TreeNode;

export default class Index extends PureComponent {
  renderTreeNodes = data => {
    return data.map(item => {
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
      } else if (item.menuType === 3) {
        iconType = (
          <span>
            <Tag color="#87d068">列表</Tag>
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
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode
            title={iconType}
            value={item.key + ""}
            key={item.key}
            dataRef={item}
            disableCheckbox={true}
            selectable={false}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={iconType}
          value={item.key + ""}
          key={item.key}
          dataRef={item}
          disableCheckbox={true}
          selectable={false}
        />
      );
    });
  };

  render() {
    const {
      dictionary: { menuStructure = [] },
      currentItem: { menuids = "" }
    } = this.props;
    const parentdepartmentids = Array.isArray(menuids)
      ? menuids.join(",").split(",")
      : menuids.split(",");
    let len = menuStructure.length;
    console.log("parentdepartmentids", parentdepartmentids);
    return (
      <Card bordered={false} loading={len === 0 ? true : false}>
        {len > 0 ? (
          <div className="menuTreeBox">
            <Tree
              showLine
              checkable
              checkStrictly={true}
              onSelect={this.onSelect}
              defaultExpandedKeys={parentdepartmentids}
              defaultCheckedKeys={parentdepartmentids}
            >
              {this.renderTreeNodes(menuStructure)}
            </Tree>
          </div>
        ) : (
          " "
        )}
      </Card>
    );
  }
}
