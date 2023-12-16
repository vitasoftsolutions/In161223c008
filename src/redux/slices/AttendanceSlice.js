import { createSlice } from "@reduxjs/toolkit";
import {
  createAttendance,
  deleteAttendance,
  fetchAttendance,
  fetchSAttendance,
  updateAttendance,
} from "../Actions/AttendanceAction";

const AttendanceSlice = createSlice({
  name: "AttendanceSlice",
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
      .addCase(fetchAttendance.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Delete Attendance
      .addCase(deleteAttendance.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Create Attendance
      .addCase(createAttendance.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Fetch fetch S Attendance
      .addCase(fetchSAttendance.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchSAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchSAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Update Attendance
      .addCase(updateAttendance.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      });
    //   // Create loan
    //   .addCase(createLoanBen.pending, (state) => {
    //     state.isLoading = true;
    //     state.isError = false;
    //   })
    //   .addCase(createLoanBen.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.massage = action.payload;
    //     state.isCreated = true;
    //   })
    //   .addCase(createLoanBen.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.data = [action.error.message];
    //   })

    //   // Delete loan
    //   .addCase(deleteAttendance.pending, (state) => {
    //     state.isLoading = true;
    //     state.isError = false;
    //     state.isDelete = false;
    //   })
    //   .addCase(deleteAttendance.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isDelete = true;
    //   })
    //   .addCase(deleteAttendance.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = action.error.message;
    //     state.isDelete = false;
    //   })
    //   // Search by name
    //   .addCase(searchLoanBeneficiaries.pending, (state) => {
    //     state.isLoading = true;
    //     state.data = [];
    //     state.currentPage = 1;
    //     state.totalPages = 1;
    //     state.totalData = 0;
    //   })
    //   .addCase(searchLoanBeneficiaries.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(searchLoanBeneficiaries.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = action.error.message;
    //   })
    //   // sort by date
    //   .addCase(sortByDateLoanBen.pending, (state) => {
    //     state.isLoading = true;
    //     state.data = [];
    //     state.currentPage = 1;
    //     state.totalPages = 1;
    //     state.totalData = 0;
    //   })
    //   .addCase(sortByDateLoanBen.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(sortByDateLoanBen.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = action.error.message;
    //   })
    //   .addCase(sortByAZLoanBen.pending, (state) => {
    //     state.isLoading = true;
    //     state.data = [];
    //     state.currentPage = 1;
    //     state.totalPages = 1;
    //     state.totalData = 0;
    //   })
    //   .addCase(sortByAZLoanBen.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(sortByAZLoanBen.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = action.error.message;
    //   });
  },
});

export default AttendanceSlice.reducer;
