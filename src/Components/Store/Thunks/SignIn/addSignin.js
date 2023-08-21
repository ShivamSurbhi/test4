import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addSignin = createAsyncThunk("user", async (payload) => {
  let response = await axios.post("api/signin", payload);
  return response.data ? response.data : response;
});

export { addSignin };
