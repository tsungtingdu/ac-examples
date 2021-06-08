// ========== 宣告變數 ==========
const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const USERS_PER_PAGE = 12
let searchArray = []
let page = 1
const querySelectorObject = {
  //Panels
  panel: document.querySelector('#panel'),
  //Modals
  modalImage: document.querySelector('#modal-image'),
  modalName: document.querySelector('#modal-name'),
  modalAge: document.querySelector('#modal-age'),
  modalNationality: document.querySelector('#modal-nationality'),
  modalBirthday: document.querySelector('#modal-birthday'),
  modalEmail: document.querySelector('#modal-email'),
  //Search
  searchForm: document.querySelector('#search-form'),
  searchResult: document.querySelector('#search-result'),
  //Favorite
  deleteItem: document.querySelector('#delete-item'),
  // Pagination
  pagination: document.querySelector('.pagination'),
}

// ========== Controller Layer ==========
// 抓取使用者資料
let userArray = [] //存放使用者資料
userArray.push(...JSON.parse(localStorage.getItem('user')))
let firstPageUsers = userArray.slice(0, 12)
renderPanel(firstPageUsers) // 渲染網頁Panel(前12位使用者)
paginator(userArray.length)

// 管理panel-cards的點擊
querySelectorObject.panel.addEventListener('click', function panelClick(event) {
  if (event.target.matches('.drink-button')) { //監聽modal
    let id = INDEX_URL + event.target.dataset.id
    renderModal(id)
  } else if (event.target.matches('#delete-item')) { //監聽favorite
    deleteFavorite(Number(event.target.dataset.id))
  }
})

// Search Bar監聽器
querySelectorObject.searchForm.addEventListener('submit', function onSearchBarClicked(event) {
  event.preventDefault()
  // 關鍵字去掉前後的空白，並小寫
  const keyword = querySelectorObject.searchResult.value.trim().toLowerCase()

  // 使用者體驗-輸入空白值時警告
  if (!keyword.length) {
    alert('Invalid search!')
  }
  // 使用者裡面有滿足name or surname符合搜尋關鍵字者，加入搜尋顯示的清單
  searchArray = userArray.filter(user => user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword))
  // 搜尋不到使用者
  if (!searchArray.length) {
    alert('Couldn\'t find the user!')
  }
  // 更改paginator
  paginator(searchArray.length)
  renderPanel(getMovieByPage(1))
})

// 監聽分頁器
querySelectorObject.pagination.addEventListener('click', function onPaginatorClicked(event) {
  page = Number(event.target.dataset.page)
  renderPanel(getMovieByPage(page))
})


// ========== Management Layer ==========
// ========== 函式區 ==========

function renderPanel(array) {
  let rawHTML = ''
  array.forEach((item) => {
    rawHTML += `
    <div class="col-sm-auto">
      <div class="card md-auto" style="width: 9rem;">
          <img src="${item.avatar}" class="card-img-top" alt="panel-avatar">
          <div class="card-body">
            <h5 id="card-title" class="d-flex justify-content-center">${item.name} ${item.surname}</h5>
            <!-- Button trigger modal -->
            <button type="button" class="drink-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${item.id}">
              hello!
            </button>
            <button type="button" class="btn btn-warning" id="delete-item" data-id="${item.id}">X</button>
          </div>
        </div>
    </div>
    `
    querySelectorObject.panel.innerHTML = rawHTML
  })
}

function renderModal(id) {
  axios.get(id).then(function importData(response) {
    let user = response.data
    querySelectorObject.modalImage.innerHTML = `<img src="${user.avatar}" id="modal-user-avatar" alt="modal-avatar">`
    querySelectorObject.modalName.innerHTML = `${user.name} ${user.surname}`
    querySelectorObject.modalAge.innerHTML = `Age: ${user.age}`
    querySelectorObject.modalNationality.innerHTML = `Currrently living : ${user.region}`
    querySelectorObject.modalBirthday.innerHTML = `Birthday is : ${user.birthday}`
    querySelectorObject.modalEmail.innerHTML = `Email: ${user.email}`
  }).catch((err) => console.log(err))
}

// 刪除收藏清單的使用者
function deleteFavorite(id) {
  let index = userArray.findIndex(user => user.id === id)
  let favoriteUserIndex = searchArray.findIndex(user => user.id === id)
  userArray.splice(index, 1)
  searchArray.splice(favoriteUserIndex, 1)
  localStorage.setItem('user', JSON.stringify(userArray))
  if (Math.ceil(userArray.length/12) !== page) {
    page--
  }
  paginator(userArray.length)
  renderPanel(getMovieByPage(page))
}

// 計算分頁、分頁器
function paginator(users) {
  let pages = Math.ceil(users / USERS_PER_PAGE)
  let rawHTML = ''
  for (let i = 1; i <= pages; i++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`
  }
  querySelectorObject.pagination.innerHTML = rawHTML
}

// 回傳該分頁的資料陣列
function getMovieByPage(currentpage) {
  let startIndex = (currentpage - 1) * USERS_PER_PAGE // 切割起點
  let endIndex = startIndex + 12  // 切割終點
  let data = searchArray.length ? searchArray : userArray //判斷是放"所有資料的陣列"還是"搜尋的陣列"
  return data.slice(startIndex, endIndex) //渲染網頁
}