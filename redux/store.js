import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { authReducer } from "./reducers/authReducers"
import { usersReducer } from "./reducers/usersReducers"

const reducer = combineReducers({
    auth : authReducer,
    users : usersReducer
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store