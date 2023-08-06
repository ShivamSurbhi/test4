import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AddProdThunk = createAsyncThunk("product", async (payload) => {
  let response = await axios.post("http://127.0.0.1:3002/products", payload);
  return response.data ? response.data : response;
});

export default AddProdThunk;