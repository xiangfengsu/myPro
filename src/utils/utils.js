import moment from 'moment';
import config from '../config';

// logs('config', config);
const { whiteListPath } = config;
export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay; // eslint-disable-line

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]; // eslint-disable-line
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(
        moment(
          `${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`
        ).valueOf() - 1000
      ),
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    // eslint-disable-next-line
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(
      /零./,
      ''
    );
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn("Two path are equal!"); // eslint-disable-line
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
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(
      route => route !== item && getRelation(route, item) === 1
    );
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
  return data.map((item) => {
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
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}
export function menuDataPathFormater(menuData) {
  const list = [];
  const exceptionPath = ['/exception/403', '/exception/404', '/exception/500'];
  (function dataFormater(menuDatas) {
    menuDatas.forEach((item) => {
      list.push(`/${item.path}`);
      if (item.children) {
        dataFormater(item.children);
      }
    });
  }(menuData));
  // 添加白名单页面访问权限
  const newWhiteListPath = whiteListPath.map((info) => {
    return info.path;
  });
  list.push(...newWhiteListPath);
  return [...list, ...exceptionPath];
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
  (function dataFormater(menuDatas, parentPath = '/') {
    menuDatas.forEach((item) => {
      list.push({
        path: `${parentPath}${item.path}`,
        name: item.name,
        menutype: item.menutype,
      });
      if (item.children) {
        dataFormater(item.children, `/${item.path}/`);
      }
    });
  }(menuData));
  // 添加白名单页面访问权限
  return [...list, ...exceptionPath, ...whiteListPath];
}
export function menuAuthority(menuDatas, path) {
  // logs('menuDatas', menuDatas);
  let isAuthority = true;
  // logs('len', menuDatas.length);
  if (menuDatas.length > 4) {
    isAuthority = menuDatas.indexOf(path) !== -1;
  }
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
  if (
    !currentItem ||
    Object.prototype.toString.call(currentItem) !== '[object Object]'
  ) {
    return formItems;
  }
  const newFormItems = [];
  const currItemKeys = Object.keys(currentItem);
  if (currItemKeys.length > 0) {
    formItems.forEach((item) => {
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
    formItems.forEach((item) => {
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
  return arr.filter((e) => {
    return e !== undefined && e !== null && e !== '';
  });
}
