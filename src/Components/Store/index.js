import { configureStore } from "@reduxjs/toolkit";
import { SignInReducer } from "./Slices/SignInSlice";
import { SignupReducer } from "./Slices/SignUpSlice";
import { ProductSliceReducer } from "./Slices/ProductSlice";

const StoreConfig = configureStore({
  reducer: {
    signin: SignInReducer,
    product: ProductSliceReducer,
    sigup: SignupReducer,
  },
});

    // 
export { StoreConfig };

export * from "./Thunks/SignIn/addSignin";
export * from "./Thunks/SignIn/fetchSignin";
export * from "./Thunks/SignUp/addSignup";
export * from "./Thunks/SignUp/getSignup";
export * from "./Thunks/Product/AddProdThunk";
export * from "./Thunks/Product/GetProductThunk";
export * from "./Thunks/SignIn/VerifySignin";
