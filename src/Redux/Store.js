import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './ModeSlice.js';

export default configureStore({
  reducer: {
    mode: modeReducer,
  },
});