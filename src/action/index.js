import firebase from 'react-native-firebase';

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
        console.log("action confirm", code, confirm)
        confirm.confirm(code)
            .then((res) => {
                console.log("ress", res._user)
                dispatch({
                    type: "CONFIRM_CODE",
                    user: res._user
                })
                // console.log("user authticated", res)
            }).catch((error) => {
                console.log(error)
            })
    }
}

export const userDetail = (userKey, phoneNumber, userName, rollNum) => {
    return dispatch => {
        // console.log("User Detail", userKey, phoneNumber, userName, rollNum)

        firebase.database().ref(`user/${userKey}/`).set({
            phoneNumber: phoneNumber,
            userKey: userKey,
            userName: userName,
            rollNumber: rollNum
        })
        let data = { userKey, phoneNumber, userName, rollNum };
        // console.log('data then ', data)
        if (data) {
            dispatch({
                type: "USER_DETAIL",
                userDetail: data
            })
        }
    }
}
export const createGroup = (groupName, description, imageUrl, join) => {
    console.log("action createGroup", groupName, description, imageUrl, join)
    return dispatch => {
        firebase.database().ref().child("Groups/").push({
            groupName, description, imageUrl, join
        }).then(() => {
            let data = { groupName, description, imageUrl, join };
            if (data) {
                dispatch({
                    type: "CREATE_GROUP",
                    group: data
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const groupList = () => {
    return dispatch => {
        // alert("reached")
        firebase.database().ref(`Groups/`).on('value', snap => {
            let groupList = [];
            // console.log("aaaaaaaaaaa")
            let objGroup = snap.val();
            // console.log("obj", objGroup)
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
export const addMember = (key) => {
    console.log("Actionsss", key)

    return () => {
        let Currentuser = firebase.auth().currentUser
        let uid = Currentuser.uid
        let phoneNumber = Currentuser.phoneNumber

        firebase.messaging().getToken()
        .then(Token => {
            if (Token) {
                firebase.database().ref(`Groups/${key}/Token/${Token}`).set({ Token})
            }})

        firebase.messaging().getToken()
            .then(Token => {
                if (Token) {
                    // user has a device token
                    // console.log("?><", Token)
                    if (Token) {
                        firebase.database().ref(`Groups/${key}/member/${uid}`).set({ phoneNumber, Token })
                    }
                }
            }
            );
    }
}
export const getSeletcedGroup = (list) => {
    return dispatch => {
        // console.log("getSeletcedGroup", list)
        // console.log("getSeletcedGroupKeyyy", list.key)


        firebase.database().ref(`messages/${list.key}`).on('value', snap => {
            // console.log("abc", snap.val())
            let messages = []
            let objMsg = snap.val()
            for (let key in objMsg) {
                messages.push({ ...objMsg[key], key });
            }

            dispatch({
                type: "SELECTED_GROUP",
                SeletcedGroup: list,
                Messages: messages
            })
        })
    }
}
export const sendMessage = (textMsg, groupKey) => {
    // console.log("Action MSG", textMsg, groupKey)
    return () => {
        //  const sendNotification =  
        //  firebase.database().ref(`messages/`).on('value', snap=>{

        //      console.log("sendNotification", snap)
        //  })


        let Currentuser = firebase.auth().currentUser.uid

        if (Currentuser) {
            firebase.database().ref(`user/${Currentuser}/`).on('value', snap => {
                // console.log("Snappp", snap.val())
                // console.log("textMsg", textMsg)

                objUser = snap.val()
                let userName = objUser.userName
                let userKey = objUser.userKey
                let rollNumber = objUser.rollNumber
                let phoneNumber = objUser.phoneNumber

                // firebase.database().ref(`messages/`).push(
                //     {
                //         userName,
                //         userKey,
                //         rollNumber,
                //         phoneNumber,
                //         groupKey,
                //         textMsg,
                //     }
                // )

                firebase.database().ref(`messages/${groupKey}`).push(
                    {
                        userName,
                        userKey,
                        rollNumber,
                        phoneNumber,
                        groupKey,
                        textMsg,
                    }
                )
            })
        }
    }
}
// export const getMessageOfSelectedGroup = (grpKey) => {
//     return dispatch => {
//         console.log("getMessageOfSelectedGroup", grpKey)
//         // console.log('dispatch')
//         firebase.database().ref(`messages/${grpKey}`).on('value', snap => {
//             // console.log("getMasges", snap.val())
//             Messages = snap.val()
//             // console.log("Messages", Messages)
//             dispatch({
//                 type: "SELECTED_GROUPMESSAGE",
//                 groupMessages: Messages
//             })
//         })
//     }
// }
