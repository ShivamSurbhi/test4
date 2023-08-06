import { createSlice } from "@reduxjs/toolkit";
import AddProdThunk from "../Thunks/Product/AddProdThunk";
import { GetProductThunk } from "../Thunks/Product/GetProductThunk";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    isLoading: true,
    error: "",
  },
  extraReducers(builder) {
    // Get Product
    
    builder.addCase(GetProductThunk.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(GetProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
     });
    
    builder.addCase(GetProductThunk.rejected, (state, action) => { 
      state.isLoading = false;
      state.error = action.error;
    });
    

    // Get Product


    // Add Product
    builder.addCase(AddProdThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AddProdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(AddProdThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // Add Product
  },
});

export const ProductSliceReducer = ProductSlice.reducer;
