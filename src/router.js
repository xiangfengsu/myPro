import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// import UserLayout from 'core/layouts/UserLayout';
// import BasicLayout from 'core/layouts/BasicLayout';
import { getRouterData } from 'core/common/router';
import Authorized from 'core/utils/Authorized';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
// dynamic.setDefaultLoadingComponent(() => {
//   return <Spin size="large" className={styles.globalSpin} />;
// });
// eslint-disable-next-line
const checkAuthority = () => {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={() => true}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
