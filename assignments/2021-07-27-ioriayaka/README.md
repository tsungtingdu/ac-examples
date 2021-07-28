# 短網址產生器 URL Shortener
用Express和MongoDB建立的短網址產生器。
# 功能介紹
* 在欄位輸入原始網址，送出表單後，會檢測是否為符合URL格式網址，成功即可產生短網址
* 使用者可以按下短網址連結，瀏覽器會導向原本網站
---
# 環境建置
* Visual Studio Code
* Express 4.17.1
* Node.js
* BootStrap v4.3
* express-handlebars 5.3.2
* Body-parser 1.19.0
* mongoose 5.12.0
* valid-url 1.0.9
---
# 安裝流程
1. 開啟終端機，並cd 要放專案的位置並執行:

```
git clone https://github.com/ioriayaka/shortURL-epress.git
```

2. 進入專案資料夾

```
cd shortURL-epress.git
```

3. 安裝 npm 套件

```
npm install
```

4. 安裝 nodemon 套件 (若未安裝)

```
npm install -g nodemon
```

5. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

6. 當終端機出現以下字樣，表示啟動完成

```
The Express server is running on http://localhost:3000
```