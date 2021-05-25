let todolist = document.querySelector("#my-todo");
let donelist = document.querySelector("#my-done");
let alert = document.querySelector("#alert");
let addBtn = document.querySelector("#addBtn");
let input = document.querySelector("#newTodo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];
for (let todo of todos) {
  addItem(todo);
}

//完成事項
const dones = [];

// add To Do函式
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <svg id = 'check' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg>
    <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0-alpha/icons/trash-fill.svg" title="search" class="delete">
  `;
  todolist.appendChild(newItem);
}

// display Todo函式
function displayTodo(todos) {
  let todoitem = "";
  todos.forEach((t) => {
    todoitem += `<li>
    <label for="todo">${t}</label>
    <svg id = 'check' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg>
    <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0-alpha/icons/trash-fill.svg" title="search" class="delete">
    </li>
    `;
  });
  return todoitem;
}

// display Done函式
function displayDone(dones) {
  let doneitem = "";
  dones.forEach((d) => {
    doneitem += `<li class = 'checked'>
    <label for="todo" >${d}</label>
    <svg id = 'reboot' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
  <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z"/>
  <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z"/>
</svg>
    <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0-alpha/icons/trash-fill.svg" title="search" class="delete">
    </li>
    `;
  });
  return doneitem;
}

// Checkinput
function checkInput(input) {
  let inputValue = input.value;

  if (inputValue.replace(/ /g, "") !== "") {
    addItem(inputValue);
    alert.style.display = "none";
  } else {
    alert.style.display = "flex";
  }
}

// Create
addBtn.addEventListener("click", function () {
  checkInput(input);
  input.value = "";
});

input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    checkInput(input);
    input.value = "";
  }
});

// todolist Delete and check
todolist.addEventListener("click", function (event) {
  let target = event.target;
  let parentElement = target.parentElement;
  let doneitem = target.parentElement.firstElementChild.innerText;
  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.classList.contains("bi-check-circle")) {
    parentElement.remove();
    dones.push(doneitem);
    donelist.innerHTML = displayDone(dones);
  } 
});

// donelist Delete and check
donelist.addEventListener("click", function (event) {
  let target = event.target;
  let parentElement = target.parentElement;
  let doneitem = target.parentElement.firstElementChild.innerText;
  if (target.classList.contains("delete")) {
    dones.pop(doneitem);
    parentElement.remove();
  } else if (target.classList.contains("bi-bootstrap-reboot")) {
    parentElement.remove();
    let d = dones.indexOf(doneitem)
    dones.splice(d, 1)
    addItem(doneitem)
  }
});
