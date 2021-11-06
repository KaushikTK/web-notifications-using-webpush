const express = require('express')
const webpush = require('web-push')
const bodyparser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname,'client')))
app.use(bodyparser.json())

/* run this in the terminal to get the keys => .\node_modules\.bin\web-push generate-vapid-keys */
const PUBLIC_VAPID_KEY = 'BI1eJOL6QMXlOcvKDuU_J9CN9Hfe1moqO0T9xhd56JEJwPK2ZXWAmIfNjxPpXHKtojWS4Pu5xW-cM2q_Rrs0Ph4'
const PRIVATE_VAPID_KEY = 'SS_3Il99FRVKi1L6YQJL5iaktan1xr2QDMbxo917IkI'

let subscriptions = []

webpush.setVapidDetails('mailto:test@test.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)

// subscribe route
app.post('/subscribe', (req,res)=>{
    // get push subscription object
    const subscription = req.body
    subscriptions.push(subscription);
    console.log(subscription)
    // send status 201 - resource created
    res.status(201).json({})

    // create payload
    const payload = JSON.stringify({
        title:'Push Test'
    })

    // send notification
    webpush.sendNotification(subscription,payload).catch(er=>{
        console.log('some error while sending the notification');
        console.error(er);
    })

})

const port = 5000
app.listen(port,()=>{console.log(`listening at port ${port}`)})