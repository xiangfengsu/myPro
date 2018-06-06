import { encodeHandle } from './base64.js';

const storage = {
  save({ type = 'localStorage', key, data, value }) {
    try {
      // data 以小时为单位 默认 24h
      const keys = encodeHandle(key);
      const obj = {
        value,
        time: new Date().getTime(),
        cacheTime: data || 24,
      };
      window[type].setItem(keys, JSON.stringify(obj));
    } catch (e) {
      console.error("storageSaveError", e); // eslint-disable-line
    }
  },
  load({ type = 'localStorage', key, resolve, reject }) {
    const self = this;
    try {
      const keys = encodeHandle(key);
      const obj = JSON.parse(window[type].getItem(keys));

      if (obj) {
        const { value, time, cacheTime } = obj;
        if (type === 'localStorage') {
          const currTime = (
            (new Date().getTime() - time) /
            1000 /
            3600
          ).toFixed(0);
          if (currTime >= cacheTime) {
            self.remove(type, key);
          }
        }
        resolve && resolve(value); // eslint-disable-line
      } else {
        reject && reject(); // eslint-disable-line
      }
    } catch (e) {
      console.error("storageLoadError", e); // eslint-disable-line
    }
  },
  remove(type = 'localStorage', key) {
    try {
      const keys = encodeHandle(key);
      window[type].removeItem(keys);
    } catch (e) {
      console.error("storageRemoveError", e); // eslint-disable-line
    }
  },
  clear(type = 'localStorage') {
    try {
      window[type].clear();
    } catch (e) {
      console.error("storageClearError", e); // eslint-disable-line
    }
  },
};
export default storage;
