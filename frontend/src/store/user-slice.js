import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userLogin: {
      loading: false,
      error: null,
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    },
    userDetails: {
      user:{},
      loading: false,
      error: null
    },

    userUpdate:{
      userInfo:{},
      loading: false,
      error: null,
      success:null,
    },
    userList:{
      users:[],
      loading:false,
      error:null,
      success:null
    },

    userDelete: {
      loading:false,
      error:null,
      success:null
    },

    userUpdateByAdmin:{
      loading:false,
      success:null,
      error:null

    },

    userRegister:{
      userInfo:{},
      loading:false,
      success:false,
      error:null
    }
    
    
  },
  reducers: {
      //Register Reducers
    userLoginRequest(state) {
      state.userLogin.loading = true;
    },
    userLoginSuccess(state, action) {
      state.userLogin.loading = false;
      state.userLogin.userInfo = action.payload;
    },
    userLoginError(state, action) {
      state.userLogin.loading = false;
      state.userLogin.error = action.payload;
    },
    userLogout(state) {
      state.userLogin.loading = false;
      state.userLogin.userInfo = null;
    },
    //Register Reducers
    userRegisterRequest(state) {
      state.userRegister.loading = true;
      state.userRegister.success = null;
    },
    userRegisterSuccess(state, action) {
      state.userRegister.loading = false;
      state.userRegister.error = null;
      state.userRegister.userInfo = action.payload;
      state.userRegister.success = true;
    },
    userRegisterError(state, action) {
      state.userRegister.loading = false;
      state.userRegister.error = action.payload;
      state.userRegister.success = null;
    },

    //User Details f
    userDetailsRequest(state) {
      state.userDetails.loading = true;
    },
    userDetailsSuccess(state, action) {
      state.userDetails.loading = false;
      state.userDetails.error = null;
      state.userDetails.user = action.payload;
    },
    userDetailsError(state, action) {
      state.userDetails.loading = false;
      state.userDetails.error = action.payload;
    },

    //User Update

    userUpdateRequest(state) {
      state.userUpdate.loading = true;
    },
    userUpdateSuccess(state, action) {
      state.userUpdate.loading = false;
      state.userUpdate.error = null;
      state.userUpdate.userInfo = action.payload;
      state.userUpdate.success = true;
    },
    userUpdateError(state, action) {
      state.userUpdate.loading = false;
      state.userUpdate.error = action.payload;
      
    },
    // User List Admin
    userListRequest(state) {
      state.userList.loading = true;
    },
    userListSuccess(state, action) {
      state.userList.loading = false;
      state.userList.error = null;
      state.userList.users = action.payload;
      state.userList.success = true;
    },
    userListError(state, action) {
      state.userList.loading = false;
      state.userList.error = action.payload;
      state.userList.success = false;
    },
    userListReset(state) {
     
      state.userList.users = []
      
    },

      // User Delete Admin
      userDeleteRequest(state) {
        state.userDelete.loading = true;
        state.userDelete.error = null;
        state.userDelete.success = null;
      },
      userDeleteSuccess(state, action) {
        state.userDelete.loading = false;
        state.userDelete.error = null;
        state.userDelete.success = true;
      },
      userDeleteError(state, action) {
        state.userDelete.loading = false;
        state.userDelete.error = action.payload;
        state.userDelete.success = null;
      },


      // User Uptadete By Admin
      userUpdateByAdminRequest(state) {
        state.userUpdateByAdmin.loading = true;
      },
      userUpdateByAdminSuccess(state, action) {
        state.userUpdateByAdmin.loading = false;
        state.userUpdateByAdmin.error = null;
        state.userUpdateByAdmin.success = true;
      },
      userUpdateByAdminError(state, action) {
        state.userUpdateByAdmin.loading = false;
        state.userUpdateByAdmin.error = action.payload;
        state.userUpdateByAdmin.success = null;
      },
      userUpdateByAdminReset(state, action) {
        state.userUpdateByAdmin.loading = false;
        state.userUpdateByAdmin.error = null;
        state.userUpdateByAdmin.success = null;
      },

    
  },
});

export const userActions = userSlice.actions;

export default userSlice;
