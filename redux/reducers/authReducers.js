import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERROR
} from '../constants/authConstants'



const defaultState = {user : null, isAuthenticated : false , loading: false}
export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload,
            }
        
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        
        case CLEAR_ERROR:
            return {
                ...state,
                error : null
            }
        default:
            return state
    }
}

