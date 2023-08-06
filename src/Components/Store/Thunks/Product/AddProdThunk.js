import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AddProdThunk = createAsyncThunk("product", async (payload) => {
  let response = await axios.post("api/products",
    payload
  );
  return response.data ? response.data : response;
});

export default AddProdThunk;