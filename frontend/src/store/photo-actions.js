import {photoActions} from './photo-slice'
import axios from 'axios'

// get photo from backend 
export const getPhotos = () => async (dispatch) => {
    try {
        dispatch(photoActions.photoListRequest())
        
        const {data} = await axios.get('/api/photos')
        dispatch(photoActions.photoListSuccess(data))
    } catch (error) {
        dispatch(photoActions.photoListError(
            error.response && error.response.data.message ? error.response.data.message 
            : error.message
        ))
    }
}

// get photo By id

export const getPhotoById = (id) => async (dispatch) => {
    try {
        dispatch(photoActions.photoDetailsRequest())
        
        const {data} = await axios.get(`/api/photos/${id}`)
        dispatch(photoActions.photoDetailsSuccess(data))
    } catch (error) {
        dispatch(photoActions.photoDetailsError(
            error.response && error.response.data.message ? error.response.data.message 
            : error.message
        ))
    }
}



export const deletePhoto = (id) => async (dispatch,getState) => {

    try {
        dispatch(photoActions.photoDeleteRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        await axios.delete(`/api/photos/${id}`,config)
        dispatch(photoActions.photoDeleteSuccess())
      

    } catch (error) {
        dispatch(photoActions.photoDeleteError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}


export const createPhoto = (id) => async (dispatch,getState) => {

    try {
        dispatch(photoActions.photoCreateRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.post(`/api/photos`,{},config)
        dispatch(photoActions.photoCreateSuccess(data))
      

    } catch (error) {
        dispatch(photoActions.photoCreateError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}

export const updatePhoto = (photo) => async (dispatch,getState) => {

    try {
        dispatch(photoActions.photoUpdateRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.put(`/api/photos/${photo._id}`, photo ,config)
        dispatch(photoActions.photoUpdateSuccess(data))
     
      

    } catch (error) {
        dispatch(photoActions.updatePhotoError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}
