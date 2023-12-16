import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../Components/shared/Url";

//
//
//
//
//
export const fetchLoanLogs = createAsyncThunk(
  "fetchLoanLogs",
  async (page, { getState }) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    const { perPage } = getState().loanLogsReducer;

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/loan-log/?limit=${perPage}&offset=${
        (page - 1) * perPage
      }`,
      {
        headers,
      }
    );

    const result = response.data.results;
    const data = result;

    const totalData = Math.ceil(response.data.count);
    const totalPages = Math.ceil(totalData / perPage);

    // Return the data and pagination information
    return {
      data,
      currentPage: page,
      totalPages,
      totalData,
    };
  }
);
//
//
//
//