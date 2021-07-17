# 我的餐廳清單

用 Node.js + Express 製作的餐廳美食網站，將餐廳的基本資料一網打盡，一覽無遺。製作自己的美食地圖，不知道吃什麼的時候，用關鍵字搜尋就對了！

## 功能列表

- 依照餐廳名稱及餐廳類別搜尋
- 檢視餐廳詳細資訊，包含類別、評分、簡介、地址、電話、圖片，點擊連結至Google Maps。
- 自行新增、修改、刪除餐廳資訊

## 專案畫面

![image](https://github.com/rubytsaitw/restaurant-list/blob/main/public/img/index_crud.png)

![image](https://github.com/rubytsaitw/restaurant-list/blob/main/public/img/show.png)

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)
2. [Express.js](https://expressjs.com/)
3. [Handlebars](https://handlebarsjs.com/)

## Install - 安裝流程

1. 開啟終端機(Terminal)，cd 到存放專案本機位置並執行：

```
git clone https://github.com/rubytsaitw/restaurant-list
```

2. 進入專案資料夾

```
cd restaurant_list
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
nodemon app.js
```

6. 若需要範例餐廳資訊，先執行種子檔案

```
npm run seed
```

7. 當 terminal 出現以下字樣，表示啟動完成

```
The Express server is running on http://localhost:3000
```

請至[http://localhost:3000](http://localhost:3000)開始使用程式


## Contributor - 專案開發人員

> [Ruby Tsai](https://github.com/rubytsaitw)