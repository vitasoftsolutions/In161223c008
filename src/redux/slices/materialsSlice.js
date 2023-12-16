import { createSlice } from "@reduxjs/toolkit";
import {
  createMaterials,
  deleteMaterials,
  fetchMaterial,
  fetchMaterialsList,
  fetchMaterialsListAllData,
  searchMaterials,
  sortByAZMaterials,
  sortByDateMaterials,
  updateMaterials,
} from "../Actions/MaterialsAction";

const materialsSlice = createSlice({
  name: "createMaterialsSlice",
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
      // Fetch Materials all list
      .addCase(fetchMaterialsListAllData.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchMaterialsListAllData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchMaterialsListAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch Materials list
      .addCase(fetchMaterialsList.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchMaterialsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchMaterialsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Fetch s Materials
      .addCase(fetchMaterial.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
      })
      .addCase(fetchMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sData = action.payload.data;
        state.isCreated = false;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(fetchMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create Materials
      .addCase(createMaterials.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isCreated = true;
      })
      .addCase(createMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.data = [action.error.message];
      })
      // Update Materials
      .addCase(updateMaterials.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isUpdate = false;
      })
      .addCase(updateMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isUpdate = false;
      })
      // Delete Materials
      .addCase(deleteMaterials.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
      })
      .addCase(deleteMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      })
      // Search by name
      .addCase(searchMaterials.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // sort by date
      .addCase(sortByDateMaterials.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByDateMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByDateMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(sortByAZMaterials.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByAZMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByAZMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default materialsSlice.reducer;
