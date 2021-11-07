const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
//從 local storage 拿取資料
const friends = JSON.parse(localStorage.getItem('favoriteFriends'))

let filteredFriends = []
const FRIENDS_PER_PAGE = 12

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')

//動態產生 Friend List
function renderFriendList(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card mb-3" style="height:23rem">
        <img src="${item.avatar}" class="card-img-top rounded-circle mx-auto mt-3" style="width:80%" alt="info-avatar">
        <div class="card-body">
          <h5 class="card-title">${item.name} ${item.surname}</h5>
        </div>
         <div class="card-footer text-center bg-dark">
          <button class="btn btn-dark border-secondary btn-show-info" data-toggle="modal" data-target="#info-modal" data-id="${item.id}">More</button>
          <button class="btn btn-danger btn-remove-favorite rounded-circle" data-id="${item.id}">X</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

//動態產生 Modal資料
function friendInfoModal(id) {
  const modalTitle = document.querySelector('#info-modal-title')
  const modalBody = document.querySelector('#info-modal-body')

  // send request 拿取 api資料
  axios.get(INDEX_URL + id).then(response => {
    const data = response.data

    modalTitle.innerText = `${data.name} ${data.surname}`
    modalBody.innerHTML = `
    <div class="row">
      <div class="col-sm-4" id="info-modal-image">
        <img
          src="${data.avatar}"
          alt="info-avatar" class="img-fluid mt-4 ml-4" />
      </div>
      <div class="col-sm-8">
        <p id="modal-age">age: ${data.age}</p>
        <p id="modal-gender">gender: ${data.gender}</p>
        <p id="modal-region">region: ${data.region}</p>
        <p id="modal-birthday">birthday: ${data.birthday}</p>
        <p id="modal-email">email: ${data.email}</p>            
      </div>
    </div>
    `
  })
}

// 動態產生分頁
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / FRIENDS_PER_PAGE)
  let rawHTML = "";

  //render第一頁, 並加插active效果
  rawHTML += `
    <li class="page-item active">
      <a class="page-link" href="#" data-page="1">1</a>
    </li>
  `;

  //render第二頁至其餘頁數
  for (let page = 2; page <= numberOfPages; page++) {
    rawHTML += `
      <li class="page-item">
        <a class="page-link" href="#" data-page="${page}">${page}</a>
      </li>
    `;
  }
  paginator.innerHTML = rawHTML;
}

//根據頁碼，篩選data內容
function getFriendsByPage(page) {
  const data = filteredFriends.length ? filteredFriends : friends
  const startIndex = (page - 1) * FRIENDS_PER_PAGE
  return data.slice(startIndex, startIndex + FRIENDS_PER_PAGE)
}

//移除喜愛清單
function removeFromFavorite(id) {
  if (!friends) return

  const friendIndex = friends.findIndex(friend => friend.id === id)
  if (friendIndex === -1) return

  friends.splice(friendIndex, 1)
  localStorage.setItem('favoriteFriends', JSON.stringify(friends))
  renderFriendList(friends)
}

// listen to data panel - 回應 more 及 remove-from-Favorite 的 button的點擊
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-info')) {
    friendInfoModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

//listen to search form - 關鍵字搜尋
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(keyword) || friend.surname.toLowerCase().includes(keyword)
  )

  if (filteredFriends.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的結果`)
  }
  renderPaginator(filteredFriends.length)
  renderFriendList(getFriendsByPage(1))
})

// listen to paginator - 回應分頁button的點擊
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return

  const page = Number(event.target.dataset.page)
  renderFriendList(getFriendsByPage(page))

  //移除原先頁碼的active,在新按的頁碼加上active,讓用家可以得悉身處頁碼
  const activePage = paginator.children;
  for (let item of activePage) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }
  const NewActivePage = event.target.parentElement;
  NewActivePage.classList.add("active");
})

//favorite頁面的default setting
renderPaginator(friends.length)
renderFriendList(getFriendsByPage(1))