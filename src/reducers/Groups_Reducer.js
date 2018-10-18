
const Groups = (state = [], action) => {
    // console.log("Group_REducer", state)
    switch (action.type) {
        case 'CREATE_GROUP':
            // alert("Match Case, CREATE_GROUP")
            return Object.assign({}, state, { groups: action.userDetail })
        case "GROUP_LIST":
            return Object.assign({}, state, { groupList: action.groupList })
        case 'SELECTED_GROUP':
        // console.log("SELECTED_GROUP aaaa")
            // alert("SELECTED_GROUP Match")
            return Object.assign({}, state, { SeletcedGroup: action.SeletcedGroup, Messages: action.Messages })
        default:
            return state
    }
}
export default Groups;