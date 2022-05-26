import {expenseActions} from './expense-slice'
import axios from 'axios'

export const listExpenses = () => async (dispatch,getState) => {

    try {
        dispatch(expenseActions.expenseListRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.get(`/api/expenses`,config)
        dispatch(expenseActions.expenseListSuccess(data))
      

    } catch (error) {
        dispatch(expenseActions.expenseListError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}


export const deleteExpense = (id) => async (dispatch,getState) => {

    try {
        dispatch(expenseActions.expenseDeleteRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        await axios.delete(`/api/expenses/${id}`,config)
        dispatch(expenseActions.expenseDeleteSuccess())
      

    } catch (error) {
        dispatch(expenseActions.expenseDeleteError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}


export const newExpense = (description,date,price) => async (dispatch,getState) => {

    try {
        dispatch(expenseActions.expenseCreateRequest())
        const {userLogin:{userInfo}} = getState().user
        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.post(`/api/expenses`,{description,date,price},config)
        dispatch(expenseActions.expenseCreateSuccess(data))
      

    } catch (error) {
        dispatch(expenseActions.expenseCreateError( error.response && error.response.data.message ? error.response.data.message 
            : error.message))
    }
}
