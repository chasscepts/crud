import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
const formSlice = createSlice({
  name: 'form',
  initialState: {
    fields: {},
  },
  reducers: {
    setFormField: (state, action) => {
      state.fields[action.payload.key] = action.payload.value;
    },
    removeFormField: (state, { payload }) => {
      delete state.fields[payload];
    },
    resetForm: (state) => {
      state.fields = {};
    },
  },
});
/* eslint-enable no-param-reassign */

export const { setFormField, removeFormField, resetForm } = formSlice.actions;

export const selectFormFields = (state) => state.form.fields;

export default formSlice.reducer;
