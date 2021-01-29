const linebot = require('linebot');
const { checkTextKey, getReply } = require('./src/lib/helper');
require('dotenv').config();

// 用於辨識 Line Channel 的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// 當有人傳送訊息給 Bot 時
bot.on('message', (event) => {
  // event.message.text 是使用者傳給 bot 的訊息
  // 使用 event.reply (要回傳的訊息) 方法可將訊息回傳給使用者
  console.log('event', event, event.message.text);
  const text = event.message.text;
  const groupId = event.source.groupId;
  const userId = event.source.userId;
  const key = checkTextKey(text);
  const replyMsg = key && getReply(key);
  console.log('replyMsg', replyMsg);
  event.reply(replyMsg);
});

// Bot 所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});