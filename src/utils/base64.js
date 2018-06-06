const Base64 = require("js-base64").Base64; // eslint-disable-line

export function encodeHandle(params) {
  return Base64.encode(params);
}
export function decodeHandle(params) {
  return Base64.decode(params);
}
