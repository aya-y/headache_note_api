'use strict';
//モジュール呼び出し
const line = require('@line/bot-sdk');

//インスタンス生成
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });

exports.handler = (event, context) => {
  let body = JSON.parse(event.body);
  const events = body.events;
  if (!events.length) {
    let lambdaResponse = {
      statusCode: 200,
      headers: { "X-Line-Status": "OK" },
      body: '{"result":"completed"}'
    };
    context.succeed(lambdaResponse);
    return
  }
  events.forEach(async (event) => {

    let message;

    //イベントタイプごとに関数を分ける
    switch (event.type) {
      //メッセージイベント
      case "message":
        message = messageFunc(event);
        break;
    }

    //メッセージを返信
    if (message != undefined) {
      client.replyMessage(body.events[0].replyToken, message)
        .then((response) => {
          let lambdaResponse = {
            statusCode: 200,
            headers: { "X-Line-Status": "OK" },
            body: '{"result":"completed"}'
          };
          context.succeed(lambdaResponse);
        }).catch((err) => console.log(err));
    } else {
      let lambdaResponse = {
        statusCode: 200,
        headers: { "X-Line-Status": "OK" },
        body: '{"result":"completed"}'
      };
      context.succeed(lambdaResponse);
    }
  });
};

const messageFunc = (e) => {

  //テキストではないメッセージ（画像や動画など）が送られてきた場合はコンソールに「テキストではないメッセージが送られてきました」と出力する
  if (e.message.type != "text") {
    console.log("テキストではないメッセージが送られてきました");
    return;
  }

  // ユーザーから送られてきたメッセージ
  const userMessage = e.message.text;

  //ユーザーに返信するメッセージを作成
  let message;
  message = {
    type: "text",
    text: userMessage
  };

  //送信するメッセージを32行目に返す
  return message;
};
