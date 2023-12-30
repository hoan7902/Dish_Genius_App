import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: { 
    listScanFood: [],
    ingredientsAndTypes:{},
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
    setListScanIngredientsAndTypes: (state, { payload }) => {
      state.ingredientsAndTypes = payload.ingredientsAndTypes;
    },
    addListScanFood: (state, { payload }) => {
      state.listScanFood = [...state.listScanFood, ...payload.listFood];
    },
    setScanIngredients: (state, { payload }) => {
      state.listScanIngredients = payload.listScanIngredients;
    },
    deleteScanIngredient: (state, {payload}) => {
      const ingredientToRemove = payload.item; // Phần tử cần xóa từ mảng
      state.listScanIngredients = state.listScanIngredients?.filter(
        ingredient => ingredient !== ingredientToRemove
      );
    },
    setIsFetchingScanData: (state, { payload }) => {
      state.isFetchingScanData = payload.isFetchingData;
    }
  },
});

export const { setListScanFood,setScanIngredients, setIsFetchingScanData,addListScanFood, setListScanIngredientsAndTypes, setQuery, deleteScanIngredient } = slice.actions;

export const scanReducer = slice.reducer;
