import request from 'core/utils/request';

export async function accountLogin(params, url) {
  return request(url, {
    method: 'POST',
    body: params,
  });
}

export async function accountLoginOut(url) {
  return request(url);
}
