import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchSignin = createAsyncThunk("user", async (payload) => {
  let response = await axios.get("api/users");
  let checkData = response.data.filter(
    (v) => v.email == payload.email && v.password == payload.password
  );
  return checkData.length > 0 ? checkData[0] : "no";
});

export { fetchSignin };
