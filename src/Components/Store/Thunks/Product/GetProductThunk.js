import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GetProductThunk = createAsyncThunk("products", async () => {
  let response = await axios.get("api/products");
  return response.data ? response.data : response;
});

export { GetProductThunk };
