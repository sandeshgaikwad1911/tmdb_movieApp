import { configureStore } from '@reduxjs/toolkit';

import homeReducer from '../features/homeSlice.js';

export const store = configureStore({
  reducer: {
    home: homeReducer
  },
})


/* 
  home: homeReducer
  home key is shown inside redux-devtool

*/