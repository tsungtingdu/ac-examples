// 初始變數
let list = document.querySelector("#my-todo");
let addBtn = document.querySelector("#addBtn");
let input = document.querySelector("#newTodo");
let doneList = document.querySelector("#my-done");
let feedback = document.querySelector(".valid-feedback");

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
  let textValue = text.trim().length;
  if (textValue !== 0) {
    newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
    list.appendChild(newItem);
  } else {
    input.classList.add("is-invalid");
    feedback.style.display = "block";
  }
  input.value = "";
}

// Create
addBtn.addEventListener("click", function () {
  let inputValue = input.value;
  addItem(inputValue);
});

input.addEventListener("keypress", function (event) {
  let inputValue = input.value;
  if (event.keyCode === 13) {
    addItem(inputValue);
    }
  });

input.addEventListener("focus", function () {
  if (input.classList.contains("is-invalid")) {
    input.classList.remove("is-invalid");
    feedback.style.display = "none";
  }
});

// Delete and check
list.addEventListener("click", function (event) {
  let target = event.target;
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.parentElement.remove();
    doneItem(target.innerText);
  }
});

doneList.addEventListener("click", function (event) {
  let target = event.target;
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  }
});

function doneItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="done">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  newItem.firstElementChild.classList.toggle("checked");
  doneList.appendChild(newItem);
}
