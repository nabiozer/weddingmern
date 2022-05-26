import { userActions } from "./user-slice";
import axios from "axios"


export const login= (email, password) => async (dispatch) => {
    try {
        dispatch(userActions.userLoginRequest())

        const config = {
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login',{email,password},config)
        dispatch(userActions.userLoginSuccess(data))
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch(userActions.userLoginError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}
export const logout = () => (dispatch) =>  {
    localStorage.removeItem('userInfo')
    dispatch(userActions.userLogout())
    dispatch(userActions.userListReset())
}


export const register= (name ,email, password,reservationInfo,deliveryInfo) => async (dispatch) => {
    try {
        dispatch(userActions.userRegisterRequest())

        const config = {
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const {data} = await axios.post('/api/users',{name,email,password,reservationInfo,deliveryInfo},config)
        dispatch(userActions.userRegisterSuccess(data))
        

        
    } catch (error) {
        dispatch(userActions.userRegisterError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}



export const getUserDetails= (id) => async (dispatch,getState) => {

    try {
        dispatch(userActions.userDetailsRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)
        dispatch(userActions.userDetailsSuccess(data))
      

    } catch (error) {
        dispatch(userActions.userDetailsError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}


export const updateUserProfile= (user) => async (dispatch,getState) => {

    try {
        dispatch(userActions.userUpdateSuccess())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                'Content-Type' :'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.put(`/api/users/profile`,user,config)
        dispatch(userActions.userUpdateSuccess(data))
      

    } catch (error) {
        dispatch(userActions.userUpdateError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}
export const listUsers = () => async (dispatch,getState) => {

    try {
        dispatch(userActions.userListRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.get(`/api/users`,config)
        dispatch(userActions.userListSuccess(data))
      

    } catch (error) {
        dispatch(userActions.userListError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}


export const deleteUser = (id) => async (dispatch,getState) => {

    try {
        dispatch(userActions.userDeleteRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.delete(`/api/users/${id}`,config)
        dispatch(userActions.userDeleteSuccess())
      

    } catch (error) {
        dispatch(userActions.userDeleteError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}


export const updateUserByAdmin = (user) => async (dispatch,getState) => {

    try {
        dispatch(userActions.userUpdateByAdminRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.put(`/api/users/${user._id}`, user ,config)
        dispatch(userActions.userUpdateByAdminSuccess())
        dispatch(userActions.userDetailsSuccess(data))
      

    } catch (error) {
        dispatch(userActions.userUpdateByAdminError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}