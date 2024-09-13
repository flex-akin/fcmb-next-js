import axiosInstance from '../../utils/axiosInstance'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERROR
} from '../constants/authConstants'
import jwtDecode from 'jwt-decode';


export const loginUser = (username, password, token) => async (dispatch) => {
    try {
        dispatch({ type : LOGIN_REQUEST});
        const config = {
            method : 'post',
            url : `/api/v1/user/login`,
            data : {
                username,
                password,
                token
            }
        }
    
        axiosInstance(config)
        .then(({data}) => (
            dispatch({
                type : LOGIN_SUCCESS,
                payload : data.data
            })
        ))
        .catch(function (error) {
            if (error.response) {
              dispatch({
                type : LOGIN_FAIL,
                payload : error.response.data
            })
             
            } else if (error.request) {
                    dispatch({
                      type : LOGIN_FAIL,
                      payload : error.request.data
                  })
             
              console.log(error.request);
            } else {
                dispatch({
                    type : LOGIN_FAIL,
                    payload : error.message
                })
              console.log('Error', error.message);
            }
          });
        
       
    } catch (error) {
        dispatch({

            type : LOGIN_FAIL,
            payload : error
        })
    }

}

export const loadUser = () => (dispatch) => {
    try {
        dispatch({ type : LOAD_USER_REQUEST});
        const accessToken = localStorage.getItem("accessToken")
        const user = jwtDecode(accessToken)

        dispatch({
            type : LOAD_USER_SUCCESS,
            payload : user
        })
    } catch (error) {
        dispatch({
            type : LOAD_USER_FAIL,
            payload : "Unauthorized"
        })
    }
}




export const clearErrors = () => (dispatch) => {
    dispatch({
        type : CLEAR_ERROR
    })
}


