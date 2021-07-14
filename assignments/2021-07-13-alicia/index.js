const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const users = [] // 宣告 users 陣列容器，用來存放從 API 取得的資料 
let filteredUsers = [] // 儲存符合篩選條件的資料
const dataPanel = document.querySelector('#data-panel') // 存放資料 DOM 元件
// 存放表單 DOM 元件
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const USERS_PER_PAGE = 12 // 每頁只顯示 12 筆資料

// 監聽 data panel
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-user')) {
    showUserModal(event.target.dataset.id) // 取得 id
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

// 監聽 search form
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault() // 取消預設行為
  // 取得搜尋關鍵字
  const keyword = searchInput.value.trim().toLowerCase() // trim 去掉頭尾空格
  // 錯誤處理
  // if (!keyword.length) {
  //   return alert('請輸入有效字串！')
  // }
  // 條件篩選
  filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(keyword)
  )
  // 錯誤處理: 沒有符合條件
  if (filteredUsers.length === 0) {
    return alert('您輸入的關鍵字: ${keyword} 沒有符合條件的資料')
  }
  // 重製分頁器
  renderPaginator(filteredUsers.length)
  // 重新輸出到畫面
  renderUserList(getUsersByPage(1))
})

// 監聽 pagination
paginator.addEventListener('click', function onPaginatorClicked(event) {
  // 如果被點擊的不是 a 標籤，就終止 function
  if (event.target.tagName !== 'A') return
  // 透過 dataset 取得被點擊的頁數
  const page = Number(event.target.dataset.page)
  // 更新畫面
  renderUserList(getUsersByPage(page))
})

// API 請求資料
axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results) // ... 是展開運算子，功用是展開陣列元素
    renderPaginator(users.length) //傳入資料總筆數
    renderUserList(getUsersByPage(1))
  })
  .catch((err) => console.log(err))

// Render User List
function renderUserList(data) {
  let dataHTML = ''
  
  data.forEach((item) => {
    // name, image, id 隨著 item 改變
    dataHTML += `<div class="col-sm-auto">
      <div class="card mb-2">
        <img src="${item.avatar}" class="card-img-top" alt="User Photo">
        <div class="card-body">
          <h5 class="card-title">${item.name} ${item.surname}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-user" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>`
  })
  dataPanel.innerHTML = dataHTML
}

// 收藏按鈕
function addToFavorite(id) {
  // 取在 local storage 的資料，放進收藏清單
  const list = JSON.parse(localStorage.getItem('favoriteUsers')) || []
  // 用 find 到 users 中找出 id 相同的資料回傳，暫存在 user
  const user = users.find((user) => user.id === id) // find 一找到府和條件的項目就會停下來回傳該項目，後面的項目都不再看
  // 錯誤處理: 已經在收藏清單的資料，不應該被重複加
  if (list.some((user) => user.id === id)) {
    return alert('此資料已經在收藏清單中!')
  }
  // 把 user 推進收藏清單內
  list.push(user)
  // 把更新後的收藏清單同步到 local storage
  localStorage.setItem('favoriteUsers', JSON.stringify(list))
}

// 分頁
function getUsersByPage(page) {
  // 如果搜尋清單有東西，就取搜尋清單 filteredUsers，就終止 function
  const data = filteredUsers.length ? filteredUsers : users
  // 計算起始 index
  const startIndex = (page - 1) * USERS_PER_PAGE
  // 回傳切割後的新陣列
  return data.slice(startIndex, startIndex + USERS_PER_PAGE)
}

// Render 分頁
function renderPaginator(amount) {
  // 計算總頁數
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  
  let pageHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    pageHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = pageHTML
}

// 發送 request
function showUserModal(id) {
  const modalName = document.querySelector('#user-modal-title')
  const modalAvatar = document.querySelector('#user-modal-avatar')
  const modalBirthday = document.querySelector('#user-modal-birthday')
  const modalAge = document.querySelector('#user-modal-age')
  const modalGender = document.querySelector('#user-modal-gender')
  const modalRegion = document.querySelector('#user-modal-region')
  const modalEmail = document.querySelector('#user-modal-email')

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data
    modalName.textContent = `${data.name} ${data.surname}`
    modalAvatar.innerHTML = `<img src="${data.avatar}" alt="User Photo" class="img-fluid">`
    modalBirthday.innerText = `Birthday: ${data.birthday}`
    modalAge.innerText = `Age: ${data.age}`
    modalGender.innerText = `Gender: ${data.gender}`
    modalRegion.innerText = `Region: ${data.region}`
    modalEmail.innerText = `Email: ${data.email}`
  })
}

