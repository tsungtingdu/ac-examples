// 初始變數
let list = document.querySelector('#my-todo')
let addBtn = document.querySelector('#addBtn')
let input = document.querySelector('#newTodo')
let mydone = document.querySelector('#my-done') // done list
let allmytodo = document.querySelector('.m-5') // 為了讓 done 也能回去，新增的 call

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
// 新增空白不能列入：https://www.itread01.com/content/1549895602.html #9
  if (inputValue.length > 0 && inputValue.trim().length) { 
    addItem(inputValue)
  }
})

// 按 Enter也可以
input.addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    addBtn.click()
    input.value = "" // 觀摩後結果：如果輸入完 input 就把 input.value 變成空值
  }
})

// Delete and check
allmytodo.addEventListener('click', function (event) {
  let target = event.target
  if (target.classList.contains('delete')) {
    let parentElement = target.parentElement
    parentElement.remove()
  } else if (target.tagName === 'LABEL') { 
    // 完成一項 to-do 時，完成的 to-do 會被送進另一個清單
    let checklist = target.classList.toggle("checked") // https://chiayilai.com/javascript-%E6%9C%80%E5%A5%BD%E7%94%A8%E7%9A%84%E4%B8%80%E6%8B%9B-toggle-class/
    if (checklist === true) {
      // 移至 Done 
      mydone.appendChild(target.parentElement)
    } else {
      // Done 轉回 Todo
      list.appendChild(target.parentElement)
    }
  }
})

// 助教好，幾點想確認一下認知：

// Q1：第 38 行，原本卡住一陣子，不知道 if 完後應該要怎麼樣的程式進入迴圈，觀摩同學作業後發現有這種用法，請問可以理解為迴圈內 call  一次 addBtn 的 click event 嗎？
// Q2：第 37 行，看題目是 == ，改成 === 會不會比較好？
// Q3：第 39 行，若想讓 enter 及 手動 addbtn 都能讓輸入後的值為空，要怎麼處理比較好？