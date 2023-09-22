import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {}, //here we will be adding our actions
});

// export const {} = cartSlice.actions;

export default cartSlice.reducer;
