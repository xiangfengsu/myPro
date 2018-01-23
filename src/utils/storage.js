import { encodeHandle, decodeHandle } from './base64.js';
const storage = {
    save({ type = 'localStorage', key, data, value }) {
        try {
            // data 以小时为单位 默认 24h
            const keys = encodeHandle(key);
            const obj = {
                value,
                time: new Date().getTime(),
                cacheTime: data || 24
            };
            window[type].setItem(keys, JSON.stringify(obj));
        } catch (e) {
            console.error('storageSaveError', e)
        }
    },
    load({ type = 'localStorage', key, resolve, reject }) {
        const _self = this;
        try {
            const keys = encodeHandle(key);
            const obj = JSON.parse(window[type].getItem(keys));

            if (obj) {
                const { value, time, cacheTime } = obj;
                if (type === 'localStorage') {
                    const currTime = ((new Date().getTime() - time) / 1000 / 3600).toFixed(0);
                    if (currTime >= cacheTime) {
                        _self.remove(type, key);
                    }
                }
                resolve && resolve(value)
            } else {
                reject && reject();
            }

        } catch (e) {
            console.error('storageLoadError', e)
        }
    },
    remove(type = 'localStorage', key) {
        try {
            const keys = encodeHandle(key);
            window[type].removeItem(keys);
        } catch (e) {
            console.error('storageRemoveError', e)
        }
    },
    clear(type = 'localStorage') {
        try {

            window[type].clear();
        } catch (e) {
            console.error('storageClearError', e)
        }
    }

}
export default storage;