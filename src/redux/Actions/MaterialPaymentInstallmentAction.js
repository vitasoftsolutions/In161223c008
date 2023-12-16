import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

//
//
//
// https://erpcons.vitasoftsolutions.com/material-payment/
//
export const createMaterialPaymentInstallment = createAsyncThunk(
  "createMaterialPaymentInstallment",
  async (payload) => {
    console.log(payload, "_____");
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const submittedData = { ...payload, status: true };

      const response = await axios.post(
        `${base_url}/material-payment/`,
        submittedData,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
//
//
//
//
export const fetchMaterialPaymentInstallmentList = createAsyncThunk(
  "fetchMaterialPaymentInstallmentList",
  async (page, { getState }) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    const { perPage } = getState().materialPaymentInstallmentReducer;

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/material-payment/?limit=${perPage}&offset=${
        (page - 1) * perPage
      }`,
      {
        headers,
      }
    );

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    const data = result.data;

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
export const fetchMaterialPaymentInstallmentAllList = createAsyncThunk(
  "fetchMaterialPaymentInstallmentAllList",
  async (payload) => {
    console.log(payload, "payload");
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(`${base_url}/material-payment/`, {
      headers,
    });

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    const data = result.data;
    // Return the data and pagination information
    return {
      data,
    };
  }
);

//
//
//
//
export const fetchMaterialPaymentInstallment = createAsyncThunk(
  "fetchMaterialPaymentInstallment",
  async (id) => {
    console.log("getState()");
    console.log(id, "getState()");

    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");
    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(`${base_url}/material-payment/${id}/`, {
      headers,
    });

    const data = response.data;

    console.log(data, "data__");

    // Return the data
    return { data };
  }
);

//
//
//
//
export const deleteMaterialPaymentInstallment = createAsyncThunk(
  "deleteMaterialPaymentInstallment",
  async (payload) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios PUT request with the headers and payload
    const response = await axios.delete(
      `${base_url}/material-payment/${payload}/`,
      { headers }
    );

    // Return the data from the response
    return response.status;
  }
);
//
//
//
//
export const updateMaterialPaymentInstallment = createAsyncThunk(
  "updateMaterialPaymentInstallment",
  async (payload) => {
    console.log(payload, "payload");
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios PUT request with the headers and payload
    const response = await axios.patch(
      `${base_url}/material-payment/${payload.id}/`,
      payload.data,
      { headers }
    );

    // Return the data from the response
    return response.data;
  }
);
//
//
//
//

export const searchMaterialPaymentInstallment = createAsyncThunk(
  "searchMaterialPaymentInstallment",
  async (searchData) => {
    //  https://erpcons.vitasoftsolutions.com/filter/loan/LoanBeneficaries/?data_name=first_name&value=Ifte Samul&data_name=last_name&value=ohy&serializer_class=LoanBeneficariesSerializer&start_date=2023-12-07&end_date=2023-12-31
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");
      // Get Form Data From Searched Data
      const formData = searchData.formData;
      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/filter/${searchData.app_model}`;

      const searchKeys = Object.keys(formData);

      // Check if formData is not empty, then append the search query
      if (searchKeys.length > 0) {
        apiUrl += "?";

        for (let i = 0; i < searchKeys.length; i++) {
          const key = searchKeys[i];
          const value = formData[key];
          apiUrl += `data_name=${key}&value=${value}`;

          // Append '&' if it's not the last key-value pair
          if (i < searchKeys.length - 1) {
            apiUrl += "&";
          }
        }
      }

      // Append the serializer_class parameter if it exists
      if (searchData.serializer_class) {
        apiUrl += `&serializer_class=${searchData.serializer_class}Serializer`;
      }

      // Make the Axios GET request with the headers
      const response = await axios.get(apiUrl, {
        headers,
      });

      const response_token = response.data.token;
      const result = jwtDecode(response_token);

      console.log(result, "result");

      const data = result.data;
      // Return the data
      return data;
    } catch (error) {
      const massage = (error.response && error.response.data) || error.massage;
      return massage;
    }
  }
);

//
//
//
//
export const sortByDateMaterialPaymentInstallment = createAsyncThunk(
  "sortByDateMaterialPaymentInstallment",
  async (date) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/material-payment/`;

      // Check if date is not empty, then append the search query
      if (date) {
        apiUrl += `?created_at=${date}`;
      }

      // Make the Axios GET request with the headers
      const response = await axios.get(apiUrl, {
        headers,
      });

      const response_token = response.data.results.token;
      const result = jwtDecode(response_token);

      const data = result.data;
      // Return the data
      return data;
    } catch (error) {
      const massage = (error.response && error.response.data) || error.massage;
      return massage;
    }
  }
);
//
//
//
//
export const sortByAZMaterialPaymentInstallment = createAsyncThunk(
  "sortByAZMaterialPaymentInstallment",
  async (sortOrder) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/material-payment/`;

      // Check if sortOrder is not empty, then append the search query
      if (sortOrder) {
        apiUrl += `?order=${sortOrder}`;
      }

      // Make the Axios GET request with the headers
      const response = await axios.get(apiUrl, {
        headers,
      });

      const response_token = response.data.results.token;
      const result = jwtDecode(response_token);

      const data = result.data;
      // Return the data
      return data;
    } catch (error) {
      const massage = (error.response && error.response.data) || error.massage;
      return massage;
    }
  }
);
