# line-bot

---

## line-bot 介紹
```
這是個 line-bot 玩具，
當輸入特定文字會秀出相關的文字或圖片
```

---

## 開發環境

### 1. [註冊LINE Channel](https://developers.line.biz/zh-hant/)

### 2. 建立自己的 .env
```
CHANNEL_ID=<Channel ID>
CHANNEL_SECRET=<Channel Secret>
CHANNEL_ACCESS_TOKEN=<Channel Access Token>
```

### 3. 啟動程式

```
npm run server
```

### 4. 啟動 ngrok

#### 前言
```
Line 官方規定要使用 webhook，
我們假如只是本地開發或測試玩玩，可以使用 ngrok
```

#### ngrok
```
ngrok 可以讓產生一個暫時的 public domain(免費方案)，
讓外網可以連到你 local 的程式同時支援https協定
```

安裝 ngrok (以 ｍac 環境為例)
```
brew cask install ngrok
```

#### 步驟

1. 啟動 ngrok
    ```
    ngrok http 3000
    ```

2. 到 Line Bot 後台輸入 webhook api
    ```
    // 注意：webhook 填入 Webhook URL + Bot 所監聽的webhook 路徑
    https://xxxxxc.ngrok.io/linewebhook
    ```

---

## 參考
- [手把手教你建聊天機器人(linebot+nodjes+ngrok)](https://medium.com/@mengchiang000/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E5%BB%BA%E8%81%8A%E5%A4%A9%E6%A9%9F%E5%99%A8%E4%BA%BA-linebot-nodjes-ngrok-7ad028d97a07)