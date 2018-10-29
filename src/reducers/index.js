import {combineReducers} from 'redux'
import Signin from './Signin_Reducer'
import User from './Confirmcode_Reducer'
import userDetail from './UserDetail_Reducer'
import groups from './Groups_Reducer'
// import Message from './Messages_Reducer'
import allMessage from './Allmessages_Reducer'
import Requests from './Request_Reducer'
import Members from './Members_Reducer'
// import clearState from './ClearState_Reducer'

export default combineReducers({
    Signin,
    User,
    userDetail,
    groups,
    // Message
    allMessage,
    Requests,
    Members
    // clearState
})