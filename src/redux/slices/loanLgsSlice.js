import { createSlice } from "@reduxjs/toolkit";
import { fetchLoanLogs } from "../Actions/LoanLogsAction";

const loanLogsSlice = createSlice({
  name: "createLoanLogsSlice",
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
      .addCase(fetchLoanLogs.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchLoanLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchLoanLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
    // Fetch LoanBen
    // .addCase(fetchLoanBene.pending, (state) => {
    //   state.isLoading = true;
    //   state.isUpdate = false;
    //   state.isError = false;
    // })
    // .addCase(fetchLoanBene.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.sData = action.payload.data;
    //   state.isCreated = false;
    //   state.isError = false;
    //   state.isUpdate = false;
    // })
    // .addCase(fetchLoanBene.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.error.message;
    // });
  },
});

export default loanLogsSlice.reducer;
