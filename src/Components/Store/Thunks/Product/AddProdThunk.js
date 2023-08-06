import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AddProdThunk = createAsyncThunk("product", async (payload) => {
  let response = await axios.post(
    process.env.REACT_APP_API_URL + "products",
    payload
  );
  return response.data ? response.data : response;
});

export default AddProdThunk;