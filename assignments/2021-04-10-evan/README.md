# A1_Project

我的餐廳清單
## 網站畫面
![餐廳首頁](https://github.com/Ai-Chen-Hsieh/A1_Project/blob/main/public/A1_%E6%88%91%E7%9A%84%E9%A4%90%E5%BB%B3%E6%B8%85%E5%96%AE.png)


## 功能

- 使用者可以在首頁看見推薦的餐廳清單&推薦指數
- 點擊任一餐廳可以看更詳細的餐廳介紹、地址及圖片
- 使用者可以利用搜尋功能以名稱或種類來尋找餐廳

## 專案執行步驟

1.開啟終端機(Terminal)cd 到存放專案位置執行:

```
git clone https://github.com/Ai-Chen-Hsieh/A1_Project.git
```

2.安裝express (本專案使用版本4.16.4)
```
npm install express
```
3.安裝handlebars(本專案使用版本3.0.0)
```
npm install express-handlebars
```
4.啟動伺服器
```
nodemon app.js
```
終端顯示 `express is running on http://localhost:3000!` 即啟動完成

5.至 http://localhost:3000 開始使用



## 使用工具

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Express](https://www.npmjs.com/package/express) - 應用程式架構 (版本4.16.4)
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎(版本3.0.0)
