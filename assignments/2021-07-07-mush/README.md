# 餐廳清單
一個用Express和MongoDB所建立的餐廳清單，可以瀏覽所有餐廳、搜尋特定餐廳、查看餐廳詳細資訊，還可以新增、修改、刪除餐廳資料。

# 專案功能
1. 使用者可以瀏覽全部餐廳
2. 使用者可以查看餐廳詳細資訊
3. 使用者可以依據餐廳名稱、類別搜尋特定餐廳
4. 使用者可以新增餐廳和其相關資訊
5. 使用者可以修改餐廳的資訊
6. 使用者可以刪除餐廳

# 畫面瀏覽
![餐廳清單](/餐廳清單.png)

# 環境建置
- Node.js
- nodemon
- MongoDb
- npm

# 安裝流程
1. 在終端機輸入指令 Clone 此專案至本機電腦
`git clone https://github.com/mush1200/restaurant_list_v2.git`
2. 進入專案目錄
`cd restaurant_list_v2`
3. 安裝相關套件
`npm install`
4. 新增種子資料
`npm run seed`
5. 啟動專案
`npm run dev`
6. 出現以下訊息後，即可在 http://localhost:3000 開始使用
`The Express server is running on http://localhost:3000.`