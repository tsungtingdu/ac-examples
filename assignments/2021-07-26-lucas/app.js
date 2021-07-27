const express = require("express");
const exphbs = require("express-handlebars");
const generateTrash = require("./generate_trash_talk");
const app = express();
const port = 3000;
const target = [
  {
    id: 1,
    title: "工程師",
    title_en: "engineer",
    image:
      "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5668/angry-developer.jpg",
  },
  {
    id: 2,
    title: "設計師",
    title_en: "designer",
    image:
      "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5667/angry-designer.jpg",
  },
  {
    id: 3,
    title: "創業家",
    title_en: "entrepreneur",
    image:
      "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5669/angry-founder.jpg",
  },
];

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { target });
});

app.post("/", (req, res) => {
  const option = req.body.title;
  const trashTalk = generateTrash(option);

  res.render("index", { target, trashTalk, option });
});

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}.`);
});
