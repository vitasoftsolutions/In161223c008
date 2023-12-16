import { createSlice } from "@reduxjs/toolkit";
import {
  createMaterialReceiveInstallment,
  deleteMaterialReceiveInstallment,
  fetchMaterialReceiveInstallment,
  fetchMaterialReceiveInstallmentAllList,
  fetchMaterialReceiveInstallmentList,
  searchMaterialReceiveInstallment,
  sortByAZMaterialReceiveInstallment,
  sortByDateMaterialReceiveInstallment,
  updateMaterialReceiveInstallment,
} from "../Actions/MaterialReceiveInstallmentAction";

const materialReceiveInstallmentSlice = createSlice({
  name: "createMaterialReceiveInstallmentSlice",
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
      // Fetch MaterialReceiveInstallment all list
      .addCase(fetchMaterialReceiveInstallmentAllList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(
        fetchMaterialReceiveInstallmentAllList.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isCreated = false;
          state.isUpdate = false;
          state.isError = false;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchMaterialReceiveInstallmentAllList.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error.message;
        }
      )
      // Fetch MaterialReceiveInstallment list
      .addCase(fetchMaterialReceiveInstallmentList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(
        fetchMaterialReceiveInstallmentList.fulfilled,
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
        fetchMaterialReceiveInstallmentList.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error.message;
        }
      )
      // Fetch s MaterialReceiveInstallment
      .addCase(fetchMaterialReceiveInstallment.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchMaterialReceiveInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchMaterialReceiveInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create MaterialReceiveInstallment
      .addCase(createMaterialReceiveInstallment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createMaterialReceiveInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createMaterialReceiveInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Update MaterialReceiveInstallment
      .addCase(updateMaterialReceiveInstallment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateMaterialReceiveInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateMaterialReceiveInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete MaterialReceiveInstallment
      .addCase(deleteMaterialReceiveInstallment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteMaterialReceiveInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteMaterialReceiveInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search by name
      .addCase(searchMaterialReceiveInstallment.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchMaterialReceiveInstallment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchMaterialReceiveInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // sort by date
      .addCase(sortByDateMaterialReceiveInstallment.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(
        sortByDateMaterialReceiveInstallment.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        sortByDateMaterialReceiveInstallment.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error.message;
        }
      )
      .addCase(sortByAZMaterialReceiveInstallment.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(
        sortByAZMaterialReceiveInstallment.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(sortByAZMaterialReceiveInstallment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default materialReceiveInstallmentSlice.reducer;
