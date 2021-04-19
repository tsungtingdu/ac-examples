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
const main = document.querySelector("main")

function inputTodo() {
  let inputValue = input.value;

  if (inputValue.length > 0 && Number(inputValue) !== 0) {
    addItem(inputValue);
    input.value = "";
  } 
}


addBtn.addEventListener("click", function () {
  inputTodo();
});

input.addEventListener("keypress", function (event) {
  if (event.code === 'Enter'){
  inputTodo();
  }
});


main.addEventListener("click", function (event) {
  let target = event.target;
  let parentElement = target.parentElement;
  
  if (target.classList.contains("delete")) {
    console.log("1")
    parentElement.remove();
    return
  } else if (target.tagName === "LABEL") {
    console.log("2")
    target.classList.toggle("checked");
  }
  
  if (target.classList[0] === "checked") {
    parentElement.remove();
    doneList.appendChild(parentElement);
    console.log("3")
  } else if (target.classList[0] !== "checked") {
    parentElement.remove();
    list.appendChild(parentElement);
    console.log("4")
  }
});
