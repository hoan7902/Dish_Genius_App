import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: { 
    theme: null, 
    darkMode: null, 
    listFood: null, 
    listFavouriteIds: null,
    isFetchingData: false,
  },
  reducers: {
    setListFood: (state, { payload }) => {
      state.listFood = payload.listFood;
    },
    setListFavouriteIds: (state, { payload }) => {
      state.listFavouriteIds = payload.listFavouriteIds;
    },
    setIsFetchingData: (state, { payload }) => {
      state.isFetchingData = payload.isFetchingData;
    }
  },
});

export const { setListFood, setListFavouriteIds, setIsFetchingData } = slice.actions;

export const homeReducer = slice.reducer;
