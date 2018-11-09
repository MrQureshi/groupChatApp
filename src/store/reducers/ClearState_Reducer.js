
const clearState = (state = [], action) => {
    switch (action.type) {
        case 'CLEAR_STATE':
        alert("Match Case, CLEAR_STATE")
        return Object.assign({},state,{requests:action.payload})
        default:
            return state
    }
}
export default clearState;