import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addSignin = createAsyncThunk("user", async (payload) => {
    let response = await axios.post(
      process.env.REACT_APP_API_URL + "users",
      payload
    );
    return response.data ? response.data : response;
})

export { addSignin };