import request from '../utils/request';

export async function query(params) {
  const { fetchUrl } = params;
  delete params.fetchUrl; // eslint-disable-line
  return request(`${fetchUrl}`);
}
