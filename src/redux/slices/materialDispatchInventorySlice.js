import { createSlice } from "@reduxjs/toolkit";
import { createMaterialDispatchInventory, deleteMaterialDispatchInventory, fetchMaterialDispatchInventory, fetchMaterialDispatchInventoryAllList, fetchMaterialDispatchInventoryList, searchMaterialDispatchInventory, sortByAZMaterialDispatchInventory, sortByDateMaterialDispatchInventory, updateMaterialDispatchInventory } from "../Actions/MaterialDispatchInventoryAction";


const materialDispatchInventorySlice = createSlice({
  name: "createMaterialDispatchInventorySlice",
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
      // Fetch MaterialDispatchInventory all list
      .addCase(fetchMaterialDispatchInventoryAllList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchMaterialDispatchInventoryAllList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchMaterialDispatchInventoryAllList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch MaterialDispatchInventory list
      .addCase(fetchMaterialDispatchInventoryList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchMaterialDispatchInventoryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchMaterialDispatchInventoryList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch s MaterialDispatchInventory
      .addCase(fetchMaterialDispatchInventory.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchMaterialDispatchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchMaterialDispatchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create MaterialDispatchInventory
      .addCase(createMaterialDispatchInventory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createMaterialDispatchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createMaterialDispatchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Update MaterialDispatchInventory
      .addCase(updateMaterialDispatchInventory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateMaterialDispatchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateMaterialDispatchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete MaterialDispatchInventory
      .addCase(deleteMaterialDispatchInventory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteMaterialDispatchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteMaterialDispatchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search by name
      .addCase(searchMaterialDispatchInventory.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchMaterialDispatchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchMaterialDispatchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // sort by date
      .addCase(sortByDateMaterialDispatchInventory.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByDateMaterialDispatchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByDateMaterialDispatchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(sortByAZMaterialDispatchInventory.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByAZMaterialDispatchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByAZMaterialDispatchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default materialDispatchInventorySlice.reducer;
