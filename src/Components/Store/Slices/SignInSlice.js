import { createAction, createSlice } from "@reduxjs/toolkit";
import { VerifySigninThunk } from "../Thunks/SignIn/VerifySignin";
export const userReset = createAction("app/reset");

const SigninSlice = createSlice({
  name: "signin",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(userReset, (state, action) => {
      return [];
    });

    builder.addCase(VerifySigninThunk.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(VerifySigninThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(VerifySigninThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      // console.log("action.error", action.error);
    });
  },
});

export const SignInReducer = SigninSlice.reducer;
