// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const done = document.querySelector('#done');

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
function addItem (text) { //add To Do
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>`;
  list.appendChild(newItem);
}

function addDone (text) { //add Done
  let doneItem = document.createElement("li");
  doneItem.innerHTML = `
    <label for="done">${text}</label>
    <i class="delete fa fa-trash"></i>`;
  done.appendChild(doneItem);
}

// 點擊 Add 新增
addBtn.addEventListener("click", function () {
  const inputValue = input.value;

  if (inputValue.length > 0) {
    addItem(inputValue);
  } else {
    input.classList.toggle("is-invalid")
  }
});

// 按下 Enter 新增
input.addEventListener("keypress", function (event) {
  input.classList.remove("is-invalid")
  const inputValue = input.value.trim();
  
  if (event.key === "Enter") {
    if (inputValue.length > 0) {
      addItem(inputValue);
    } else {
      input.classList.add("is-invalid")
    }
  }
})

// 點擊 To Do送到 Done 與刪除 To Do
list.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    addDone(target.innerText);
    target.parentElement.remove();
  }
});

// 點擊 Done 送到 To Do 與刪除 Done
done.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    addItem(target.innerText);
    target.parentElement.remove();
  }
});