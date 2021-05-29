const panel = document.querySelector(".panel");
const todolist = document.querySelector("#my-todo");
const donelist = document.querySelector("#my-done");
const alert = document.querySelector("#alert");
const addBtn = document.querySelector("#addBtn");
const input = document.querySelector("#newTodo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

//完成事項
const dones = [];

const view = {
  
  // display Todo函式
  dispatchTodo(todos) {
    let todoitem = "";
    todos.forEach((todo) => {
      todoitem += `<li >
        <label>${todo}</label>
        <svg id = 'todo' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
          <path id = 'todo' d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
         <path id = 'todo' d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0-alpha/icons/trash-fill.svg" title="search" class="delete">
      </li>
      `;
    });
    return todoitem;
  },
  
    // display Done函式
  dispatchDone(dones) {
    let doneitem = "";
    dones.forEach((done) => {
      doneitem += `<li >
        <label  >${done}</label>
        <svg id = 'done' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
          <path id = 'done' d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z"/>
          <path id = 'done' d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z"/>
        </svg>
        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0-alpha/icons/trash-fill.svg" title="search" class="delete">
      </li>
      `;
    });
    return doneitem;
  },
  
  displayDone() {
    donelist.innerHTML = this.dispatchDone(dones)
  },
  
  displayTodo() {
    todolist.innerHTML = this.dispatchTodo(todos)
  },
  
  //check Todo item
  checkItem(target, list) {
    let item = target.parentElement.firstElementChild.innerText;
    let index = list.indexOf(item)
    todos.splice(index, 1)
    dones.push(item)
  },
  
  //return Done item
  returnItem(target, list) {
    let item = target.parentElement.firstElementChild.innerText;
    let index = list.indexOf(item)
    dones.splice(index, 1)
    todos.push(item)
  },
  
  deleteItem(target, todo, done) {
    let parentElement = target.parentElement;
    let item = target.parentElement.firstElementChild.innerText;
    if (todo.includes(item)) {
      let index = todo.indexOf(item)
      todo.splice(index, 1)
    } else if (done.includes(item)) {
      let index = done.indexOf(item)
      done.splice(index, 1)
    }
  },
}



// Checkinput
function checkInput(input) {
  let inputValue = input.value;

  if (inputValue.replace(/ /g, "") !== "") {
    todos.push(inputValue);
    alert.style.display = "none";
  } else {
    alert.style.display = "flex";
  }
}

// Create
addBtn.addEventListener("click", function () {
  checkInput(input);
  todolist.innerHTML = view.dispatchTodo(todos)
  input.value = "";
});

input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    checkInput(input);
    todolist.innerHTML = view.dispatchTodo(todos)
    input.value = "";
  }
});

panel.addEventListener('click', function(event) {
  let target = event.target
  console.log(target)
  
  if (target.classList.contains('bi-check-circle')) {
    view.checkItem(target, todos)

  } else if (target.id === 'todo') {
    let parent = target.parentElement
    view.checkItem(parent, todos)

  } else if (target.id === 'reboot') {
    let parent = target.parentElement
    view.returnItem(parent, dones)
    
  } else if (target.classList.contains('bi-bootstrap-reboot')) {
    view.returnItem(target, dones)

  } else if (target.classList.contains("delete")) {
    view.deleteItem(target, todos, dones)

  }
  
  //
  view.displayDone()
  view.displayTodo()

})

view.displayTodo()