import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VerifySigninThunk = createAsyncThunk("user", async (payload) => {
  let response = await axios.get(process.env.REACT_APP_API_URL + "users");
  return response.data;
});

export { VerifySigninThunk };