// 初始變數
const TodoList = document.querySelector("#my-todo");
const addBtn = document.querySelector("#addBtn");
const input = document.querySelector("#newTodo");
const DoneList = document.querySelector("#my-done");
const AllList = document.querySelector("#AllList");
const alert = document.querySelector("#alert");

// 資料
let todos = [
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
  TodoList.appendChild(newItem);
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value;
  if (inputValue.trim().length > 0) {
    addItem(inputValue);
  } else if (inputValue.trim().length == 0) {
    alert.innerText = "Empty item!";
  } 
  //reset alert
   input.addEventListener("focus", function () {
    alert.innerHTML = "";
  });
});

//Enter=Click
input.addEventListener("keypress", function () {
    if (event.key === "Enter") {
      addBtn.click();
    }
  });

// Delete and check
AllList.addEventListener("click", function (event) {
 const target = event.target;
 const parentElement = target.parentElement;

  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.classList.contains("checked")) {
    target.classList.remove("checked");
    TodoList.appendChild(parentElement);
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    DoneList.appendChild(parentElement);
  }
});

