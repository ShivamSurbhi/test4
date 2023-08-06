import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addSignin = createAsyncThunk("user", async (payload) => {
    let response = await axios.post("http://127.0.0.1:3002/users", payload);
    return response.data ? response.data : response;
})

export { addSignin };