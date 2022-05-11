// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const listAll = document.querySelector("#list-all");
const doneList = document.querySelector("#my-done");
// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}
function addDoneItem(text) {
  console.log(text);
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="done" class="checked">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  doneList.appendChild(newItem);
}
// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value.trim();
  addItem(inputValue);
});
input.addEventListener("keydown", function (event) {
  const inputValue = input.value.trim();

  if (event.key === "Enter") {
    addItem(inputValue);
  }
});
// Delete and check
listAll.addEventListener("click", function (event) {
  const target = event.target;
  let parentElement = target.parentElement;

  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    addDoneItem(target.innerText);
    parentElement.remove();
  }
});
