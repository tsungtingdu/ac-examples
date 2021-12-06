// variable
// API
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

// 渲染user
const userPanel = document.querySelector('#user-panel')
const userList = []

// 搜尋user
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
// 搜尋user + 分頁顯示user
let filteredFriends = []

// 渲染pagination
const USERS_PER_PAGE = 20
const pagination = document.querySelector('.pagination')
// 分頁顯示user
let selectedFriends = []

// function: 渲染user
function renderUserList(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `
      <div class="col-sm-2 my-2 mx-3 border border-light bg-white rounded-2">
        <img class="avatar d-block mx-auto mt-2 rounded-2" role="button" src="${item.avatar}" alt="" data-bs-toggle="modal" data-bs-target="#modal" data-id="${item.id}">
        <div class="d-flex justify-content-around my-1">
          <span class="name">${item.name}<br>region: ${item.region}</span>
          <button class="btn-add-friend btn btn-primary btn-sm mt-2" data-id="${item.id}" style="height:30px;">+</button>
        </div>
      </div>
  `
  })
  userPanel.innerHTML = rawHTML
}

// function: Modal
function showUserModal(id) {
  const modalTitle = document.querySelector('.modal-title')
  const modalInformation = document.querySelector('.modal-body p')
  const modalAvatar = document.querySelector('.modal-body img')
  axios.get(INDEX_URL + id)
    .then(response => {
      const user = response.data
      // console.log(response.data)
      let userInfo = `id : ${user.id}
        name : ${user.name}
        surname : ${user.surname}
        email : ${user.email}
        gender : ${user.gender}
        age : ${user.age}
        region : ${user.region}
        birthday : ${user.birthday}
      `
      modalTitle.innerText = user.name
      modalInformation.innerText = userInfo
      modalAvatar.src = user.avatar
    })
    .catch(error => console.log(error))
}

// function: 加入好友
function addToFriends(id) {
  const friendsList = JSON.parse(localStorage.getItem('friends')) || []
  if (friendsList.some(user => user.id === id)) {
    return alert('已加過此人為好友')
  }
  const friend = userList.find(user => user.id === id)
  friendsList.push(friend)
  localStorage.setItem('friends', JSON.stringify(friendsList))
}

// 功能: Modal + 加入好友
userPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.avatar')) { // 點到頭像 -> 跳出Modal
    const id = event.target.dataset.id
    showUserModal(id)
  } else if (event.target.matches('.btn-add-friend')) { // 點+ -> 加入好友
    event.target.classList.add('btn-secondary')
    const id = Number(event.target.dataset.id)
    addToFriends(id)
  }
})

// 功能: 搜尋user
searchForm.addEventListener('submit', function onSearchFormClicked(e) {
  e.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredFriends = userList.filter(user => user.name.toLowerCase().includes(keyword))
  if (filteredFriends.length === 0) return alert(`找不到${keyword}`)
  renderUserList(getUsersByPage(1))
  renderPages(filteredFriends.length)
})

// function: 渲染pagination
function renderPages(numbersOfUsers) {
  const totalPages = Math.ceil(numbersOfUsers / USERS_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= totalPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" data-page="${page}" href="#">${page}</a></li>`
  }
  pagination.innerHTML = rawHTML
}

// 分頁顯示user (function)
function getUsersByPage(page) {
  // 當搜尋user陣列裡有user時，分頁將顯示搜尋user的結果；
  // 當搜尋user陣列裡沒有user時，分頁將顯示全部user的結果；
  selectedFriends = (filteredFriends.length) ? filteredFriends : userList
  const start = (page - 1) * USERS_PER_PAGE
  const usersByPage = selectedFriends.slice(start, start + USERS_PER_PAGE)
  return usersByPage
}

// 功能: 分頁顯示user
pagination.addEventListener('click', e => {
  const page = Number(e.target.dataset.page)
  renderUserList(getUsersByPage(page))
})

// 主程式
axios.get(INDEX_URL)
  .then(response => {
    userList.push(...response.data.results)
    renderUserList(getUsersByPage(1)) // 渲染(全部user第1頁)
    renderPages(userList.length) // 渲染pagination(全部user的人數)
  })
  .catch(error => console.log(error))
