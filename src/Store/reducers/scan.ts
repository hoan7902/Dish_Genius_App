import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: { 
    listScanFood: [],
    listScanIngredients: null, 
    query: null,
    // listFavouriteIds: null,
    isFetchingScanData: false,
  },
  reducers: {
    setQuery: (state, { payload }) => {
      state.query = payload.query;
    },
    setListScanFood: (state, { payload }) => {
      state.listScanFood = payload.listFood;
    },
    addListScanFood: (state, { payload }) => {
      state.listScanFood = [...state.listScanFood, ...payload.listFood];
    },
    setScanIngredients: (state, { payload }) => {
      state.listScanIngredients = payload.listScanIngredients;
    },
    setIsFetchingScanData: (state, { payload }) => {
      state.isFetchingScanData = payload.isFetchingData;
    }
  },
});

export const { setListScanFood,setScanIngredients, setIsFetchingScanData,addListScanFood, setQuery } = slice.actions;

export const scanReducer = slice.reducer;
