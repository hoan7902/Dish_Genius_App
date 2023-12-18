import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: { theme: null, darkMode: null, listFood: null },
  reducers: {
    setListFood: (state, { payload: listFood }) => {
      state.listFood = listFood;
    }
  },
});

export const { setListFood } = slice.actions;

export const homeReducers = slice.reducer;
