import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSignupThunk = createAsyncThunk("signup", async (payload) => {
  let response = axios.get("api/users");
  return response.data ? response.data : response;
});

export { getSignupThunk };
