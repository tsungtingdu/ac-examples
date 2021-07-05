// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const doneList = document.querySelector("#my-done");

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
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="thing">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

// START HERE
// 防止產生空白並新增todo函式
function checkAndAdd() {
  const inputValue = input.value.trim();
  if (inputValue.length > 0) {
    addItem(inputValue);
  } else {
    input.classList.add("is-invalid");
  }
  input.value = "";
}

// Add 按鈕監聽
addBtn.addEventListener("click", function () {
  checkAndAdd();
});

// 按下 Enter 鍵時，可以新增todo
input.addEventListener("keypress", function () {
  if (event.key === "Enter") {
    checkAndAdd();
  }
});

// 點擊完成的todo 時，該項目會被送進 Done 清單

list.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;

  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.add("checked");
    doneList.innerHTML += parentElement.outerHTML;
    parentElement.remove();
  }
});

doneList.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;

  if (target.classList.contains("delete")) {
    parentElement.remove();
  }
});
