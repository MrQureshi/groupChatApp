
const Members = (state = [], action) => {
    switch (action.type) {
        case 'MEMBERS':
        return Object.assign({}, state, {members:action.payload})
        default:
            return state
    }
}
export default Members;