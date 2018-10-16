import {combineReducers} from 'redux'
import Signin from './Signin_Reducer'
import User from './Confirmcode_Reducer'
import userDetail from './UserDetail_Reducer'
import groups from './Groups_Reducer'
import Message from './Messages_Reducer'

export default combineReducers({
    Signin,
    User,
    userDetail,
    groups,
    Message
})