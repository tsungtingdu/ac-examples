const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = []

let filteredUsers = []
const USERS_PER_PAGE = 24

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')

function renderUserList(data) {
  let rawHTML = ''
  data.forEach(item => {
     rawHTML += `
      <div class='col-sm-2'>
     <div class='card'>
    <img src='${item.avatar}' class='userAvatar' alt='User Avatar' id='${item.id}' data-modal-user-id='${item.id}'>
      <h5 data-modal-user-id='${item.id}'>${item.name} ${item.surname}</h5>
<div class='card-footer'>
               <button class='btn btn-primary btn-show-info' data-bs-toggle='modal' data-bs-target='#user-modal' data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
    </div>
      </div>
        </div>
          </div>
`;
  })
  dataPanel.innerHTML = rawHTML
}

// 分頁
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

function getUsersByPage(page) {
  const data = filteredUsers.length ? filteredUsers : users
  const startIndex = (page - 1) * USERS_PER_PAGE
  return data.slice(startIndex, startIndex + USERS_PER_PAGE)
}

function showuserInfo(id) {
  const modaltitle = document.querySelector(".modal-title");
  const modalavatar = document.querySelector(".modal-avatar");
  const modaluserinfo = document.querySelector(".modal-user-info");
  
  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const user = response.data;
      modaltitle.textContent = user.name + " " + user.surname;
      modalavatar.src = user.avatar;
      modaluserinfo.innerHTML = `
      <p>email: ${user.email}</p>
      <p>gender: ${user.gender}</p>
      <p>age: ${user.age}</p>
      <p>region: ${user.region}</p>
      <p>birthday: ${user.birthday}</p>`;
    })
    .catch((error) => console.log(error));
  }

//收藏
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteUsers')) || []
  const user = users.find(user => user.id === id)
  if (list.some(user => user.id === id)) {
    return alert('此好友已經在最愛清單中！')
  }
  list.push(user)
  localStorage.setItem('favoriteUsers', JSON.stringify(list))
}

// listen to data panel
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-info')) {
    showuserInfo(event.target.dataset.id)
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

//listen to search form
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword)
  )

  if (filteredUsers.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的結果`)
  }
  renderPaginator(filteredUsers.length)
  renderUserList(getUsersByPage(1))
})

//分頁
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  renderUserList(getUsersByPage(page))
})


axios
  .get(INDEX_URL)
  .then(response => {
    users.push(...response.data.results)
    renderPaginator(users.length)
    renderUserList(getUsersByPage(1))
  })
  .catch(err => console.log(err))