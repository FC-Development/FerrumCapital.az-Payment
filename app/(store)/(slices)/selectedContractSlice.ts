import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
const initialState: any = {
  contract: {
    currentDebtAmount: null,
    documentNumber: '',
    totalDebtAmount: null,
  },
};

// Create the contracts slice using createSlice
const selectedContractSlice = createSlice({
  name: 'selectedContract',
  initialState,
  reducers: {
    // Define the setContracts action
    setSelectedContract: (state, action: PayloadAction<any>) => {
      state.contract = action.payload;
    },
  },
});

// Export the action creator and reducer
export const { setSelectedContract } = selectedContractSlice.actions;
export default selectedContractSlice.reducer;
