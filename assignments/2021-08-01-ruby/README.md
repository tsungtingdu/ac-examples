# 短網址產生器 - URL Shortener

用 Node.js + Express.js 製作的短網址產生器，在本地端跟雲端都可以執行（運用雲端平台 Heroku 和資料庫 MongoDB）

URL Shortener made by Node.js and Express.js.  Can run via local or cloud server, using Heroku and MongoDB.

## 功能列表 - Function List

- 輸入網址，即可產生短網址
- 一鍵複製（到剪貼簿）
- 輸入的網址不符合網址格式會跳出提醒
- 點擊生成的短網址可自動跳轉至原網址

- Enter original URL, and then the website provides a short URL accordingly
- Copy (to clipboard) by click
- Pops up warning message if the input URL had invalid URL format
- Click on the short URL generated, direct to the original URL

## 專案畫面 - Project Image

![image](https://github.com/rubytsaitw/url-shortener/blob/main/public/img/A12_url-shortener.png)

## 環境建置 - Environment SetUp

1. [Node.js](https://nodejs.org/en/)
2. [Express.js](https://expressjs.com/)
3. [Handlebars](https://handlebarsjs.com/)

## 安裝流程 - Install

1. 開啟終端機(Terminal)，cd 到存放專案本機位置並執行：

```
git clone https://github.com/rubytsaitw/url-shortener
```

2. 進入專案資料夾

```
cd url-shortener
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
node app.js
```

6. 若需要範例資料庫，先執行種子檔案

```
npm run seed
```

7. 當 terminal 出現以下字樣，表示啟動完成

```
The Express server is running on http://localhost:3000
```

請至[http://localhost:3000](http://localhost:3000)開始使用程式

## 於雲端執行 - 免安裝 
## Run in Cloud - no installation needed

點擊專案網址 Click on the project website:
https://very-very-short-url.herokuapp.com/

## Contributor - 專案開發人員

> [Ruby Tsai](https://github.com/rubytsaitw)