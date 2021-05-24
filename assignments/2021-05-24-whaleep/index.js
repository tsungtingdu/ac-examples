// 初始變數
let todoList = document.querySelector('#my-todo')
let doneList = document.querySelector('#my-done')
let addBtn = document.querySelector('#addBtn')
let input = document.querySelector('#newTodo')

// 資料
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
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
  todoList.appendChild(newItem)
}


// Create
addBtn.addEventListener("click", function () {
  let inputValue = input.value.trim()

  if (inputValue.length > 0) {
    addItem(inputValue)
    input.value = ''
  }
})

input.addEventListener("keypress", function () {
      if(event.keyCode == 13){ addBtn.click() }
})

// Delete and check
todoList.addEventListener('click', function (event) {
  let target = event.target
  if (target.classList.contains('delete')) {
    let parentElement = target.parentElement
    parentElement.remove()
  } else if (target.tagName === 'LABEL') { 
    target.classList.toggle('checked')
    doneList.appendChild(target.parentElement)
  }
})

doneList.addEventListener('click', function (event) {
  let target = event.target
  if (target.classList.contains('delete')) {
    let parentElement = target.parentElement
    parentElement.remove()
  } else if (target.tagName === 'LABEL') { 
    target.classList.toggle('checked')
    todoList.appendChild(target.parentElement)
  }
})