const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const friends = []

let filteredFriends = []
const FRIENDS_PER_PAGE = 12

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const filter = document.querySelector('#filter')


//動態產生 Friend List
function renderFriendList(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card mb-3" style="height:23rem">
        <img src="${item.avatar}" class="card-img-top rounded-circle mx-auto mt-3" style="width:80%" alt="info-avatar">
        <div class="card-body">
          <h5 class="card-title text-center">${item.name} ${item.surname}</h5>
        </div>
        <div class="card-footer text-center bg-dark">
          <button class="btn btn-dark border-secondary btn-show-info" data-toggle="modal" data-target="#info-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite rounded-circle" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
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

// 男女分類功能
filter.addEventListener('click', filterGender)

function filterGender(event) {
  if (event.target.matches('.btn-male')) {
    filteredFriends = friends.filter((gender) => gender.gender === 'male')
    renderPaginator(filteredFriends.length)
    renderFriendList(getFriendsByPage(1))
  } else if (event.target.matches('.btn-female')) {
    filteredFriends = friends.filter((gender) => gender.gender === 'female')
    renderPaginator(filteredFriends.length)
    renderFriendList(getFriendsByPage(1))
  } else {
    filteredFriends = friends
    renderPaginator(friends.length)
    renderFriendList(getFriendsByPage(1))
  }
  const activeGender = filter.children;
  for (let item of activeGender) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }
  const NowActiveGender = event.target;
  NowActiveGender.classList.add("active");
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
          <img src="${data.avatar}" alt="info-avatar" class="img-fluid mt-4 ml-4" style="width:60%" />
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

// 收藏功能 (利用localStorage把內容過渡至favorite)
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteFriends')) || []
  const friend = friends.find((friend) => friend.id === id)
  if (list.some((friend) => friend.id === id)) {
    return alert('此好友已加入在喜愛清單中！')
  }
  list.push(friend)
  localStorage.setItem('favoriteFriends', JSON.stringify(list))
}



// listen to data panel - 回應 more 及 add-to-Favorite 的 button的點擊
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-info')) {
    friendInfoModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
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

  const activeGender = filter.children;
  for (let item of activeGender) {
    if (item.classList.contains("btn-all")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
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

// default setting
axios
  .get(INDEX_URL)
  .then(response => {
    friends.push(...response.data.results)
    renderPaginator(friends.length)
    renderFriendList(getFriendsByPage(1))
  })
  .catch(err => console.log(err))