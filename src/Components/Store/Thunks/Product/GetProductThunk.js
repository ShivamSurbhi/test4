import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GetProductThunk = createAsyncThunk("products", async () => {
    let response = await axios.get("http://127.0.0.1:3002/products");
    return response.data ? response.data : response;
});

export { GetProductThunk };