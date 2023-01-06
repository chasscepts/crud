import axios from 'axios';

const normalizeError = (err) => {
  if (!err) {
    return { message: 'An unknown error encountered. Please try again.' };
  }
  if (err.response) {
    return { message: err.response.data.message || JSON.stringify(err.response.data) };
  }
  if (err.request) {
    return { message: 'Server is not responding. This may be due to network connectivity or CORS may be disabled on server. Check your console for more details' };
  }
  if (err.message) {
    return { message: err.message };
  }
  if (typeof err === 'string') {
    return { message: err };
  }
  return { message: 'An unknown error encountered. Please try again.' };
};

const instantiate = (headers = null) => {
  const config = { responseType: 'json' };
  if (headers) config.headers = headers;
  return axios.create(config);
};

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @returns Promise that resolves to fetched data when request is successful
 * and rejects with error when request fails
 */
export const get = (path, headers = null) => new Promise((resolve, reject) => {
  instantiate(headers).get(path)
    .then(({ headers, data }) => resolve({ headers, body: data }))
    .catch((err) => reject(normalizeError(err)));
});

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @param {{ string: any }} data sent in body of this post
 * @returns Promise that resolves to fetched data when request is successful
 * and rejects with error when request fails
 */
export const post = (path, data, headers = null) => new Promise((resolve, reject) => {
  instantiate(headers).post(path, data)
    .then(({ headers, data }) => resolve({ headers, body: data }))
    .catch((err) => reject(normalizeError(err)));
});

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @param {{ string: any }} data sent in body of this put
 * @returns Promise that resolves when request is successful
 * and rejects with error when request fails
 */
export const put = (path, data, headers = null) => new Promise((resolve, reject) => {
  instantiate(headers).put(path, data)
    .then(({ headers, data }) => resolve({ headers, body: data }))
    .catch((err) => reject(normalizeError(err)));
});

/**
 * @param {axios} instance An instance of axios to use for this request
 * @param {string} path relative url
 * @returns Promise that resolves if resource is successfully deleted
 * and rejects with error when request fails
 */
export const destroy = (path, headers = null) => new Promise((resolve, reject) => {
  instantiate(headers).delete(path)
    .then(({ headers, data }) => resolve({ headers, body: data }))
    .catch((err) => reject(normalizeError(err)));
});
