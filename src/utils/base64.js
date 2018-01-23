let Base64 = require('js-base64').Base64;
export function encodeHandle(params) {
	return Base64.encode(params);
}
export function decodeHandle(params) {
	return Base64.decode(params)
}