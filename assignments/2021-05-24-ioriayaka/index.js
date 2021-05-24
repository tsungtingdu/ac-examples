// 初始變數
let list = document.querySelector('#my-todo')
let addBtn = document.querySelector('#addBtn')
let input = document.querySelector('#newTodo')
let doneList = document.querySelector("#my-done")
let wholeList = document.querySelector("#whole-List")

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
  list.appendChild(newItem)
}

// Create
addBtn.addEventListener("click", function () {
  let inputValue = input.value

  if (inputValue.trim().length > 0) {
    addItem(inputValue)
    input.value=""
  } else {
    alert('請勿空白，需輸入內容')
    input.value=""
  }
})

//設 用Enter 輸入
input.addEventListener('keypress', function(event) {
  let inputValue =input.value
  if (event.keyCode === 13) {
    if (inputValue.trim().length === 0) {
    input.value=""
    alert('請勿空白，需輸入內容')
  } else{
    addItem(inputValue)
    input.value=""
  }
    
  }
})

// delete、checked、append:
wholeList.addEventListener('click', function (event) {
  let target = event.target
  if (target.classList.contains('delete')) {
    let parentElement = target.parentElement
    parentElement.remove();
  } else if (target.tagName === 'LABEL') { 
    target.classList.toggle('checked')
    let parentElement = target.parentElement
    let li = document.createElement('li')
    li.innerHTML = parentElement.innerHTML
    parentElement.remove()
    if (target.classList.contains('checked')) {
      doneList.appendChild(li)
    } else {
      list.appendChild(li)
    }
  }
})

