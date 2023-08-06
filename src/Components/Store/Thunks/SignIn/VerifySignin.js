import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VerifySigninThunk = createAsyncThunk("user", async (payload) => {
  let response = await axios.get("http://127.0.0.1:3002/users");
  return response.data;
});

export { VerifySigninThunk };