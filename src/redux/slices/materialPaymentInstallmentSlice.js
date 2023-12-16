import { createSlice } from "@reduxjs/toolkit";
import {
  createMaterialPaymentInstallment,
  deleteMaterialPaymentInstallment,
  fetchMaterialPaymentInstallment,
  fetchMaterialPaymentInstallmentAllList,
  fetchMaterialPaymentInstallmentList,
  searchMaterialPaymentInstallment,
  sortByAZMaterialPaymentInstallment,
  sortByDateMaterialPaymentInstallment,
  updateMaterialPaymentInstallment,
} from "../Actions/MaterialPaymentInstallmentAction";

const materialPaymentInstallmentSlice = createSlice({
  name: "createMaterialPaymentInstallmentSlice",
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
      // Fetch MaterialPaymentInstallment all list
      .addCase(fetchMaterialPaymentInstallmentAllList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(
        fetchMaterialPaymentInstallmentAllList.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isCreated = false;
          state.isUpdate = false;
          state.isError = false;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchMaterialPaymentInstallmentAllList.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error.message;
        }
      )
      // Fetch MaterialPaymentInstallment list
      .addCase(fetchMaterialPaymentInstallmentList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
        state.data = [];
      })
      .addCase(
        fetchMaterialPaymentInstallmentList.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isCreated = false;
          state.isUpdate = false;
          state.isError = false;
          state.data = action.payload.data;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalData = action.payload.totalData;
        }
      )
      .addCase(
        fetchMaterialPaymentInstallmentList.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error.message;
          state.data = [];
        }
      )
      // Fetch s MaterialPaymentInstallment
      .addCase(fetchMaterialPaymentInstallment.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchMaterialPaymentInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchMaterialPaymentInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create MaterialPaymentInstallment
      .addCase(createMaterialPaymentInstallment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createMaterialPaymentInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createMaterialPaymentInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Update MaterialPaymentInstallment
      .addCase(updateMaterialPaymentInstallment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateMaterialPaymentInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateMaterialPaymentInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete MaterialPaymentInstallment
      .addCase(deleteMaterialPaymentInstallment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteMaterialPaymentInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteMaterialPaymentInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search by name
      .addCase(searchMaterialPaymentInstallment.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchMaterialPaymentInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchMaterialPaymentInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // sort by date
      .addCase(sortByDateMaterialPaymentInstallment.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(
        sortByDateMaterialPaymentInstallment.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        sortByDateMaterialPaymentInstallment.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error.message;
        }
      )
      .addCase(sortByAZMaterialPaymentInstallment.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(
        sortByAZMaterialPaymentInstallment.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(sortByAZMaterialPaymentInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default materialPaymentInstallmentSlice.reducer;
