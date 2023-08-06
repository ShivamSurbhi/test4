import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VerifySigninThunk = createAsyncThunk("user", async (payload) => {
  let response = await axios.get("api/users");
  return response.data;
});

export { VerifySigninThunk };