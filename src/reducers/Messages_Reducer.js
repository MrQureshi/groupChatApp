
const Messages =  (state = [], action) => {
    switch (action.type) {
        case 'SELECTED_GROUPMESSAGE':
            // alert("SELECTED_GROUPMESSAGE Match")
            return Object.assign({}, state, { groupMessages: action.groupMessages })
        default:
            return state
    }
}
export default Messages;