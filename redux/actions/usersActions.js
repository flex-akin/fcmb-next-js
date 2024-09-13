import axiosInstance from '../../utils/axiosInstance'
import {
    LOAD_ALL_USER_REQUEST,
    LOAD_ALL_USER_SUCCESS,
    LOAD_ALL_USER_FAIL,
    CLEAR_ERROR
} from '../constants/usersConstant'


export const getAllUsers = (username) => async (dispatch) => {
    try {
        dispatch({ type : LOAD_ALL_USER_REQUEST});
        const config = {
            method : 'get',
            url : `/api/v1/user/users?username=${username}`
        }

        const { data } = await axiosInstance(config)
        dispatch({
            type : LOAD_ALL_USER_SUCCESS,
            payload : data.data
        })
    } catch (error) {
        dispatch({
            type : LOAD_ALL_USER_FAIL,
            payload : "Unauthorized"
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({
        type : CLEAR_ERROR
    })
}

