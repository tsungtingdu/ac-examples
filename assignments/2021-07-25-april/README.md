# Expense-Tracker
這是一個 Node.js + Express 連結資料庫，打造的簡易支出記帳網站

## Features - 產品功能
- 首頁可以瀏覽所有支出的清單
- 首頁可以瀏覽支出清單的總金額
- 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。
- 使用者可以新增一筆支出
- 使用者可以編輯支出的所有屬性 (一次只能編輯一筆)
- 使用者刪除任何一筆支出 (一次只能刪除一筆)

## Prerequisites - 環境建置與需求
- [Node.js](https://nodejs.org/en/) - Node.js
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Express](https://github.com/Eason0in/Restaurant-CRUD) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [Mongodb](https://www.mongodb.com/) - 資料庫
- [Mongoose](https://github.com/Automattic/mongoose) - 提供給 Node.js 使用的 MongoDB ODM

## Installing - 安裝流程
1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/RunChenn/Expense-Tracker.git
```

2. 進入至專案資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
npm install
```

4. 加入種子資料

```
npm run seed
```

5. 執行程式

```
npm run dev
```

6. 當 terminal 出現以下字樣，代表執行成功

```
Express is listening on localhost: 3000.
```

請至 [http://localhost:3000](http://localhost:3000) 開始使用！

## Developer
[Run Chen](https://github.com/RunChenn)# Expense-Tracker
