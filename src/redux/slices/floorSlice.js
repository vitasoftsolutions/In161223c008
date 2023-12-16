import { createSlice } from "@reduxjs/toolkit";
import { createFloor, deleteFloor, fetchFloor, fetchFloors, searchFloor, sortByAZFloor, sortByDateFloor, updateFloor } from "../Actions/FloorsAction";
import {
  createLoanBen,
  deleteLoanBeneficiary,
  fetchLoanBene,
  fetchLoanBeneList,
  searchLoanBeneficiaries,
  sortByAZLoanBen,
  sortByDateLoanBen,
  updateLoanBeneficiary,
} from "../Actions/loanBenAction";

const floorSlice = createSlice({
  name: "floorSlice",
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
      // Fetch LoanBen list
      .addCase(fetchFloors.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchFloors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchFloors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch LoanBen
      .addCase(fetchFloor.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create loan
      .addCase(createFloor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Update loan
      .addCase(updateFloor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete loan
      .addCase(deleteFloor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search by name
      .addCase(searchFloor.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // sort by date
      .addCase(sortByDateFloor.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByDateFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByDateFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(sortByAZFloor.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByAZFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByAZFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default floorSlice.reducer;
