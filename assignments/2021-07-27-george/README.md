# URL Shortener 縮網址工具
此專案可以讓使用者將輸入的網址轉換為短網址，並可以透過短網址前往原先預定的網站。

也可以透過 heroku 連結使用本專案：https://aqueous-savannah-04187.herokuapp.com/

## 功能
- 使用者可以輸入目標網址，並轉換成格式一致的短網址。
- 使用者可以直接點擊網頁上的複製按鈕將結果複製到剪貼簿中。

## 環境
- Node.js v10.15.0
- express v4.17.1
- express-handlebars v5.3.2
- mongoose v5.13.2
- mongodb v4.2.14

### 安裝
1. 開啟終端機(Terminal)將此專案Clone至本機電腦
```
git clone https://github.com/Flipapa/URL-Shortener.git
```
2. 進入存放此專案的資料夾
```
cd URL-Shortener
```
3. 安裝 npm 套件
```
npm install
```
4. 啟動 mongoDB，並在本地建立 url-shortener 資料庫
5. 啟動網頁伺服器
```
npm run dev
```
當 Terminal 出現以下文字表示成功連結本地伺服器
```
Express is listening on localhost:3000
```
6. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案