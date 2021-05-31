// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#addBtn");
const input = document.querySelector("#newTodo");
//新增變數
const done = document.querySelector("#my-done");
const listBody = document.querySelector("#list");

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
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
  //新增list後，清空text，恢復placholder
  input.value=""
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value
  //Trim()移除string開頭和結尾的所有空白字元
  if (inputValue.trim().length > 0) {
    addItem(inputValue);
    input.style.border = "1px solid #ced4da"
  }else{
    input.style.border = "2px solid red"
  }
})

//按下 Enter 鍵時，可以新增 to-do
input.addEventListener("keypress", function(){
  const inputValue = input.value;
  if (event.key === "Enter"){
    if (inputValue.trim().length > 0) {
      addItem(inputValue);
      input.style.border = "1px solid #ced4da"
    } else {
      input.style.border = "2px solid red"
    }
  }
});


// Delete and check and move
listBody.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;
  
   if (target.classList.contains("delete")) {
    parentElement.remove();
  } 
  else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    
    // Todo 和 Done來回移動
    let targetToDo = target.parentElement
    if (target.classList.contains("checked")) {
      done.append(targetToDo)
    }else {
      list.append(targetToDo)
    }
  }
});