import { configureStore } from '@reduxjs/toolkit';
import searchContractsSlice from './(slices)/searchContractsSlice';

const store = configureStore({
  reducer: {
    searchContract: searchContractsSlice,
  },
});

export default store;
