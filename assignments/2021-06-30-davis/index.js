// 初始變數
const myTodo = document.querySelector("#my-todo")
const done = document.querySelector("#done")

const addBtn = document.querySelector("#add-btn")
const input = document.querySelector("#new-todo")

const guide = document.querySelector(".guide")
const todoList = document.querySelector(".todo-list")
const doneList = document.querySelector(".done-list")
// 資料
let todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];
//預設載入todo list內容
for (let todo of todos) {
  addItem(todo)
}

//即時監聽『input』，顯示狀態
input.addEventListener('keyup', (event)=>{
  checkInput (input.value)
  if (event.key === 'Escape') {
    input.classList.remove('is-invalid')
    input.value= ''
  }
})

// 規格1:改寫Create
addBtn.addEventListener("click", function () {
  if (checkInput (input.value)) {
    addItem(input.value)
  }
})

//規格 2:監聽ENTER
input.addEventListener('keypress', (event)=>{
  if (event.key === "Enter" && checkInput (input.value)){
    addItem(input.value)
  }
})

//規格 3： 改寫Delete and check
myTodo.addEventListener("click", function (event) {
  let target = event.target
  let item = event.target.parentElement
  
  if (target.classList.contains("delete")) {
    item.remove()
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked")
    done.append(item)
  }
})

done.addEventListener('click', (event)=>{
  let target = event.target
  let item = event.target.parentElement
  if (target.tagName === "LABEL") {
    target.classList.toggle("checked")
    myTodo.append(item)
  }else if (target.matches('.delete')){
    item.remove()
  }
})


// 函式
//新增to-do
function addItem(text) {
  let newItem = document.createElement("li")
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  myTodo.appendChild(newItem)
  input.value= ''
}

//檢查『input』是否空白
function checkInput (inputValue) {
  inputValue = inputValue.trim()
  if (inputValue.length > 0) {
    input.classList.remove('is-invalid')
    return true
  }else {
    input.classList.add('is-invalid')
    return false
  }
}

//todo list操作提示
todoList.addEventListener('mouseenter', (event)=>{
    guide.innerText = '點擊待辦事項，可移入完成清單'
    guide.classList.toggle('visible')
})
todoList.addEventListener('mouseleave', (event)=>{
  guide.classList.toggle('visible')
})


//done list操作提示
doneList.addEventListener('mouseenter', (event)=>{
    guide.innerText = '點擊已完成事項，可重新移回待辦事項'
    guide.classList.toggle('visible')
})
doneList.addEventListener('mouseleave', (event)=>{
  guide.classList.toggle('visible')
})