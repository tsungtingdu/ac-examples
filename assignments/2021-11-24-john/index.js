const express = require("express");
const { engine } = require("express-handlebars");
const port = 3000;
const app = express();
const restaurantList = require("./restaurant.json");

app.engine(
  "handlebars",
  engine({ extname: ".handlebars", defaultLayout: "main" })
);
app.set("view engine", "handlebars");
app.use(express.static("public"));

// index頁面 餐廳data
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

// show頁面 餐廳詳細資料
app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (res) => res.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurantInfo: restaurant });
});

//search功能
app.get("/search", (req, res) => {
  // console.log("req.query", req.query);
  const keyword = req.query.keyword;
  const restaurantSearch = restaurantList.results.filter((restau) => {
    return (
      restau.category.toLowerCase().includes(keyword.toLowerCase()) ||
      restau.name.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  res.render("index", { restaurants: restaurantSearch });
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});