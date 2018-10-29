
const Userdetail = (state = [], action) => {
    switch (action.type) {
        case 'USER_DETAIL':
        return Object.assign({},state,{userdetail:action.userDetail})
        default:
            return state
    }
}
export default Userdetail;