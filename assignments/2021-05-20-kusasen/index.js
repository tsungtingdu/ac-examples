// 初始變數
let list = document.querySelector("#my-todo");
let doneList = document.querySelector("#done-todo");
let addBtn = document.querySelector("#addBtn");
let input = document.querySelector("#newTodo");
let msg = document.querySelector('#msg')

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
  input.value = '';
  input.classList.remove('is-invalid');
}

function checkInput(inputValue){
  let msgInfo = '';
  if(inputValue.trim().length < 1){
    msgInfo = 'Empty item!!';
    msg.textContent = msgInfo;
    input.classList.add('is-invalid');
    input.value = ''
  }else{
    addItem(inputValue);
  }
}


// Create
addBtn.addEventListener("click", function () {
  checkInput(input.value);
});

// Press Enter key and create a new todo
input.addEventListener('keypress',function(event){
  if(event.key === 'Enter'){
    checkInput(input.value);
  }
});

// change todo and done list
list.addEventListener("click",(event)=>checkTodo(event.target,doneList));
doneList.addEventListener("click",(event)=>checkTodo(event.target,list));


function checkTodo(target,list){
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
    return;
  }
  
  if(target.tagName === 'LABEL'){
    list.appendChild(event.target.parentElement);
    target.classList.toggle('checked');
  }
}
