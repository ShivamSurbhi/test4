import { createAction,createSlice } from "@reduxjs/toolkit";
import { getSignupThunk } from "../Thunks/SignUp/getSignup";
import { addSignupThunk } from "../Thunks/SignUp/addSignup";
export const userReset = createAction("app/reset");

const SignupSlice = createSlice({
  name: "signup",
  initialState: {
    data: [],
    isLoading: false,
    error: "",
  },
  extraReducers(builder) {

    //  builder.addCase(userReset, (state, action) => {
    //    return [];
    //  });
    
    // Get Request
    // builder.addCase(getSignupThunk.pending, (state, action) => {
    //   state.isLoading = true;
    // });

    // builder.addCase(getSignupThunk.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data.push(action.payload);
    // });

    // builder.addCase(getSignupThunk.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
    // Get Request

    // Post Request
    // builder.addCase(addSignupThunk.pending, (state, action) => {
    //   state.isLoading = true;
    // });

    // builder.addCase(addSignupThunk.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data.push(action.payload);
    // });

    // builder.addCase(addSignupThunk.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
    // Post Request
  },
});
// export const SignupReducer = SignupSlice;
export const SignupReducer = SignupSlice.reducer;
