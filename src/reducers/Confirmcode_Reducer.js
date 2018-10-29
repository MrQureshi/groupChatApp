
const Confirmcode = (state = [], action) => {
    switch (action.type) {
        case 'CONFIRM_CODE':
        return Object.assign({},state,{user:action.user})
        default:
            return state
    }
}
export default Confirmcode;