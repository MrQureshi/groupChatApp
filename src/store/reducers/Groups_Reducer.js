
const Groups = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_GROUP':
            return Object.assign({}, state, { groups: action.userDetail })
        case "GROUP_LIST":
            return Object.assign({}, state, { groupList: action.groupList })
        case 'SELECTED_GROUP':
            return Object.assign({}, state, { SelectedGroup: action.SelectedGroup, Messages: action.Messages,})
        default:
            return state
    }
}
export default Groups;