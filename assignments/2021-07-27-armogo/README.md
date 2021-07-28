# 專案簡介
使用restaurant.json檔內8家餐廳資料，運用這些資料做成一個透過Node.js及Express運作的餐廳資訊網頁。

## 功能
1. 首頁上方有search bar讓使用者輸入關鍵字，快速查找餐廳名稱以及餐廳分類

2. 使用可者以在首頁看到所有餐廳的簡單資料：
  - 餐廳照片
  - 餐廳名稱
  - 餐廳分類
  - 餐廳評分

3. 點選個別餐廳後，會導向該餐廳的詳細資訊頁面，顯示:
  - 類別
  - 地址
  - 電話
  - 描述
  - 圖片  

<img src="./public/img/demo.gif" width="1200"></img>

## 安裝
1. 開啟終端機(Terminal)cd 到存放專案本機位置並執行:
```
git clone https://github.com/Armogo/restaunrant-list-run-on-Express.git
```

2. 初始設定

```
cd restaurant-list-run-on-Express-main  //切至專案資料夾

npm install  //安裝套件
```

## 執行程式
1. 開啟程式

```
npm run dev  //執行程式
```
終端機顯示 `Express is listening on localhost:3000` 即成功啟動，請至 http://localhost:3000 體驗程式。

2. 終止執行

在終端機畫面按2次 `Ctrl+C` 終止server運作。

## 使用工具
- Visual Studio Code - 開發環境
- Express 4.17.1 - 應用程式架構
- Express-Handlebars 5.3.2 - 模板引擎
- nodemon - 實時偵測檔案更動部分且自動重新執行應用程式