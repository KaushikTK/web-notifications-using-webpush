const PUBLIC_VAPID_KEY = 'BI1eJOL6QMXlOcvKDuU_J9CN9Hfe1moqO0T9xhd56JEJwPK2ZXWAmIfNjxPpXHKtojWS4Pu5xW-cM2q_Rrs0Ph4'

const send = async ()=>{
    // first register service worker
    console.log('registering service worker')
    const register = await navigator.serviceWorker.register('/worker.js')
    console.log('service worker registered')

    // now register push
    console.log('registering push')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: PUBLIC_VAPID_KEY
    })
    console.log('push registered');

    // send push notification
    console.log('sending push notification to the backend')
    fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })

    console.log('push sent to the backend')
}

if('serviceWorker' in navigator){
    send()
}
