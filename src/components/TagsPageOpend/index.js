import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { routerRedux } from 'dva/router';
import { Tag, Menu, Dropdown, Icon, Button } from 'antd';

import styles from './index.less';

const tagStyle = {
  height: '32px',
  lineHeight: '30px',
  padding: '0 12px',
  background: '#fff',
};

export default class TagsPageOpend extends PureComponent {
  state = {
    tagBodyLeft: 0,
  };
  componentDidMount() {
    const { location: { pathname }, menuData } = this.props;
    this.props.dispatch({
      type: 'global/changePageOpenedListGeneral',
      payload: {
        pathname,
        menuData,
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.dispatch({
        type: 'global/changePageOpenedListGeneral',
        payload: {
          pathname: nextProps.location.pathname,
          menuData: nextProps.menuData,
        },
      });
    }
  }
  componentDidUpdate() {
    if (!this.props.isWheel) {
      const { currentPagePath } = this.props;
      const currentTagRef = this.refs[`tagsPageOpened_${currentPagePath}`]; // eslint-disable-line
      const domNode = ReactDOM.findDOMNode(currentTagRef); // eslint-disable-line
      domNode && this.moveToView(domNode); // eslint-disable-line
    }
  }
  linkTo = (item) => {
    const { currentPagePath } = this.props;
    if (currentPagePath === item.path) {
      this.props.dispatch(routerRedux.replace(item.path));
    } else {
      this.props.dispatch(routerRedux.push(item.path));
    }
  };
  tagOnClose = (e, item) => {
    const { pageOpenedList, currentPagePath, dispatch } = this.props;
    let lastPageObj = pageOpenedList[0];
    if (currentPagePath === item.path) {
      const len = pageOpenedList.length;
      /* eslint-disable-next-line */
      for (let i = 1; i < len; i++) {
        if (pageOpenedList[i].path === item.path) {
          if (i < len - 1) {
            lastPageObj = pageOpenedList[i + 1];
          } else {
            lastPageObj = pageOpenedList[i - 1];
          }
          break;
        }
      }
    } else {
      const tagWidth = e.target.parentNode.offsetWidth;
      // console.log('tagWidth',tagWidth);
      this.setState({
        tagBodyLeft: Math.min(this.state.tagBodyLeft + tagWidth, 0),
      });
    }
    dispatch({
      type: 'global/removePageOpenedTag',
      payload: item.path,
    });
    if (currentPagePath === item.path) {
      this.linkTo(lastPageObj);
    }
  };
  tagOptionsHandle = ({ key }) => {
    if (key === 'clearAllTags') {
      this.props.dispatch({
        type: 'global/removeAllPageOpendTags',
      });
      this.linkTo({
        path: '/',
      });
    } else {
      this.props.dispatch({
        type: 'global/removeOtherPageOpendTags',
      });
    }
  };
  handlescroll = (event) => {
    event.stopPropagation();
    this.props.dispatch({
      type: 'global/changeMouseWheelStatus',
    });
    const e = event.nativeEvent;
    const { type } = e;
    let delta = 0;
    if (type === 'DOMMouseScroll' || type === 'wheel') {
      delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
    }
    let left = 0;
    if (delta > 0) {
      left = Math.min(0, this.state.tagBodyLeft + delta);
    } else if (this.scrollCon.offsetWidth - 100 < this.scrollBody.offsetWidth) {
      if (this.state.tagBodyLeft < -(this.scrollBody.offsetWidth - this.scrollCon.offsetWidth + 100)) { // eslint-disable-line
        left = this.state.tagBodyLeft;
      } else {
        left = Math.max(this.state.tagBodyLeft + delta, this.scrollCon.offsetWidth - this.scrollBody.offsetWidth - 100) ;// eslint-disable-line
      }
    } else {
      this.setState({ tagBodyLeft: 0 });
    }
    this.setState({ tagBodyLeft: left });
  };

  moveToView = (tag) => {
    if (tag.offsetLeft < -this.state.tagBodyLeft) {
      // 标签在可视区域左侧
      this.setState({
        tagBodyLeft: -tag.offsetLeft + 10,
      });
    } else if (
      tag.offsetLeft + 10 > -this.state.tagBodyLeft &&
      tag.offsetLeft + tag.offsetWidth <
        -this.state.tagBodyLeft + this.scrollCon.offsetWidth - 100 //eslint-disable-line
    ) {
      // 标签在可视区域
      this.setState({
        tagBodyLeft: Math.min(
          0,
          this.scrollCon.offsetWidth -
            100 -
            tag.offsetWidth -
            tag.offsetLeft -
            20
        ),
      });
    } else {
      // 标签在可视区域右侧
      this.setState({
        tagBodyLeft: -//eslint-disable-line
        (
          tag.offsetLeft - //eslint-disable-line
          (this.scrollCon.offsetWidth - 100 - tag.offsetWidth) + //eslint-disable-line
          20
        ),
      });
    }
  };
  renderTagsList = () => {
    const { currentPagePath = '', pageOpenedList = [] } = this.props;
    return pageOpenedList.map((item, i) => {
      return (
        <Tag
          closable={!(i === 0 && pageOpenedList.length === 1)}
          ref={`tagsPageOpened_${item.path}`}
          name={item.path}
          key={`tag_${item.path}`}
          style={tagStyle}
          onClose={e => this.tagOnClose(e, item)}
        >
          <div
            style={{ display: 'inline-block' }}
            onClick={() => {
              this.linkTo(item);
            }}
          >
            <span
              className={styles.dot}
              style={{
                backgroundColor:
                  item.path === currentPagePath ? '#1890ff' : '#f0f2f5',
              }}
            />
            <span className={styles.tagsText}>{item.name}</span>
          </div>
        </Tag>
      );
    });
  };
  render() {
    const { tagBodyLeft } = this.state;
    const menu = (
      <Menu onClick={this.tagOptionsHandle}>
        <Menu.Item key="clearAllTags">关闭所有</Menu.Item>
        <Menu.Item key="clearOtherTags">关闭其他</Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.tags_con}>
        <div
          className={styles.tags_outer_scroll_con}
          ref={(el) => {
            this.scrollCon = el;
          }}
        >
          <div
            className={styles.tags_inner_scroll_body}
            onWheel={this.handlescroll}
            ref={(el) => {
              this.scrollBody = el;
            }}
            style={{ transform: `translateX(${tagBodyLeft}px)` }}
          >
            {this.renderTagsList()}
          </div>
          <div className={styles.close_all_tag_con}>
            <Dropdown overlay={menu}>
              <Button
                type="primary"
                size="small"
                style={{
                  fontSize: 12,
                }}
              >
                标签选项
                <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
