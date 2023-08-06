import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addSignupThunk = createAsyncThunk("signup", async (payload) => {
    let response = axios.post("http://127.0.0.1:3002/users", payload);
    return response.data ? response.data : response;
});

export {addSignupThunk}