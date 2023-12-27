import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: { theme: null, darkMode: null, listFood: null, listFavouriteIds: null },
  reducers: {
    setListFood: (state, { payload }) => {
      state.listFood = payload.listFood;
    },
    setListFavouriteIds: (state, { payload }) => {
      state.listFavouriteIds = payload.listFavouriteIds;
    },
  },
});

export const { setListFood, setListFavouriteIds } = slice.actions;

export const homeReducer = slice.reducer;
