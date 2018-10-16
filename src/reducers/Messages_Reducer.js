
const Messages =  (state = [], action) => {
    // console.log("Group_REducer", state)
    switch (action.type) {
        case 'SELECTED_GROUPMESSAGE':
            // alert("SELECTED_GROUPMESSAGE Match")
            return Object.assign({}, state, { groupMessages: action.groupMessages })
        default:
            return state
    }
}
export default Messages;