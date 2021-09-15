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
    responseHeader: null,
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

const corsMsg = 'No response was received. Please check your browser console to see if CORS is disabled on the server.';

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
      if (!err) {
        dispatch(setResponse({ error: { message: 'Unknown Error' }, header: null, body: null }));
        return;
      }
      if (err.response) {
        const { status, headers, data } = err.response;
        dispatch(setResponse({ error: { status, data }, header: headers, body: null }));
        return;
      }
      if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
        dispatch(setResponse({ error: { message: corsMsg }, header: null, body: null }));
        return;
      }
      if (err.message) {
        dispatch(setResponse({ error: { message: err.message }, header: null, body: null }));
        return;
      }
      if (typeof err === 'string') {
        dispatch(setResponse({ error: { message: err }, header: null, body: null }));
        return;
      }
      dispatch(setResponse({ error: { message: 'Unknown Error' }, header: null, body: null }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectHasPendingRequests = (state) => state.request.hasPendingRequests;

export const selectRequestError = (state) => state.request.error;

export const selectResponseHeader = (state) => state.request.responseHeader;

export const selectResponseBody = (state) => state.request.responseBody;

export default requestSlice.reducer;
