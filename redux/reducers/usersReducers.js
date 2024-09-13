import {
  
    LOAD_ALL_USER_REQUEST,
    LOAD_ALL_USER_SUCCESS,
    LOAD_ALL_USER_FAIL,
    CLEAR_ERROR
} from '../constants/usersConstant'



const defaultState = {users : []}
export const usersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_ALL_USER_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case LOAD_ALL_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                users : action.payload
            }
        
        case LOAD_ALL_USER_FAIL:
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

