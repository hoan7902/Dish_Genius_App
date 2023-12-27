import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: { userId: null },
  reducers: {
    setUserId: (state, { payload }) => {
      state.userId = payload.userId;
    }
  },
});

export const { setUserId } = slice.actions;

export const userReducer = slice.reducer;
