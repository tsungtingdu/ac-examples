# 網頁記帳本
利用epxress, mongoose建立一個記帳本!
# 功能介紹
* 使用者可以在首頁或點擊上方瀏覽全部的支出紀錄 及 總金額
* 使用者可以在首頁點擊「類別」來篩選出支出紀錄
* 使用者可以新增一筆支出紀錄
* 使用者可以編輯任何一筆支出紀錄
* 使用者可以刪除任何一筆支出紀錄
---
# 環境建置
* Visual Studio Code
* Express 4.17.1
* Node.js
* BootStrap v4.3
* express-handlebars 5.3.2
* Body-parser 1.19.0
* mongoose 5.12.0
---
# 安裝流程
1. 開啟終端機，並cd 要放專案的位置並執行:

```
git clone https://github.com/ioriayaka/expense-tracker.git
```

2. 進入專案資料夾

```
cd expense-tracker
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