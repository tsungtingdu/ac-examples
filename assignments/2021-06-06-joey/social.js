// ========== 宣告變數 ==========
const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const USERS_PER_PAGE = 12
const searchArray = []
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
  // Pagination
  pagination: document.querySelector('.pagination')
}

// ========== Controller Layer ==========
// 抓取使用者資料
const userArray = [] //存放使用者資料
axios.get(INDEX_URL).then(function (response) {
  userArray.push(...response.data.results) //存入使用者資料
  const firstPageUsers = userArray.slice(0, 12)
  renderPanel(firstPageUsers) // 渲染網頁Panel(前12位使用者)
  panelClick()
  paginator(userArray.length)
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
  const searchArray = userArray.filter(user => user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword))
  // 搜尋不到使用者
  if (!searchArray.length) {
    alert('Couldn\'t find the user!')
  }
  // 搜尋後先顯示第一頁
  const currentPageUsers = searchArray.slice(0, 12)
  renderPanel(currentPageUsers)
  // 更改paginator
  paginator(searchArray.length)
})

// 監聽分頁器
querySelectorObject.pagination.addEventListener('click', function onPaginatorClicked(event) {
  let currentIndex = Number(event.target.dataset.page) * USERS_PER_PAGE
  let dataArray = []
  searchArray > 0 ? dataArray = searchArray : dataArray = userArray
  let currentPageUsers = dataArray.slice(currentIndex, currentIndex + 12)
  renderPanel(currentPageUsers)
})


// ========== Management Layer ==========
// ========== 函式區 ==========
// 渲染網頁panel-grid
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
            <button type="button" class="btn btn-warning" id="add-to-favorite" data-id="${item.id}">+</button>
          </div>
        </div>
    </div>
    `
    querySelectorObject.panel.innerHTML = rawHTML
  })
}


// 渲染modal
function renderModal(url) {  
  axios.get(url).then(function importData(response) {
    const { avatar, name, surname, age, region, birthday, email } = response.data // 解構附值 destructuring assignment
    querySelectorObject.modalImage.innerHTML = `<img src="${avatar}" id="modal-user-avatar" alt="modal-avatar">`
    querySelectorObject.modalName.innerHTML = `${name} ${surname}`
    querySelectorObject.modalAge.innerHTML = `Age: ${age}`
    querySelectorObject.modalNationality.innerHTML = `Currrently living : ${region}`
    querySelectorObject.modalBirthday.innerHTML =`Birthday is : ${birthday}`
    querySelectorObject.modalEmail.innerHTML = `Email: ${email}`
  }).catch((err) => console.log(err))
}

// 管理panel-cards的點擊
function panelClick() {
  querySelectorObject.panel.addEventListener('click', function panelClick(event) {
    if (event.target.matches('.drink-button')) { //監聽modal
      let url = INDEX_URL + event.target.dataset.id
      renderModal(url)
    } else if (event.target.matches('#add-to-favorite')) { //監聽favorite
      addToFavoritePerson(Number(event.target.dataset.id))
    }
  })
}

function addToFavoritePerson(id) {
  const list = JSON.parse(localStorage.getItem('user')) || []
  if (list.some(user => user.id === id)) {
    return alert('User has already existed in the favorite page!')
  } 
  const favoriteUser = userArray.find(user => user.id === id)
  list.push(favoriteUser)
  localStorage.setItem('user', JSON.stringify(list))
}

// 計算分頁、分頁器
function paginator(users) {
  let pages = Math.ceil(users/USERS_PER_PAGE)
  let rawHTML = ''
  for (let i = 0; i < pages; i++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i+1}</a></li>`
  }
  querySelectorObject.pagination.innerHTML = rawHTML
}