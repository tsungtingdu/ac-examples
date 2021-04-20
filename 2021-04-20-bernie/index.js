// 初始變數
let list = document.querySelector('#my-todo')
let addBtn = document.querySelector('#addBtn')
let input = document.querySelector('#newTodo')
let unstyledList = document.querySelectorAll('.list-unstyled')
let done = document.querySelector('#done-todo')
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

  if (inputValue.length > 0) {
    addItem(inputValue)
    input.value =''
  }
  else if(inputValue ===''){
    alert('請輸入數值')
    input.value =''
  }
  
})
input.addEventListener('keypress',enterInput)
  function enterInput (event){
    
    let inputValue =input.value
    if(event.keycode === 13 && inputValue.length > 0){
      addItem(inputValue)
    }
    

  }


// Delete and check
unstyledList.forEach(allList => {
allList.addEventListener('click', function (event) {
  let target = event.target
  let parentElement = target.parentElement
  
  if(target.classList.contains('delete')){
    
    parentElement.remove()
  }
  else if(target.tagName === 'LABEL'){
    
    let checked =target.classList.toggle('checked')
    
    if(checked){
         parentElement.remove()
      done.append(parentElement)
  }
    else{
         parentElement.remove()
      list.append(parentElement)
    }

  }})
})