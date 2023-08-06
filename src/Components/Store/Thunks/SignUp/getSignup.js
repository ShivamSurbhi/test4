import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSignupThunk = createAsyncThunk("signup", async (payload) => {
  let response = axios.get("http://127.0.0.1:3002/users");
  return response.data ? response.data : response;
});

export { getSignupThunk };
