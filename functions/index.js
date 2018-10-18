const functions = require('firebase-functions');
var fetch = require('node-fetch')

const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

exports.pushNot = functions.database.ref('messages/{groupid}/{pushId}').onWrite(res => {
    // console.log("??? res ???", res.after._data.groupKey)
    let groupKey = res.after._data.groupKey
    const payload = {
        notification: {
            title: 'New Message',
            body: 'new messageeee',
            priority: 'high',
            sound: 'default'
        }
    }
    // admin.messaging().sendToDevice("fHHNRO4v52Y:APA91bE3NwcKi9q78vZitgRZRA_9CYbnqbA2HM-vQismY9sjfeNR2JzlGTEzbg5G5unfS8oQUI-Z1mypaaKZxy2zIjqIac4utSq1tCtaQyowzIeQBhYWMAHGwDh9-zVwh0471LMSSCHo", payload)
    // console.log(evt)
    return admin.database().ref(`Groups/${groupKey}/Token`).once("value").then(allToken => {
        if (allToken.val()) {
            // return console.log("avail", allToken.val());
            const token = Object.keys(allToken.val())
            console.log("token????<>", token)
            return admin.messaging().sendToDevice(token, payload)
        } else {
            return console.log("Not avail")
        }
    })
})

exports.abc = functions.https.onRequest((request, response) => {

})
// exports.sendNotification = functions.database.ref('/messages/{id}/{pushId}')
// exports.sendNotification = functions.database.ref('/messages/{pushId}/{pushId}')

// Listens for new messages added to messages/:pushId
// exports.pushNotification = functions.database.ref('/messages/{pushId}')

//     // functions.database.ref('/messages/{id}')


//     .onCreate(event => {
//         const root = event.data.ref.root
//         var messages = []

//         return root.child('/Groups/{pushId}/member/{pushId}').once('value').then(function(snapshot){
//             snapshot.forEach(function(childSnapshot){
//                 var Token = childSnapshot.val().Token
//                 if(Token){
//                     messages.push({
//                         'to': Token,
//                         'body':'New Message '
//                     })
//                 }
//             })
//             return Promise.all(messages)
//         }).then(messages =>{
//             fetch(messages,{
//                 method:'POST', 
//                 header:{
//                     'Accept':'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(mess)
//             })
//         })
//     })