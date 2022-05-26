import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenseList:{
        error: null,
        success: null,
        loading: false,
        expenses: [],
    },
    
    expenseDelete: {
      error: null,
      success: null,
      loading: false,
    },
    expenseCreate: {
      error: null,
      success: null,
      loading: false,
      createdExpense: {},
    },

    expenseDetails: {
      error: null,
      success: null,
      loading: false,
      detailsExpense: {},
    },

    expenseUpdate: {
      error: null,
      success: null,
      loading: false,
      updatedExpense : {}
    }
  },
  reducers: {
    expenseListRequest(state) {
      state.expenseList.loading = true;
      state.expenses = [];
    },
    expenseListSuccess(state, action) {
        state.expenseList.loading = false;
      state.expenseList.expenses = action.payload;
    },
    expenseListError(state, action) {
        state.expenseList.loading = true;
      state.expenseList.error = action.payload;
    },
    expenseDetailsRequest(state) {
      state.expenseDetails.loading = true;
    },
    expenseDetailsSuccess(state, action) {
      state.expenseDetails.loading = false;
      state.expenseDetails.detailsExpense = action.payload;
    },
    expenseDetailsError(state, action) {
      state.expenseDetails.loading = false;
      state.expenseDetails.error = action.payload;
    },

    expenseDeleteRequest(state) {
      state.expenseDelete.loading = true;
      state.expenseCreate.success = false;
    },
    expenseDeleteSuccess(state) {
      state.expenseDelete.loading = false;
      state.expenseDelete.success = true;
      state.expenseDelete.error = null;
    },
    expenseDeleteError(state, action) {
      state.expenseDelete.loading = false;
      state.expenseDelete.error = action.payload;
      state.expenseDelete.success = null;
    },

    // create expense
    expenseCreateRequest(state) {
      state.expenseCreate.loading = true;
      state.expenseCreate.success = false;
    },
    expenseCreateSuccess(state, action) {
      state.expenseCreate.loading = false;
      state.expenseCreate.createdExpense = action.payload;
      state.expenseCreate.success = true;
      state.expenseCreate.error = null;
    },
    expenseCreateError(state, action) {
      state.expenseCreate.loading = false;
      state.expenseCreate.error = action.payload;
      state.expenseCreate.success = null;
    },
    expenseCreateReset(state) {
      state.expenseCreate.loading = false;
      state.expenseCreate.createdExpense = {};
      state.expenseCreate.success = null;
      state.expenseCreate.error = null;
    },
        // update expense
        expenseUpdateRequest(state) {
          state.expenseUpdate.loading = true;
        },
        expenseUpdateSuccess(state, action) {
          state.expenseUpdate.loading = false;
          state.expenseUpdate.success = true;
          state.expenseUpdate.updatedExpense = action.payload;
          state.expenseUpdate.error = null;
        },
        expenseUpdateError(state, action) {
          state.expenseUpdate.loading = false;
          state.expenseUpdate.error = action.payload;
          state.expenseUpdate.success = null;
        },
        expenseUpdateReset(state) {
          state.expenseUpdate.loading = false;
          state.expenseUpdate.updatedExpense = {};
          state.expenseUpdate.success = null;
          state.expenseUpdate.error = null;
        },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
