import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

//
//
//
//
//
export const createLoanBen = createAsyncThunk(
  "createLoanBeneficiary",
  async (payload) => {
    // console.log(payload, "_____")
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const submittedData = { ...payload, status: true };

      const response = await axios.post(
        `${base_url}/contructor-guarantor/`,
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
export const fetchLoanBeneList = createAsyncThunk(
  "fetchLoanBeneList",
  async (page, { getState }) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    const { perPage } = getState().loanBeneficiary;

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/contructor-guarantor/?limit=${perPage}&offset=${
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
    console.log("responseddata", data);
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
export const fetchLoanBene = createAsyncThunk("fetchLoanBene", async (id) => {
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
  const response = await axios.get(`${base_url}/contructor-guarantor/${id}/`, {
    headers,
  });

  const data = response.data;

  console.log(data, "data__");

  // Return the data
  return { data };
});

export const contractorben = createAsyncThunk("contractorben", async () => {
  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");
  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the Axios GET request with the headers
  const response = await axios.get(`${base_url}/contructor-beneficaries/`, {
    headers,
  });

  const response_token = response.data.results.token;

  const result = jwtDecode(response_token);

  const data = result.data;

  console.log(data, "data__");

  // Return the data
  return { data };
});

export const projectlist = createAsyncThunk("projectlist", async () => {
  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");
  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the Axios GET request with the headers
  const response = await axios.get(`${base_url}/projects/?data=all`, {
    headers,
  });

  const response_token = response.data.token;

  const result = jwtDecode(response_token);

  const data = result.data;

  console.log(data, "data__");

  //contractor
  const response2 = await axios.get(
    `${base_url}/contructor-beneficaries/?data=all`,
    {
      headers,
    }
  );

  const response_token2 = response2.data.token;

  const result2 = jwtDecode(response_token2);

  const data2 = result2.data;
  console.log("data2: ", data2);
  // Return the data
  return {
    project_data: data,
    con_data: data2,
  };
});
//
//
//
//
export const deleteLoanBeneficiary = createAsyncThunk(
  "deleteLoanBeneficiary",
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
      `${base_url}/contructor-guarantor/${payload}/`,
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
export const updateLoanBeneficiary = createAsyncThunk(
  "updateLoanBeneficiary",
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
      `${base_url}/contructor-guarantor/${payload.id}/`,
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
export const searchLoanBeneficiaries = createAsyncThunk(
  "searchLoanBeneficiaries",
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

      console.log(searchData.serializer_class, "searchData.serializer_class");

      if (searchData.serializer_class) {
        console.log("first____clicked");
        apiUrl += `&serializer_class=${searchData?.serializer_class}Serializer`;
      } 

      if (!searchData.serializer_class) {
        console.log('first')
        apiUrl += "&serializer_class=model_nameSerializer"
      }

      console.log(apiUrl, "apiUrlapiUrlapiUrl");

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
export const sortByDateLoanBen = createAsyncThunk(
  "sortByDateLoanBen",
  async (date) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/contructor-guarantor/`;

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
export const sortByAZLoanBen = createAsyncThunk(
  "sortByAZLoanBen",
  async (sortOrder) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/contructor-guarantor/`;

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
