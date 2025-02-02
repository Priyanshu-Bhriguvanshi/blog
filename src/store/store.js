import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authslice.js';

export default configureStore({
  reducer: {
    auth: authSlice, 
  },
});
