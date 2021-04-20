// 初始變數
let list = document.querySelector("#my-todo");
let addBtn = document.querySelector("#addBtn");
let input = document.querySelector("#newTodo");

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
// addBtn.addEventListener("click", function () {
//   let inputValue = input.value;

//   if (inputValue.length > 0) {
//     addItem(inputValue);
//   }
// });

// Delete and check
// list.addEventListener("click", function (event) {
//   let target = event.target;
//   if (target.classList.contains("delete")) {
//     let parentElement = target.parentElement;
//     parentElement.remove();
//   } else if (target.tagName === "LABEL") {
//     target.classList.toggle("checked");
//   }
// });

// MY CODE
const doneList = document.querySelector("#my-todo-done");
const main = document.querySelector("main");

function inputTodo() {
  let inputValue = input.value;

  if (inputValue.trim().length !== 0) {
    addItem(inputValue);
    input.value = "";
  } else {
    alert("===Oops! 是不是沒輸入什麼呢?===");
  }
}

function checkedTodo(todo) {
  if (!todo.matches("label")) {
    return;
  }
  const currentList = todo.matches(".checked") ? list : doneList;
  todo.classList.toggle("checked");
  todo.parentElement.remove();
  currentList.appendChild(todo.parentElement);
}

function deleteTodo(todo) {
  if (!todo.matches(".delete")) {
    return;
  }
  todo.parentElement.remove();
}

function addListener() {
  const allList = document.querySelectorAll("li");
  allList.forEach((list) => {
    list.addEventListener("click", function (event) {
      let target = event.target;
      deleteTodo(target);
      checkedTodo(target);
    });
  });
}

addBtn.addEventListener("click", function () {
  inputTodo();
  addListener();
});

input.addEventListener("keypress", function (event) {
  if (event.code === "Enter") {
    inputTodo();
    addListener();
  }
});

addListener();
