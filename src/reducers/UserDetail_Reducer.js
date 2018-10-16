
const Userdetail = (state = [], action) => {
    // console.log("Userdetail_REducer", state)
    switch (action.type) {
        case 'USER_DETAIL':
        // alert("Match Case, USER_DETAIL")
        return Object.assign({},state,{userdetail:action.userDetail})
        default:
            return state
    }
}
export default Userdetail;