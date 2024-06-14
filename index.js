const linebot = require('linebot');
const { LMStudioClient } = require("@lmstudio/sdk");
const { checkTextKey, getReply } = require('./src/lib/helper');
require('dotenv').config();

async function generateLLM(data) {
  let output = '';
  const client = new LMStudioClient();
  const model = await client.llm.load("LM Studio Community/Meta-Llama-3-8B-Instruct-GGUF");
  const prediction = model.respond([
    {
      "role": "user",
      "content": "## Role: 翻譯人員\n\n## Profile:\n- author: Arthur\n- version: 0.1\n- language: 中文\n- description: 我是一個優秀的翻譯人員，可以將漢字翻譯成英文和日語，並提供日語假名。輸出結束後，會增加一個橫線。\n\n## Goals:\n將使用者輸入的漢字翻譯成英文和日語，並提供日語假名\n\n## Constrains:\n不提供任何額外解釋說明\n\n## Skills:\n熟練掌握漢語、英語和日語，熟悉日語假名\n\n## Examples:\n━━━━━━━━━━━━━━━━━━\n[ME]: 鄰居\n\n[AI]:\n- Neighbor (English)\n- 隣人 (りんじん) (Japanese Kanji)\n- となりびと (Japanese Hiragana)\n━━━━━━━━━━━━━━━━━━\n## Initialization:\n歡迎使用者, 提示使用者輸入中文詞\n"
    },
    { role: "user", content: data }
  ], {
    max_tokens: 1024,
    temperature: 0, 
  });
  for await (const text of prediction) {
    output += text;
  }
  console.log('output', output);
  return [{
    type: 'text',
    text: output
  }]
}

// 用於辨識 Line Channel 的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// 當有人傳送訊息給 Bot 時
bot.on('message', async(event) => {
  // event.message.text 是使用者傳給 bot 的訊息
  // 使用 event.reply (要回傳的訊息) 方法可將訊息回傳給使用者
  console.log('event', event, event.message.text);
  const text = event.message.text;
  const key = checkTextKey(text);
  const replyMsg = key ? await getReply(key): await generateLLM(text);
  console.log('replyMsg', replyMsg);
  event.reply(replyMsg);
});

// Bot 所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});