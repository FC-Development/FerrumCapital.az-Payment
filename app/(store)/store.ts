import { configureStore } from '@reduxjs/toolkit';
import searchContractsSlice from './(slices)/searchContractsSlice';
import contractsSlice from './(slices)/contractsSlice';
import selectedContractSlice from './(slices)/selectedContractSlice';

const store = configureStore({
  reducer: {
    searchContract: searchContractsSlice,
    contracts: contractsSlice,
    selectedContract: selectedContractSlice,
  },
});

export default store;
