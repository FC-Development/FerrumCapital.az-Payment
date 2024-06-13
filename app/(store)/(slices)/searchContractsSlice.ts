import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  fields: {
    birthDate: null,
    finCode: '',
  },
};

const searchSlice: any = createSlice({
  name: 'searchContract',
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ key: keyof any; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setField } = searchSlice.actions;

export default searchSlice.reducer;
