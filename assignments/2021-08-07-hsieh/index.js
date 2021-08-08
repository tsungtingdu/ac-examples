// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#newToDo");
const donelist = document.querySelector("#donelist");

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
  list.appendChild(newItem);
  input.value = "";
}

// Create
addBtn.addEventListener("click", addToDo);

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addToDo();
  }
});

function addToDo() {
  input.value = input.value.trim();
  const inputValue = input.value;

  if (inputValue.length > 0) {
    addItem(inputValue);
    if (input.classList.contains("is-invalid")) {
      input.classList.remove("is-invalid");
    }
  } else {
    if (!input.classList.contains("is-invalid")) {
      input.classList.add("is-invalid");
    }
  }
}

// Delete and check
list.addEventListener("click", function (event) {
  const target = event.target;

  let parentElement = target.parentElement;
  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    parentElement.remove();
    doneList.appendChild(parentElement);
  }
});