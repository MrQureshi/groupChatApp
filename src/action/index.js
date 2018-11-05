import firebase from 'react-native-firebase';
import Admin from '../components/Admin';
import { compose } from 'redux';

export const logUser = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref(`user/${user.uid}/`).on('value', snap => {
                    if (snap.val()) {
                        // let user = snap.val()
                        return dispatch({
                            type: "LOG_USER",
                            payload: snap.val()
                        })
                    }
                    else {
                        return dispatch({
                            type: "NOT_LOG",
                            payload: false
                        })
                    }
                })
            }
        })
    }
}
export const Signin = (phoneNumber) => {
    return dispatch => {
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then((confirm) => {
                dispatch({
                    type: "SIGN_IN",
                    confirm: confirm,
                    phoneNumber: phoneNumber
                })
            })
    }
}

export const Confirmcode = (code, confirm) => {
    return dispatch => {
        confirm.confirm(code)
            .then((res) => {
                dispatch({
                    type: "CONFIRM_CODE",
                    user: res._user
                })
            }).catch((error) => {
            })
    }
}

export const userDetail = (userKey, phoneNumber, userName, rollNum) => {
    return dispatch => {

        firebase.database().ref(`user/${userKey}/`).set({
            phoneNumber: phoneNumber,
            userKey: userKey,
            userName: userName,
            rollNumber: rollNum
        })
        let data = { userKey, phoneNumber, userName, rollNum };
        if (data) {
            dispatch({
                type: "USER_DETAIL",
                userDetail: data
            })
        }
    }
}
export const createGroup = (groupName, description, imageUrl) => {
    return dispatch => {
        firebase.database().ref().child("Groups/").push({
            groupName, description, imageUrl
        }).then(() => {
            let data = { groupName, description, imageUrl };
            if (data) {
                dispatch({
                    type: "CREATE_GROUP",
                    group: data
                })
            }
        }).catch((error) => {
        })
    }
}

export const groupList = () => {
    return dispatch => {
        // alert("reached")
        firebase.database().ref(`Groups/`).on('value', snap => {
            let groupList = [];
            let objGroup = snap.val();
            for (let key in objGroup) {
                groupList.push({ ...objGroup[key], key });
            }
            dispatch({
                type: "GROUP_LIST",
                groupList: groupList
            })
        })
    }
}
export const requestHandle = (groupKey, groupName, userName) => {
    return () => {
        let Currentuser = firebase.auth().currentUser
        let uid = Currentuser.uid
        let phoneNumber = Currentuser.phoneNumber

        firebase.messaging().getToken()
            .then(Token => {
                if (Token) {
                    // firebase.database().ref(`Groups/${key}/Token/${Token}`).set({ Token: "" })
                    firebase.database().ref(`Groups/${groupKey}/Request/${uid}`).set({ phoneNumber, userName, groupName, Token, groupKey })
                }
            })
    }
}

export const acceptRequest = (groupKey, Token, userName, userKey, phoneNumber) => {
    return () => {
        firebase.database().ref(`Groups/${groupKey}/member/${userKey}`).set({ Token: Token, userName: userName, phoneNumber: phoneNumber }).then(
            firebase.database().ref(`Groups/${groupKey}/Request/${userKey}`).remove()
        )
    }
}

export const rejectRequest = (groupKey, userKey) => {
    return () => {
        firebase.database().ref(`Groups/${groupKey}/Request/${userKey}`).remove()
    }
}
export const getSelectedGroup = (list) => {
    return dispatch => {

        firebase.database().ref(`messages/${list.key}`).on('value', snap => {
            let messages = []
            let objMsg = snap.val()
            for (let key in objMsg) {
                messages.push({ ...objMsg[key], key });
            }
            dispatch({
                type: "SELECTED_GROUP",
                SelectedGroup: list,
                Messages: messages
            })
        })
    }
}

export const sendMessage = (textMsg, groupKey, groupName, msgTime) => {
    return () => {
        let Currentuser = firebase.auth().currentUser.uid

        if (Currentuser) {
            firebase.database().ref(`user/${Currentuser}/`).on('value', snap => {

                objUser = snap.val()
                let userName = objUser.userName
                let userKey = objUser.userKey
                let rollNumber = objUser.rollNumber
                let phoneNumber = objUser.phoneNumber
                firebase.database().ref(`messages/${groupKey}`).push(
                    {
                        userName, userKey, rollNumber, phoneNumber, groupKey, textMsg, groupName, msgTime
                    }
                )
            })
        }
    }
}

