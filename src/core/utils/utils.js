import config from 'src/config';

const { whiteListPath } = config;

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  routes = routes.map(item => item.replace(path, ''));
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}
export function formatter(data = [], parentPath = '', parentAuthority) {
  // logs('data', data);
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}
export function menuDataPathToArray(menuData) {
  const list = [];
  const exceptionPath = [
    {
      path: '/exception/403',
      name: '403',
      menutype: 2,
    },
    {
      path: '/exception/404',
      name: '404',
      menutype: 2,
    },
    {
      path: '/exception/500',
      name: '500',
      menutype: 2,
    },
  ];
  (function dataFormater(menuDatas) {
    menuDatas.forEach(item => {
      list.push({
        path: `/${item.path}`,
        name: item.name,
        menutype: item.menutype,
      });
      if (item.children) {
        dataFormater(item.children);
      }
    });
  })(menuData);
  // 添加白名单页面访问权限
  return [...list, ...exceptionPath, ...whiteListPath];
}
export function menuAuthority(menuDatas, path) {
  let isAuthority = false;
  const index = menuDatas.findIndex(item => {
    return item.path === path;
  });
  isAuthority = index !== -1;
  return isAuthority;
}
export function formaterObjectValue(obj) {
  const newObj = {};
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return newObj;
  }
  for (const key in obj) {
    // eslint-disable-next-line
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key] === undefined ? '' : obj[key];
    }
  }
  return newObj;
}
export function formItemAddInitValue(formItems, currentItem) {
  if (!currentItem || Object.prototype.toString.call(currentItem) !== '[object Object]') {
    return formItems;
  }
  const newFormItems = [];
  const currItemKeys = Object.keys(currentItem);
  if (currItemKeys.length > 0) {
    formItems.forEach(item => {
      const index = currItemKeys.indexOf(item.key);
      if (index > -1) {
        newFormItems.push(
          Object.assign({}, item, {
            initialValue: currentItem[currItemKeys[index]],
          })
        );
      } else {
        newFormItems.push(item);
      }
    });
  } else {
    formItems.forEach(item => {
      newFormItems.push(item);
    });
  }

  return newFormItems;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}
export function cleanArray(arr) {
  if (!(arr instanceof Array)) {
    arr = []; // eslint-disable-line
  }
  return arr.filter(e => {
    return e !== undefined && e !== null && e !== '';
  });
}
