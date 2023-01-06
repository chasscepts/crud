import { createSlice } from '@reduxjs/toolkit';
import {
  get, post, put, destroy,
} from '../services/request';

/* eslint-disable no-param-reassign */
const requestSlice = createSlice({
  name: 'request',
  initialState: {
    hasPendingRequests: false,
    count: 0,
    error: null,
    url: '',
    method: 'GET',
    responseBody: null,
    responseHeader: null,
    requestHeaders: {},
  },
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
      state.hasPendingRequests = true;
    },
    setResponse: (state, { payload: { body, error, headers } }) => {
      state.responseHeader = headers;
      if (error) {
        state.error = error;
        state.responseBody = null;
      } else {
        state.responseBody = body;
        state.error = null;
      }

      let temp = state.count - 1;
      if (temp <= 0) {
        temp = 0;
        state.hasPendingRequests = false;
      }
      state.count = temp;
    },
    addHeader: (state, action) => {
      const { key, value } = action.payload;
      state.requestHeaders[key] = value;
    },
    removeHeader: (state, { payload }) => {
      delete state.requestHeaders[payload];
    },
    clearHeaders: (state) => {
      state.requestHeaders = {};
    },
    setMethod: (state, { payload }) => {
      state.method = payload;
    },
    setUrl: (state, { payload }) => {
      state.url = payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  incrementCount,
  setResponse,
  addHeader,
  removeHeader,
  clearHeaders,
  setMethod,
  setUrl,
} = requestSlice.actions;

export const fetchAsync = (url, method) => (dispatch, getState) => {
  const state = getState();
  dispatch(incrementCount());
  dispatch(setMethod(method));
  dispatch(setUrl(url));

  let headers = null;

  if (Object.keys(state.request.requestHeaders).length > 0) {
    headers = state.request.requestHeaders;
  }

  let fetcher;
  switch (method.toLowerCase()) {
    case 'post':
      fetcher = post(url, state.form.fields, headers);
      break;
    case 'update':
      fetcher = put(url, state.form.fields, headers);
      break;
    case 'delete':
      fetcher = destroy(url, headers);
      break;
    default:
      fetcher = get(url, headers);
  }

  fetcher
    .then(({ headers, body }) => dispatch(setResponse({ error: null, headers, body })))
    .catch((error) => dispatch(setResponse({ headers: null, error, body: null })));
};

export const selectHasPendingRequests = (state) => state.request.hasPendingRequests;

export const selectRequestError = (state) => state.request.error;

export const selectResponseHeader = (state) => state.request.responseHeader;

export const selectResponseBody = (state) => state.request.responseBody;

export const selectRequestHeaders = (state) => state.request.requestHeaders;

export const selectUrl = (state) => state.request.url;

export const selectMethod = (state) => state.request.method;

export default requestSlice.reducer;
