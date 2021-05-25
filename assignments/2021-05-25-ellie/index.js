// 初始變數
let newTodo = document.querySelector('#newTodo')
let addBtn = document.querySelector('#addBtn')
let myList = document.querySelector('#myList')
let myTodo = document.querySelector('#myTodo')
let myDone = document.querySelector('#myDone')

// 資料
const todos = [
  'Hit the gym', 
  'Read a book', 
  'Buy eggs', 
  'Organize office', 
  'Pay bills'
]
for (let todo of todos) {
  addItem(todo)
}

// 函式
function addItem (text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  myTodo.appendChild(newItem)
}

// 新增
addBtn.addEventListener("click", function () {
  let newTodoValue = newTodo.value
  if (newTodoValue.length > 0 && newTodoValue.split(" ").join("").length !== 0) {
    addItem(newTodoValue)
  }
})

// 按下 Enter 時，一樣可以新增 to-do
newTodo.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    let newTodoValue = newTodo.value
    if (newTodoValue.length > 0 && newTodoValue.split("").join("").length !== 0) {
      addItem(newTodoValue)
    }
  }
})

// 刪除項目
myList.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;
   if (target.classList.contains("delete")) {
    // delete items
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    // checked items
    target.classList.toggle("checked");
    // move between lists
    const newItem = document.createElement("li");
    newItem.innerHTML = parentElement.innerHTML;
    parentElement.remove();
    if (target.classList.contains("checked")) {
      // move to donelist
      myDone.appendChild(newItem);
    } else {
      // move back to todolist
      myTodo.appendChild(newItem);
    }
  }
});