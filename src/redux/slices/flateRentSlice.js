import { createSlice } from "@reduxjs/toolkit";
import {
  createFlateRent,
  deleteFlateRent,
  fetchFlateRent,
  fetchFlateRentAllList,
  fetchFlateRentList,
  searchFlateRent,
  sortByAZFlateRent,
  sortByDateFlateRent,
  updateFlateRent,
} from "../Actions/FlateRentAction";

const flateRentSlice = createSlice({
  name: "createFlateRentSlice",
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
      // Fetch FlateRent all list
      .addCase(fetchFlateRentAllList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchFlateRentAllList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchFlateRentAllList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch FlateRent list
      .addCase(fetchFlateRentList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchFlateRentList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchFlateRentList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch s FlateRent
      .addCase(fetchFlateRent.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchFlateRent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchFlateRent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create FlateRent
      .addCase(createFlateRent.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createFlateRent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createFlateRent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Update FlateRent
      .addCase(updateFlateRent.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateFlateRent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateFlateRent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete FlateRent
      .addCase(deleteFlateRent.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteFlateRent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteFlateRent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search by name
      .addCase(searchFlateRent.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchFlateRent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchFlateRent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // sort by date
      .addCase(sortByDateFlateRent.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByDateFlateRent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByDateFlateRent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(sortByAZFlateRent.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByAZFlateRent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByAZFlateRent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default flateRentSlice.reducer;
