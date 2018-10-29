
const Requests = (state = [], action) => {
    switch (action.type) {
        case 'REQUEST':
        return Object.assign({},state,{requests:action.payload})
        default:
            return state
    }
}
export default Requests;