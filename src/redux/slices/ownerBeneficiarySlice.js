import { createSlice } from "@reduxjs/toolkit";
import {
  createOwner,
  deleteOwner,
  fetchOwner,
  fetchOwnerAction,
  updateOwner,
} from "../Actions/ownerBenAction";
import {
  searchPhoneByName,
  sortByAZPhone,
  sortByDatePhone,
} from "../Actions/PhoneAction";

const ownerBeneficiarySlice = createSlice({
  name: "ownerBeneficiarySlice",
  initialState: {
    isLoading: false,
    data: [],
    sData: [],
    isError: false,
    currentPage: 1,
    totalPages: 1,
    perPage: 5,
    totalData: 0,
    massage: "",
    isDelete: false,
    isUpdate: false,
    isCreated: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerAction.pending, (state) => {
        state.isLoading = true;
        state.massage = "";
        state.isCreated = false;
        state.sData = [];
      })
      .addCase(fetchOwnerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.isUpdate = false;
        state.isCreated = false;
      })
      .addCase(fetchOwnerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // S Data
      .addCase(fetchOwner.pending, (state) => {
        state.isLoading = true;
        state.massage = "";
        state.isCreated = false;
        state.sData = [];
      })
      .addCase(fetchOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isUpdate = false;
        state.isCreated = false;
      })
      .addCase(fetchOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create Employee
      .addCase(createOwner.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Delete Employee
      .addCase(deleteOwner.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isDelete = true;
      })
      .addCase(deleteOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })

      // update Owner
      .addCase(updateOwner.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
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

export default ownerBeneficiarySlice.reducer;
