// 初始變數
const list = document.querySelector('#my-todo')
const addBtn = document.querySelector('#addBtn')
const input = document.querySelector('#newTodo')
const done = document.querySelector('#my-done')

// 資料
let todos = [
  'Hit the gym', 
  'Read a book', 
  'Buy eggs', 
  'Organize office', 
  'Pay bills'
]

for (let todo of todos) {
  addItem(todo)
}


// function for 新增項目到Todo-list
function addItem (text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
  <label for ="todo">${text}</label>
  <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}
 
// 驗證輸入匡中的內容
function todo(value) {
  if (value.trim().length > 0) {
    addItem(value)
    input.classList.remove('is-invalid')
  } else {
    input.classList.add('is-invalid')
  }
  input.value=''
}

// 建立監聽器 
addBtn.addEventListener('click', function () {
  todo(input.value)
})
  
// 按Enter新增
input.addEventListener('keypress', (event) => {
  if(event.key === "Enter")
    todo(input.value)
})

//  Todo - 刪除以及產生刪除線
list.addEventListener('click', (event) => {
  let target = event.target
  let li = target.parentElement
  if (target.classList.contains('delete')) {
    li.remove()
  } 
  if (target.tagName === 'LABEL') {
    target.classList.toggle('checked')
    done.appendChild(li)
  }
})
  
  //  Done - 刪除以及產生刪除線
done.addEventListener('click', (event) => {
  let target = event.target
  let li = target.parentElement
  if (target.classList.contains('delete')) {
    li.remove()
  } 
  if (target.tagName === 'LABEL') {
    target.classList.toggle('checked')
    list.appendChild(li)
  }
})