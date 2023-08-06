import { createAction, createSlice } from "@reduxjs/toolkit";
import { fetchSignin } from "../Thunks/SignIn/fetchSignin";
import { addSignin } from "../Thunks/SignIn/addSignin";
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
    // builder.addCase(userReset, (state, action) => {
    //   return [];
    // });
    // Get Request
    builder.addCase(fetchSignin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchSignin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    

    builder.addCase(fetchSignin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // Get Request

    // Post Request

    // builder.addCase(addSignin.pending, (state, action) => {
    //   state.isLoading = true;
    // });

    // builder.addCase(addSignin.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data.push(action.payload);
    // });

    // builder.addCase(addSignin.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });


    // builder.addCase(VerifySigninThunk.pending, (state, action) => {
    //   state.isLoading = true;
    // });

    // builder.addCase(VerifySigninThunk.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data = action.payload;
    // });

    // builder.addCase(VerifySigninThunk.pending, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });


    // Post Request
  },
});

export const SignInReducer = SigninSlice.reducer;
