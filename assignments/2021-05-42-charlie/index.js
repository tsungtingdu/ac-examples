// 初始變數
const list = document.querySelector("#my-todo"); // 待辦清單的父元素 (ul)
const addBtn = document.querySelector("#addBtn"); // Add 按鈕
const input = document.querySelector("#newTodo"); // 輸入框
const done = document.querySelector("#my-done"); // 完成的清單 (ul)

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];
for (const todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

// 不新增空字串、或是只有空白字元的內容
// https://stackoverflow.com/a/10262019/15028185
function notEmptyOrSpace(str) {
  return str.trim().length > 0;
}

// write your code here
// add by clicking #addBtn
addBtn.addEventListener("click", () => {
  const todoString = input.value;
  if (notEmptyOrSpace(todoString)) {
    addItem(todoString);
    input.value = "";
  }
});

// add by Enter
input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    addBtn.click();
  }
});

list.addEventListener("click", (event) => {
  // move item to done
  // classList methods:
  // https://www.w3schools.com/jsref/prop_element_classlist.asp
  if (event.target.classList.contains("delete")) {
    const deleteIcon = event.target;
    deleteIcon.classList.remove("delete", "fa", "fa-trash");
    deleteIcon.classList.add("restore", "fas", "fa-trash-restore");
    // 將垃圾桶圖示的前一個sibling element加上.checked
    deleteIcon.previousElementSibling.classList.toggle("checked");
    const li = deleteIcon.parentElement;
    done.appendChild(li);
  }
});

done.addEventListener("click", (event) => {
  if (event.target.classList.contains("restore")) {
    const restoreIcon = event.target;
    restoreIcon.classList.remove("restore", "fas", "fa-trash-restore");
    restoreIcon.classList.add("delete", "fa", "fa-trash");
    restoreIcon.previousElementSibling.classList.toggle("checked");
    const li = restoreIcon.parentElement;
    list.appendChild(li);
  }
});
