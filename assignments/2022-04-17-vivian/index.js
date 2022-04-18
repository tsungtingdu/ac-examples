const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = []

const USERS_PER_PAGE = 24

const dataPanel = document.querySelector('#data-panel')
const cardTap = document.querySelector('.card-tap')

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const paginator = document.querySelector('#paginator')

searchForm.addEventListener('submit', function onSearchFormSubmitted(event)  {
  event.preventDefault()  

  const keyword = searchInput.value.trim().toLowerCase()

  let filterUser = []
  filterUser = users.filter((user)=> 
    user.name.toLowerCase().includes(keyword) || 
    user.surname.toLowerCase().includes(keyword))

  if(filterUser.length === 0) {
    return alert('請輸入正確的關鍵字')
  }
  renderUsers(filterUser)
})

dataPanel.addEventListener('click', (event)=> {
  if(event.target.matches('.card-tap')) {
    showUserModal(event.target.dataset.id)
  } else if(event.target.matches('.btn-add-favorite')) {
    if (event.target.innerText === 'favorite_border') {
      event.target.innerText = 'favorite'
      addToFavorite(Number(event.target.dataset.id))
    } else if (event.target.innerText === 'favorite') {
      event.target.innerText = 'favorite_border'
      removeFromFavorite(Number(event.target.dataset.id))
    }
  }
})

// 加到我的最愛
function addToFavorite(id) {
  const favoriteList = JSON.parse(localStorage.getItem('favorite')) || []
  const user = users.find((user) => user.id === id)
  if(favoriteList.some((user)=> user.id !== id)) {
    // return alert('此名單已在清單中')
    favoriteList.push(user)
  }
  
  localStorage.setItem('favorite', JSON.stringify(favoriteList))
}
// 從我的最愛移除
function removeFromFavorite(id) {
  if(!users || !users.length) return
  const favoriteList = JSON.parse(localStorage.getItem('favorite')) || []

  const userIndex = users.findIndex((user) => user.id === id)
  if(userIndex === -1) return
  if(favoriteList.some((user)=> user.id === id)) {
    favoriteList.splice(userIndex, 1)
  }
  
  localStorage.setItem('favorite', JSON.stringify(favoriteList))
}

function renderUsers(data) {
  const favoriteList = JSON.parse(localStorage.getItem('favorite')) || []
  
  let rawHTML = ''
  data.forEach((item)=> {
    const favorite = (favoriteList.some(like => like.id === item.id)) ? 'favorite' : 'favorite_border'
    rawHTML += `
      <div class="col-3">
        <div class="mb-5">
          <div class="card rounded pt-3">
            <img src="${item.avatar}" class=" rounded-circle w-75 mx-auto"
             alt="social user">

            <span class="material-icons-outlined btn-add-favorite" data-id="${item.id}">
              ${favorite}
            </span>
            <div class="card-body">
              <h5 class="card-title text-center fw-bold">${item.name} ${item.surname}</h5>
            </div>
            <div class="intro">
              <span class="material-icons-outlined gender material-icons">
                  ${item.gender === 'male' ? 'man' : 'woman'}
                </span>
              <span class="material-icons-outlined">
                  ${item.age}歲
              </span>
            </div>
            <button type="button" class="card-tap btn btn-outline-primary mt-2" data-id="${item.id}" 
              data-bs-target="#user-modal" data-bs-toggle="modal">
              more info
            </button>
          </div>
        </div>
      </div>
      `
  })

  dataPanel.innerHTML = rawHTML
}

axios.get(INDEX_URL)
.then((response)=>{
  for(const user of response.data.results) {
    users.push(user)
  }
  
  renderPaginator(users.length)
  renderUsers(getUsersByPage(1))
})
.catch((err) => console.log(err))

function showUserModal(id) {
  const modalImg = document.querySelector('#user-modal-img')
  const modalName = document.querySelector('#user-modal-name')
  const modalEmail = document.querySelector('#user-modal-email')
  const modalRegion = document.querySelector('#user-modal-region')
  const modalBirthday = document.querySelector('#user-modal-birthday')

  axios.get(INDEX_URL + id).then((response)=> {
    const data = response.data
    modalName.innerText = `${data.name + ' ' + data.surname}`
    modalEmail.innerText = `${data.email}`
    modalRegion.innerText = `${data.region}`
    modalBirthday.innerText = `${data.birthday}`
    modalImg.innerHTML = `
      <img src="${data.avatar}" alt="user-img" class="img-fluid rounded-circle">
    `
  })
}

function getUsersByPage(page) {
  const startIndex = (page - 1) * USERS_PER_PAGE

  return users.slice(startIndex, startIndex + USERS_PER_PAGE)
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  let rawHTML = ''

  for(let page = 1; page < numberOfPages; page ++) {
    rawHTML +=`
      <li class="page-item">
        <a class="page-link" href="#" data-page="${page}">
          ${page}
        </a>
      </li>
    `
  }
  paginator.innerHTML = rawHTML
}

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if(event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  renderUsers(getUsersByPage(page))
})