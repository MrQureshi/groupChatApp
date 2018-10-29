
const Allmessages = (state = [], action) => {
    switch (action.type) {
        case 'ALL_MESSAGES':
        // alert("Match Case, ALL_MESSAGES")
        return Object.assign({},state,{allMessages:action.allMessages})
        default:
            return state
    }
}
export default Allmessages;