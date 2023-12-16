import { createSlice } from "@reduxjs/toolkit";
import {
  searchLoanBeneficiaries,
  sortByAZLoanBen,
  sortByDateLoanBen,
} from "../Actions/loanBenAction";
import {
  createRenterBene,
  deleteRenterBen,
  fetchRenterBene,
  fetchRenterBeneficariesAllList,
  fetchRenterBeneficariesList,
  updateRentBen,
} from "../Actions/RenterBenAction";

const renterBeneficiarySlice = createSlice({
  name: "createRenterBeneficiary",
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
      // Fetch Renter Beneficaries AllList
      .addCase(fetchRenterBeneficariesAllList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchRenterBeneficariesAllList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchRenterBeneficariesAllList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch rentBen list
      .addCase(fetchRenterBeneficariesList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchRenterBeneficariesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchRenterBeneficariesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch LoanBen
      .addCase(fetchRenterBene.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchRenterBene.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchRenterBene.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create loan
      .addCase(createRenterBene.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createRenterBene.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createRenterBene.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Update renter
      .addCase(updateRentBen.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateRentBen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateRentBen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete loan
      .addCase(deleteRenterBen.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteRenterBen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteRenterBen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search by name
      .addCase(searchLoanBeneficiaries.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchLoanBeneficiaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchLoanBeneficiaries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // sort by date
      .addCase(sortByDateLoanBen.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByDateLoanBen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByDateLoanBen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(sortByAZLoanBen.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByAZLoanBen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByAZLoanBen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default renterBeneficiarySlice.reducer;
