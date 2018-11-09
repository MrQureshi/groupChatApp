
const Signin = (state = [], action) => {
    switch (action.type) {
        case "LOG_USER":
        return Object.assign({}, state,{logUser: action.payload} )
        case "NOT_LOG":
        return Object.assign({}, state, {logUser: action.payload})
        case "NOT_USER":
        return Object.assign({}, state, {logUser: action.payload})
        case 'SIGN_IN':
        return Object.assign({},state,{confirm:action.confirm,phoneNumer:action.phoneNumber})
        default:
            return state
    }
}
export default Signin;