import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../reducers/formSlice';

export default configureStore({
  reducer: {
    form: formReducer,
  },
});
