// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
//增加done區域//
const doneTodo = document.querySelector("#alreday-done")

// 資料
let todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo)
}

// 函式
function addItem(text) {
  let newItem = document.createElement("li")
  newItem.innerHTML =  `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

//增加禁止僅空白鍵輸入的函數//
function addNewTodos(){
  const inputValue = input.value
  input.value = "";
  if (inputValue.trim().length> 0){
    addItem(inputValue)
    input.placeholder = "add item"
  }else {
    input.placeholder = "it's invalid"
  }
}

// Create
addBtn.addEventListener("click", addNewTodos)

//連結到enter鍵//
document.addEventListener('keypress', function(event) {
const inputValue = input.value
        if (event.key==="Enter") {
          addNewTodos (inputValue)
          ;
        }

    })

// Delete and checked move to Done 
list.addEventListener("click", function (event) {
  const target = event.target
  
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement
    parentElement.remove()
  } else if (target.tagName === "LABEL") {
  let parentElement = target.parentElement; 
   target.classList.toggle("checked")
    parentElement.remove()
   doneTodo.appendChild(parentElement)
    
  }
})


//在Done的部分，也可以delete跟移回to do list//
doneTodo.addEventListener("click", function (event) {
  const target = event.target
  
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement
    parentElement.remove()
  } else if (target.tagName === "LABEL") {
  let parentElement = target.parentElement; 
     target.classList.toggle("checked")
  parentElement.remove()
  list.appendChild(parentElement)
    
  }
})