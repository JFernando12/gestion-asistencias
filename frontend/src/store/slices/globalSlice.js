import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    mode: 'light',
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setMode } = globalSlice.actions;
