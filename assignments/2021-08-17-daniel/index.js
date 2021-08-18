const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
const INDEX_URL = BASE_URL + 'api/v1/users/'
const users = []
const searchBar = document.querySelector('.search-bar')
const paginator = document.querySelector('.pagination')
let filterUser = []
const cardsPerPage = 12

axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderCards(getUserByPage(1))
    renderPaginator(users.length)
  })
  .catch((error) => {
    console.log(error)
  })

function renderCards(arr) {
  const cards = document.querySelector('.cards')
  let raw = ''
  arr.forEach((user) => {
    const img = user.avatar
    const name = user.name
    const email = user.email
    raw += `
    <div class="card col-md-3 mb-3">
        <img src="${img}" class="card-img-top" alt="照片" data-bs-toggle="modal" data-bs-target="#userModal" data-id="${user.id}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${email}
          </p>
          <button type="button" class="btn btn-primary" data-id="${user.id}">加入最愛</button>
        </div>
      </div>
    `
  })
  cards.innerHTML = raw
}

const info = document.querySelector('.cards')
info.addEventListener('click', function onClicked(e) {
  if (e.target.matches('img')) {
    userInfo(Number(e.target.dataset.id))
  } else if (e.target.matches('.btn-primary')) {
    addToFavorite(Number(e.target.dataset.id))
  }
})
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favorite')) || []
  const user = users.find((u) => u.id === id)
  if (list.find((u) => u.id === id)) {
    return alert('加過了拉＝＝')
  }
  list.push(user)
  localStorage.setItem('favorite', JSON.stringify(list))
}

function userInfo(id) {
  const modalTitle = document.querySelector('.modal-title')
  const modalImage = document.querySelector('.modal-body .avatar')
  const modalDescription = document.querySelector('.modal-body .description')
  const user = INDEX_URL + id
  axios.get(user).then((response) => {
    const data = response.data
    modalTitle.innerText = data.name
    modalImage.innerHTML = `
    <img src="${data.avatar}" alt="avatar">
    `
    modalDescription.innerHTML = `
    <ul>
    <li>age: ${data.age}</li>
    <li>birthday: ${data.birthday}</li>
    <li>email: ${data.email}</li>
    <li>gender: ${data.gender}</li>
    <li>region: ${data.region}</li>
    </ul>
    `
  })
}
// 按 search 按鈕來過濾畫面
searchBar.addEventListener('click', function onSearchBarClicked(e) {
  e.preventDefault()
  let InputValue = document.querySelector('#searchValue').value
  let keyword = InputValue.trim().toLowerCase()
  if (e.target.matches('button')) {
    filterUser = users.filter((e) => {
      return e.name.toLowerCase().includes(keyword)
    })
    if (filterUser.length > 0) {
      renderCards(getUserByPage(1))
    } else {
      renderCards(filterUser)
    }
    renderPaginator(filterUser.length)
  }
})

// 直接輸入就可過濾畫面
searchBar.addEventListener('keyup', function onSearchBarPress(e) {
  let InputValue = document.querySelector('#searchValue').value
  let keyword = InputValue.trim().toLowerCase()
  filterUser = users.filter((e) => {
    return e.name.toLowerCase().includes(keyword)
  })
  if (filterUser.length > 0) {
    renderCards(getUserByPage(1))
  } else {
    renderCards(filterUser)
  }
  renderPaginator(filterUser.length)
})

function renderPaginator(n) {
  const pageAmount = Math.ceil(n / cardsPerPage)
  let rawHTML = ''
  for (let i = 1; i <= pageAmount; i++) {
    rawHTML += `
    <li class="page-item"><a class="page-link" href="#">${i}</a></li>
    `
  }
  paginator.innerHTML = rawHTML
}

function getUserByPage(page) {
  const data = filterUser.length ? filterUser : users
  const startIndex = (page - 1) * cardsPerPage
  return data.slice(startIndex, startIndex + cardsPerPage)
}

paginator.addEventListener('click', function paginationClicked(e) {
  console.log(e.target)
  if (e.target.matches('.page-link')) {
    const pageNumber = Number(e.target.innerText)
    renderCards(getUserByPage(pageNumber))
  }
})