export const allMessage = (userKey) => {
    return dispatch => {
        firebase.database().ref(`Groups`).on('value', snap => {
            let objgroup = snap.val()
            if (objgroup === null) {
                return objgroup = {}
            }
            // console.log("11111", objgroup)
            let groupKeys = Object.keys(objgroup)

            // console.log("12345", groupKeys)
            var GroupsKeysHaveCurrentUser = []
            groupKeys.forEach((getGroupKeys, i) => {
                if (objgroup[getGroupKeys].member) {

                    var memberKey = Object.keys(objgroup[getGroupKeys].member)

                    var getGroupsKeysHaveCurrentUser = memberKey.filter(ii => {
                        return userKey === ii
                    })
                    if (getGroupsKeysHaveCurrentUser.length) {
                        GroupsKeysHaveCurrentUser.push(getGroupKeys);
                    }
                }
            })

            firebase.database().ref(`messages`).on('value', snap => {
                let obj = snap.val()
                if (obj === null) {
                    return obj = {}
                }

                let getMessages = []
                GroupsKeysHaveCurrentUser.forEach(k => {
                    getMessages.push(obj[k])
                })
                let allMessages = []

                for (let key in getMessages) {
                    let data = getMessages[key]
                    for (let allMsg in data) {
                        allMessages.push(data[allMsg])
                    }
                }
                allMessages.sort((a, b) => a.msgTime - b.msgTime)

                dispatch({
                    type: "ALL_MESSAGES",
                    allMessages
                })
            })
        })
    }
}
export const allMessagesForSuperAdmin = () => {
    return dispatch => {
        firebase.database().ref(`messages`).on('value', snap => {
            let objMsg = snap.val()
            let aryMessagesForSuperAdmin = []
            for (let key in objMsg) {
                let getData = objMsg[key]
                for (let al in getData) {
                    aryMessagesForSuperAdmin.push(getData[al])
                }
            }
            aryMessagesForSuperAdmin.sort((a, b) => a.msgTime - b.msgTime)

            dispatch({
                type: "ALLMESSAGES_SUPERADMIN",
                payload: aryMessagesForSuperAdmin
            })
        })
    }
}

export const Requests = (groupKey) => {

    // return dispatch  => {
    //     dispatch({
    //         type: "REQUEST",
    //         payload:request
    //     })
    // }
    return dispatch => {
        firebase.database().ref(`Groups/${groupKey}/Request`).on('value', snap => {
            // this.props.Requests(request)
            let Request = snap.val()
            let requests = []
            for (let key in Request) {
                requests.push({ ...Request[key], userkey: key })
            }
            dispatch({
                type: "REQUEST",
                payload: requests
            })
        })
    }
}
export const AllRequests = () => {


    return dispatch => {
        firebase.database().ref(`Groups`).on('value', snap => {
            let getObj = snap.val()
            let AllReq = []
            for (let key in getObj) {
                let reqData = getObj[key].Request && getObj[key].Request

                for (let r in reqData) {
                    AllReq.push({ ...reqData[r], userkey: r })
                }
            }

            dispatch({
                type: "ALLREQUEST",
                payload: AllReq
            })
        })
    }
}
// export const clearState = ()=>{
//     return dispatch => {
//         dispatch({
//             type: "CLEAR_STATE",
//             payload: undefined
//         })
//     }

// } 
export const ViewMembers = (groupKey) => {
    return dispatch => {
        firebase.database().ref(`Groups/${groupKey}/member`).on('value', snap => {
            let member = snap.val()
            let Members = []
            for (let key in member) {
                Members.push({ ...member[key], userkey: key, groupKey })
            }
            dispatch({
                type: "MEMBERS",
                payload: Members
            })
        })
    }
}
export const makeAdmin = (groupKey, userKey, Token, userName, phoneNumber) => {
    return () => {
        firebase.database().ref(`Groups/${groupKey}/member/${userKey}`).set({ Token: Token, userName: userName, phoneNumber: phoneNumber, Admin: 'Admin' })
        // .then(
        //     firebase.database().ref(`Groups/${groupKey}/Request/${userKey}`).remove()
        // )
    }
}
export const deleteGroup = (groupKey) => {
    return () => {

        firebase.database().ref(`Groups/${groupKey}`).remove();
        firebase.database().ref(`messages/${groupKey}`).remove();

    }
}


