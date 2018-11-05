
const Allmessages = (state = [], action) => {
    switch (action.type) {
        case 'ALL_MESSAGES':
        // alert("Match Case, ALL_MESSAGES")
        return Object.assign({},state,{allMessages:action.allMessages})
        case 'ALLMESSAGES_SUPERADMIN':
        return Object.assign({},state,{allMessagesSuperAdmin:action.payload})
        default:
            return state
    }
}
export default Allmessages;