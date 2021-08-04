// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const done = document.querySelector("#done-todo")

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
function addItem (text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value;

  if (checkTodo(inputValue)) {
    addItem(inputValue);
    input.value = ""
  }
});

// Delete and check
list.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    done.appendChild(target.parentElement)
  }
});

//  check value
function checkTodo(text) {
  if (text.trim().length <= 0) {
    alert('Empty Item !!')
  } else return text
}

//  keypress input
input.addEventListener('keypress', (enter) => {
  if (enter.key === 'Enter') {
    let value = input.value
    if (checkTodo(value)) {
      addItem(value)
      input.value = ""
    }
  }
})

// DONE 
done.addEventListener('click', (event) => {
  const target = event.target
  let parentElement = target.parentElement
  if (target.matches('.delete')) {  
    parentElement.remove()
  } else if (target.tagName === 'LABEL') {
    parentElement.remove()
    list.appendChild(parentElement)
    target.classList.remove('checked')
  }
} )

// 測試setCustomValidity(message)
// addBtn.addEventListener('click', checkTodo)
// function checkTodo() {
//   let checkText = input.value
//   if (input.validity.valueMissing) {
//     input.setCustomValidity('Empty Item !')
//   }
// }