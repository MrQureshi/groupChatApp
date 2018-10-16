
const Confirmcode = (state = [], action) => {
    // console.log("confirm_REducer", state)
    switch (action.type) {
        case 'CONFIRM_CODE':
        // alert("Match Case, CONFIRM_CODE")
        return Object.assign({},state,{user:action.user})
        default:
            return state
    }
}
export default Confirmcode;