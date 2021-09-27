import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../reducers/formSlice';
import requestReducer from '../reducers/requestSlice';

export default configureStore({
  reducer: {
    form: formReducer,
    request: requestReducer,
  },
});
