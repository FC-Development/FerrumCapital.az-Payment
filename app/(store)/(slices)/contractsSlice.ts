import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
const initialState: any = {
  data: {
    contracts: {
      currentDebtAmount: null,
      documentNumber: '',
      totalDebtAmount: null,
    },
    fullName: '',
    pinCode: '',
  },
};

// Create the contracts slice using createSlice
const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    // Define the setContracts action
    setContractsData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

// Export the action creator a

// Export the action creator and reducer
export const { setContractsData } = contractsSlice.actions;
export default contractsSlice.reducer;
