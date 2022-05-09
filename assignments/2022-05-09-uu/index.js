// 初始變數
const list = document.querySelector("#my-todo");
const doneList = document.querySelector("#my-done");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
input.addEventListener("keydown", function () {
  if (event.key === "Enter") {
    const inputValue = input.value.trim();
    if (inputValue.length > 0) {
      addItem(inputValue);
    }
  }
});
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

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value.trim();

  if (inputValue.length > 0) {
    addItem(inputValue);
  }
});
var deleteAndCheck = function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (
    target.tagName === "LABEL" &&
    !target.classList.contains("checked")
  ) {
    doneList.append(event.target.parentElement);
    target.classList.toggle("checked");
  }
};

// Delete and check
list.addEventListener("click", deleteAndCheck);
doneList.addEventListener("click", deleteAndCheck);
