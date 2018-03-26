import React from "react";
import PropTypes from "prop-types";
import { Layout, Icon, message,Spin } from "antd";
import DocumentTitle from "react-document-title";
import { connect } from "dva";
import { Route, Redirect, Switch, routerRedux } from "dva/router";
import { ContainerQuery } from "react-container-query";
import classNames from "classnames";
import { enquireScreen } from "enquire-js";
import TagsPageOpend from "../components/TagsPageOpend";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import SiderMenu from "../components/SiderMenu";
import NotFound from "../routes/Exception/404";
import {
  getRoutes,
  formatter,
  menuDataPathFormater,
  menuAuthority
} from "../utils/utils";
import Authorized from "../utils/Authorized";
import logo from "../assets/logo.svg";
import config from "../config";
const { Content, Header, Footer } = Layout;
const { AuthorizedRoute } = Authorized;

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200
  }
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object
  };
  state = {
    isMobile
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData
    };
  }
  componentDidMount() {
    enquireScreen(mobile => {
      this.setState({
        isMobile: mobile
      });
    });
    this.props.dispatch({
      type: "user/fetchCurrent"
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = config.title;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${config.title}`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);
    const redirect =
      urlParams.searchParams.get("redirect") || config.defaultRedirectSubMenu;
    // Remove the parameters in the url
    urlParams.searchParams.delete("redirect");
    window.history.pushState(null, "redirect", urlParams.href);
    return redirect;
  };
  getRedirectData = () => {
    /**
     * 根据菜单取得重定向地址.
     */
    const { currentUser } = this.props;
    const redirectData = [];
    const getRedirect = item => {
      if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
          redirectData.push({
            from: `/${item.path}`,
            to: `/${item.children[0].path}`
          });
          item.children.forEach(children => {
            getRedirect(children);
          });
        }
      }
    };
    formatter(
      config.isLocalMenus ? config.localMenus : currentUser["menuData"]
    ).forEach(getRedirect);
    return redirectData;
  };
  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };
  handleNoticeClear = type => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: "global/clearNotices",
      payload: type
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === "triggerError") {
      this.props.dispatch(routerRedux.push("/exception/trigger"));
      return;
    }
    if (key === "logout") {
      this.props.dispatch({
        type: "login/logout"
      });
    }
  };
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: "global/fetchNotices"
      });
    }
  };
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
      isFetched
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const menuDatas = formatter(
      config.isLocalMenus ? config.localMenus : currentUser["menuData"]
    );
    const formaterMenuDatas = menuDataPathFormater(menuDatas);
    // logs('menuDatas', menuDatas);
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          title={config.title}
          defaultCollapsedSubMenu={config.defaultCollapsedSubMenu}
          Authorized={Authorized}
          menuData={menuDatas}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header
            style={{
              padding: 0,
              height: "108px",
              lineHeight: "normal"
            }}
          >
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              collapsed={collapsed}
              isMobile={this.state.isMobile}
              onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
            <TagsPageOpend
              isWheel={this.props.isWheel}
              dispatch={this.props.dispatch}
              menuData={menuDatas}
              pageOpenedList={this.props.pageOpenedList}
              currentPagePath={this.props.currentPagePath}
            />
          </Header>
          <Content style={{ margin: "24px 24px 0", height: "100%" }}>
            <div style={{ minHeight: "calc(100vh - 260px)" }}>
              <Switch>
                {this.getRedirectData().map(item => (
                  <Redirect
                    key={item.from}
                    exact
                    from={item.from}
                    to={item.to}
                  />
                ))}
                {getRoutes(match.path, routerData).map(item => (
                  <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={() =>
                      menuAuthority(formaterMenuDatas, item.path)
                    }
                    redirectPath="/exception/403"
                  />
                ))}
                <Redirect exact from="/" to={bashRedirect} />
                <Route render={NotFound} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2018 {config.title}
                </div>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );
    if (!isFetched) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            paddingTop: 100,
            textAlign: "center"
          }}
        >
          <Spin size="large" />
        </div>
      );
    }
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects["global/fetchNotices"],
  notices: global.notices,
  currentPagePath: global.currentPagePath,
  pageOpenedList: global.pageOpenedList,
  isWheel:global.isWheel,
  isFetched:user.currentUser.menuData
}))(BasicLayout);
