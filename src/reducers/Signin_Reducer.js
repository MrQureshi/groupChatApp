
const Signin = (state = [], action) => {
    switch (action.type) {
        case 'SIGN_IN':
        return Object.assign({},state,{confirm:action.confirm,phoneNumer:action.phoneNumber})
        default:
            return state
    }
}
export default Signin;