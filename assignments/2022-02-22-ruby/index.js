// 初始變數
let myList = document.querySelector("#my-list");
let toDoList = document.querySelector("#my-todo");
let doneList = document.querySelector("#done");
let addBtn = document.querySelector("#add-btn");
let input = document.querySelector("#new-todo");
let body = document.querySelector("body");

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

// function to add todo
function addItem(text) {
  if (text.length > 0) {
    let newItem = document.createElement("li");
    newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
    `;
    toDoList.appendChild(newItem);
  }
  input.value = "";
}

// add event on the button and "Enter" key
addBtn.addEventListener("click", function () {
  let inputValue = input.value;
  addItem(inputValue.trim(" "));
});

body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let inputValue = input.value;
    addItem(inputValue.trim(" "));
  }
});

// Todo & done lists operation
myList.addEventListener("click", function (event) {
  let target = event.target;
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    if (target.classList.contains("checked")) {
      toDoList.appendChild(target.parentElement);
    } else {
      doneList.appendChild(target.parentElement);
    }
    target.classList.toggle("checked");
  }
});
