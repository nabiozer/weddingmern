import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photos: [],
    loadingPhotos: false,
    error: "",
    photoDelete: {
      error: null,
      success: null,
      loading: false,
    },
    photoCreate: {
      error: null,
      success: null,
      loading: false,
      createdPhoto: {},
    },

    photoDetails: {
      error: null,
      success: null,
      loading: false,
      detailsPhoto: {},
    },

    photoUpdate: {
      error: null,
      success: null,
      loading: false,
      updatedPhoto : {}
    }
  },
  reducers: {
    photoListRequest(state) {
      state.isLoading = true;
      state.photos = [];
    },
    photoListSuccess(state, action) {
      state.isLoading = false;
      state.photos = action.payload;
    },
    photoListError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    photoDetailsRequest(state) {
      state.photoDetails.loading = true;
    },
    photoDetailsSuccess(state, action) {
      state.photoDetails.loading = false;
      state.photoDetails.detailsPhoto = action.payload;
    },
    photoDetailsError(state, action) {
      state.photoDetails.loading = false;
      state.photoDetails.error = action.payload;
    },

    photoDeleteRequest(state) {
      state.photoDelete.loading = true;
    },
    photoDeleteSuccess(state) {
      state.photoDelete.loading = false;
      state.photoDelete.success = true;
      state.photoDelete.error = null;
    },
    photoDeleteError(state, action) {
      state.photoDelete.loading = false;
      state.photoDelete.error = action.payload;
      state.photoDelete.success = null;
    },

    // create photo
    photoCreateRequest(state) {
      state.photoCreate.loading = true;
    },
    photoCreateSuccess(state, action) {
      state.photoCreate.loading = false;
      state.photoCreate.createdPhoto = action.payload;
      state.photoCreate.success = true;
      state.photoCreate.error = null;
    },
    photoCreateError(state, action) {
      state.photoCreate.loading = false;
      state.photoCreate.error = action.payload;
      state.photoCreate.success = null;
    },
    photoCreateReset(state) {
      state.photoCreate.loading = false;
      state.photoCreate.createdPhoto = {};
      state.photoCreate.success = null;
      state.photoCreate.error = null;
    },
        // update photo
        photoUpdateRequest(state) {
          state.photoUpdate.loading = true;
        },
        photoUpdateSuccess(state, action) {
          state.photoUpdate.loading = false;
          state.photoUpdate.success = true;
          state.photoUpdate.updatedPhoto = action.payload;
          state.photoUpdate.error = null;
        },
        photoUpdateError(state, action) {
          state.photoUpdate.loading = false;
          state.photoUpdate.error = action.payload;
          state.photoUpdate.success = null;
        },
        photoUpdateReset(state) {
          state.photoUpdate.loading = false;
          state.photoUpdate.updatedPhoto = {};
          state.photoUpdate.success = null;
          state.photoUpdate.error = null;
        },
  },
});

export const photoActions = photoSlice.actions;

export default photoSlice;
