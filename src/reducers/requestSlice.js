import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* eslint-disable no-param-reassign */
const requestSlice = createSlice({
  name: 'request',
  initialState: {
    hasPendingRequests: false,
    count: 0,
    error: null,
    responseBody: null,
    responseHeader: { name: 'Francis' },
  },
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
      state.hasPendingRequest = true;
    },
    setResponse: (state, action) => {
      const response = action.payload;
      state.responseHeader = response.header;
      if (response.error) {
        state.error = response.error;
        state.responseBody = null;
      } else {
        state.responseBody = response.body;
        state.error = null;
      }

      if (state.count === 0) {
        return;
      }
      state.count -= 1;
      if (state.count === 0) {
        state.hasPendingRequest = false;
      }
    },
  },
});
/* eslint-enable no-param-reassign */

export const { incrementCount, setResponse } = requestSlice.actions;

export const fetchAsync = (url, method) => (dispatch, getState) => {
  const state = getState();
  const methodLowerCase = method.toLowerCase();
  dispatch(incrementCount());
  const config = {
    url,
    method: methodLowerCase,
    responseType: 'json',
  };

  if (methodLowerCase !== 'get') {
    config.data = state.form.fields;
  }

  axios(config)
    .then((res) => {
      dispatch(setResponse({ error: null, header: res.headers, body: res.data }));
    })
    .catch((err) => {
      if (err.toJSON) {
        dispatch(setResponse({ error: err.toJSON(), header: err.response.headers, body: null }));
        return;
      }
      if (typeof err === 'string') {
        dispatch(setResponse({ error: { message: err }, header: null, body: null }));
        return;
      }
      if (!err) {
        dispatch(setResponse({ error: { message: 'Unknown Error' }, header: null, body: null }));
        return;
      }
      if (err.message) {
        dispatch(setResponse({ error: { message: err.message }, header: null, body: null }));
        return;
      }
      dispatch(setResponse({ error: { message: 'Unknown Error' }, header: null, body: null }));
    });
};

export const selectHasPendingRequests = (state) => state.request.hasPendingRequests;

export const selectRequestError = (state) => state.request.error;

export const selectResponseHeader = (state) => state.request.responseHeader;

export const selectResponseBody = (state) => state.request.responseBody;

export default requestSlice.reducer;
