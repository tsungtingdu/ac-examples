

# 廣志の私帳
使用 Node.js + Express + express-handlebars + mongoDB 打造的簡易記帳網頁。

### 主要功能
1. 在首頁一次瀏覽所有支出的清單，並且可以在首頁看到所有支出清單的總金額
2. 新增一筆支出、編輯支出的所有屬性、刪除任一筆支出(一次只能刪除一筆)
3. 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。


### Development environment

| Package            | Version  |
| ------------------ | -------- |
| mac Big Sur        | 11.4     |
| VS code            | 1.58.2   |
| Node.js            | v14.12.0 |
| Npm                | 6.14.8   |
| Nodemon            | 2.0.7    |
| Express            | 4.17.1   |
| Express-handlebars | 5.3.2    |
| Mongoose           | 5.13.2   |
| MongoDB            | 4.2.5    |


### Installing

1. 透過 https 取得此專案

```bash
$ git clone https://github.com/kusasen/expense-tracker.git
```

2. 安裝 node module

```bash
$ cd expense-tracker
$ npm install
```

3. 載入 Restaurants Seeds

本專案需在 local 建立 MongoDB 並且使用預設 port 27017。

```bash
$ npm run seed
```

4. 透過 npm 在 local 啟動 web server

```bash
$ npm run dev
App is running on http://localhost:3000
```

5. 透過 Browser 打開 [http://localhost:3000](http://localhost:3000)
