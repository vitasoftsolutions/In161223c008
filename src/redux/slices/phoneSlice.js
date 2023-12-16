import { createSlice } from "@reduxjs/toolkit";
import {
  createPhone,
  deletePhone,
  fetchPhone,
  fetchPhoneList,
  searchPhoneByName,
  sortByAZPhone,
  sortByDatePhone,
  updatePhone,
} from "../Actions/PhoneAction";

const phoneSlice = createSlice({
  name: "phoneSlice",
  initialState: {
    isLoading: false,
    data: [],
    sData: [],
    isError: false,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalData: 0,
    massage: "",
    isDelete: false,
    isUpdate: false,
    isCreated: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhoneList.pending, (state) => {
        state.sData = [];
        state.isLoading = true;
        state.isCreated = false;
        state.massage = "";
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchPhoneList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = [];
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.isCreated = false;
        state.isError = false;
      })
      .addCase(fetchPhoneList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isError = false;
      })
      // Single data
      .addCase(fetchPhone.pending, (state) => {
        state.isLoading = true;
        state.sData = [];
        state.isCreated = false;
        state.massage = "";
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
      })
      .addCase(fetchPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isError = false;
      })
      // Create
      .addCase(createPhone.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isError = false;
        state.isCreated = true;
      })
      .addCase(createPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.massage = action.error.message;
      })
      // Update phone
      .addCase(updatePhone.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updatePhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updatePhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete
      .addCase(deletePhone.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deletePhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isDelete = true;
      })
      .addCase(deletePhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search Phone By Name
      .addCase(searchPhoneByName.pending, (state) => {
        state.isLoading = true;
        // Clear previous data when a search is initiated
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchPhoneByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchPhoneByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Sort by date
      .addCase(sortByDatePhone.pending, (state) => {
        state.isLoading = true;
        // Clear previous data when a search is initiated
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByDatePhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByDatePhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Sort by A-Z
      .addCase(sortByAZPhone.pending, (state) => {
        state.isLoading = true;
        // Clear previous data when a search is initiated
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByAZPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByAZPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default phoneSlice.reducer;
