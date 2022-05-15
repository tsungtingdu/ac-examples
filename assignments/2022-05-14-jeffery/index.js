// 初始變數
let list = document.querySelector("#my-todo");
let addBtn = document.querySelector("#add-btn");
let input = document.querySelector("#new-todo");
let done_list = document.querySelector("#done");

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

// write your code here
addBtn.addEventListener("click", function () {
  let inputValue = input.value;
  if (inputValue.trim().length > 0) {
    addItem(inputValue);
  }
});

input.addEventListener("keypress", function (event) {
  let inputValue = input.value;
  if (inputValue.trim().length > 0 && event.key === "Enter") {
    addItem(inputValue);
  }
});

list.addEventListener("click", function (event) {
  let target = event.target;
  if (target.className === "delete fa fa-trash") {
    // let parent = target.parentElement;
    target.parentElement.remove();
  }
  if (target.tagName === "LABEL") {
    let newItem = document.createElement("li");
    newItem.innerHTML = `
    <label class = checked for="todo">${target.innerText}</label>
    <i class="delete fa fa-trash"></i>
  `;
    done_list.appendChild(newItem);
    // let parent = target.parentElement;
    target.parentElement.remove();
  }
});

done_list.addEventListener("click", function (event) {
  let target = event.target;
  if (target.className === "delete fa fa-trash") {
    // let parent = target.parentElement;
    target.parentElement.remove();
  }
});
