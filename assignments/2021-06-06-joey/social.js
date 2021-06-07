// ========== 宣告變數 ==========
const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const USERS_PER_PAGE = 12 
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
let userArray = [] //存放使用者資料
axios.get(INDEX_URL).then(function (response) {
  userArray.push(...response.data.results) //存入使用者資料
  let firstPageUsers = userArray.slice(0, 12)
  renderPanel(firstPageUsers) // 渲染網頁Panel(前12位使用者)
  panelClick()
  paginator(userArray.length)
})

// Search Bar監聽器
querySelectorObject.searchForm.addEventListener('submit', function onSearchBarClicked(event) {
  event.preventDefault()
  // 使用者體驗-輸入空白值時警告
  if (!querySelectorObject.searchResult.value.trim().length) {
    alert('Invalid search!')
  }
  // 關鍵字去掉前後的空白，並小寫
  let keyword = querySelectorObject.searchResult.value.trim().toLowerCase()
 
  const searchArray = []
  // 符合搜尋資料的使用者，加入陣列
  searchArray.push(...userArray.filter(user => user.name.toLowerCase().includes(keyword)))
  searchArray.push(...userArray.filter(user => user.surname.toLowerCase().includes(keyword)))
  // 去掉重複的元素
  removeDuplicate(searchArray)
  // 使用者體驗-搜尋找不到使用者資料時警告
  if (!searchArray.length) {
    alert('Couldn\'t find the user!')
  }
  // 渲染網頁
  renderPanel(searchArray)
})


// ========== Management Layer ==========
// ========== 函式區 ==========
//去除掉陣列裡重複的元素並排序
function removeDuplicate(originArray) {
  let searchArray = originArray.filter(function (element, index, self) {
    return self.indexOf(element.id) === index;
  })
  return searchArray.sort()
}
// 渲染網頁panel
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
function renderModal(id) {  
  axios.get(id).then(function importData(response) {
    let user = response.data
    querySelectorObject.modalImage.innerHTML = `<img src="${user.avatar}" id="modal-user-avatar" alt="modal-avatar">`
    querySelectorObject.modalName.innerHTML = `${user.name} ${user.surname}`
    querySelectorObject.modalAge.innerHTML = `Age: ${user.age}`
    querySelectorObject.modalNationality.innerHTML = `Currrently living : ${user.region}`
    querySelectorObject.modalBirthday.innerHTML =`Birthday is : ${user.birthday}`
    querySelectorObject.modalEmail.innerHTML = `Email: ${user.email}`
  }).catch((err) => console.log(err))
}

// 管理panel-cards的點擊
function panelClick() {
  querySelectorObject.panel.addEventListener('click', function panelClick(event) {
    if (event.target.matches('.drink-button')) { //監聽modal
      let id = INDEX_URL + event.target.dataset.id
      renderModal(id)
    } else if (event.target.matches('#add-to-favorite')) { //監聽favorite
      addToFavoritePerson(Number(event.target.dataset.id))
    }
  })
}

function addToFavoritePerson(id) {
  const list = JSON.parse(localStorage.getItem('user')) || []
  const favoriteUser = userArray.find(user => user.id === id)
  if (list.some(user => user.id === id)) {
    return alert('User has already existed in the favorite page!')
  }
  list.push(favoriteUser)
  localStorage.setItem('user', JSON.stringify(list))
}

// 計算分頁、分頁器
function paginator(users) {
  let pages = Math.ceil(users/USERS_PER_PAGE)
  let rawHTML = ''
  for (let i=0; i<pages; i++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-id="${i}">${i+1}</a></li>`
  }
  querySelectorObject.pagination.innerHTML = rawHTML
}

// 監聽分頁器
querySelectorObject.pagination.addEventListener('click', function onPaginatorClicked(event) {
  let currentIndex = Number(event.target.dataset.id)*USERS_PER_PAGE
  let currentPageUsers = userArray.slice(currentIndex, currentIndex+12)
  renderPanel(currentPageUsers)
})