import { createSlice } from "@reduxjs/toolkit";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployeeAction,
  fetchEmployeeAllList,
  fetchSingleEmployee,
  updateEmployee,
} from "../Actions/employeeAction";
import {
  searchPhoneByName,
  sortByAZPhone,
  sortByDatePhone,
} from "../Actions/PhoneAction";

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: {
    isLoading: false,
    isCreated: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeAction.pending, (state) => {
        state.isLoading = true;
        state.massage = "";
        state.isCreated = false;
      })
      .addCase(fetchEmployeeAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.isUpdate = false;
        state.isCreated = false;
      })
      .addCase(fetchEmployeeAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // fetchEmployeeAllList
      .addCase(fetchEmployeeAllList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchEmployeeAllList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchEmployeeAllList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })

      // fetch Single Employee
      .addCase(fetchSingleEmployee.pending, (state) => {
        state.isLoading = true;
        state.isCreated = false;
        state.isUpdate = false;
      })
      .addCase(fetchSingleEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isCreated = false;
        state.isUpdate = false;
      })
      .addCase(fetchSingleEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isCreated = false;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isCreated = false;
      })
      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isDelete = true;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })

      // update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
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

export default employeeSlice.reducer;
