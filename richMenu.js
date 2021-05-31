

const line = require('@line/bot-sdk');
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const client = new line.Client({
    channelAccessToken: process.env.ACCESSTOKEN
});

const richmenu = {
    size: {
        width: 2500,
        height: 1686
    },
    "selected": false,
    "name": "Nice richmenu",
    "chatBarText": "Tap to open",
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": 2500,
                "height": 1686
            },
            "action": {
                "type": "postback",
                "data": "action=buy&itemid=123"
            }
        }
    ]
}

const createRichMenu = async() => {
    const richMenuId = await client.createRichMenu(richmenu)
    const result =  await client.setRichMenuImage(richMenuId, fs.createReadStream('./images/icons_calendar.png'))
    const result2 =  await client.setDefaultRichMenu(richMenuId)
}

createRichMenu()
    .catch((error) =>
        console.log("error", error)
    )