import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './ModeSlice.js';

const store = configureStore({
    reducer: {
        mode: modeReducer,
    },
});

export default store;
