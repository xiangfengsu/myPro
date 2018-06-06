import React from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import { getRoutes } from '../utils/utils';
import config from '../config';

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let { title } = config;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${config.title}`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <span className={styles.title}>{config.title}</span>
              </div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
