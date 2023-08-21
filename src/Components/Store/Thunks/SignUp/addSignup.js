import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addSignupThunk = createAsyncThunk("signup", async (payload) => {
  let response = axios.post("api/signup", payload);
  return response.data ? response.data : response;
});

export { addSignupThunk };
