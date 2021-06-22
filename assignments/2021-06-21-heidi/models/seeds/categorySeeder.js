const db = require("../../config/mongoose");
const Category = require("../category");
const mockData = require("../../mock_data/category.json");

db.once("open", () => {
  Category.create(mockData.categorySeeds)
    .then(() => {
      console.log("category seeder done!");
      db.close();
    })
    .catch((error) => {
      console.log(error);
    });
});
