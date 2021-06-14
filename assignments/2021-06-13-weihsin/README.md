# AC 學期 2-3 ｜ A6:餐廳清單擴充 CRUD 功能

利用 Node.js 和 Express 打造一個簡單的餐廳清單網頁。

## 安裝套件

- Node.js: 10.24.1
- Express: 4.17.1
- Express-Handlebars: 5.3.2
- body-parser: 1.19.0
- mongoose: 5.12.12"
- handlebars-helpers: 0.10.0
- method-override: 3.0.0

## 基本功能

(1)使用者可以在首頁看到餐廳清單和基本資料：

- 照片
- 名稱
- 分類
- 評分

(2)使用者點擊餐廳可以看到餐廳的詳細資訊：

- 類別
- 地址
- 電話
- 描述
- 圖片

(3)使用者可以在首頁透過餐廳名稱或類別查詢餐廳。

(4)打造CRUD功能：
- 使用者可以新增一家餐廳
- 使用者可以瀏覽一家餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳

(5)排序功能：
- 用名字排序
- 用類別排序
- 用地區排序

## Getting Started
Clone respository to your local computer
```
$ git clone https://github.com/naluwan/restaurant_list.git
```
Install by npm
```
$ npm install
```
Execute
```
$ npm run dev
```
Terminal show the message
```
Express is running on localhost:3000
```
Now you can browse the website on
```
http://localhost:3000
```
Update the models seeder
```
$ node models/seeds/restaurantSeeder.js
```
