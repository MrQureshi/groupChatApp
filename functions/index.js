const functions = require('firebase-functions');
var fetch = require('node-fetch')

const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

exports.pushNotifications = functions.database.ref('messages/{groupid}/{pushId}').onWrite(res => {
    // console.log("??? res ???", res)
    // console.log("data ???", res.after._data)
    let groupKey = res.after._data.groupKey
    // let Name = res.after._data.userName
    let groupName = res.after._data.groupName
    let msg= res.after._data.textMsg    
    
    const payload = {
        notification: {
            title: groupName,
            body: msg,
            priority: 'high',
            sound: 'default'
        }
    }
    // admin.messaging().sendToDevice("fHHNRO4v52Y:APA91bE3NwcKi9q78vZitgRZRA_9CYbnqbA2HM-vQismY9sjfeNR2JzlGTEzbg5G5unfS8oQUI-Z1mypaaKZxy2zIjqIac4utSq1tCtaQyowzIeQBhYWMAHGwDh9-zVwh0471LMSSCHo", payload)
    // console.log(evt)
    return admin.database().ref(`Groups/${groupKey}/member`).once("value").then(allToken => {
        // console.log("refAllToken", allToken.val() )
        let obj = allToken.val()
        let getTokens = []
        for(let key in obj){
            // console.log("TTT",obj[key].Token)
            getTokens.push(obj[key].Token)

        }
        // console.log("what", getTokens)
        if (getTokens) {
            // return console.log("avail", allToken.val());
            const token = getTokens
            console.log("avail", token)
            return admin.messaging().sendToDevice(token, payload)
        } else {
            return console.log("Not avail")
        }
    })
})
