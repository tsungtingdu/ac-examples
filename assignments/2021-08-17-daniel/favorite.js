const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
const INDEX_URL = BASE_URL + 'api/v1/users/'
const users = JSON.parse(localStorage.getItem('favorite'))
const searchBar = document.querySelector('.search-bar')
const paginator = document.querySelector('.pagination')

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
          <button type="button" class="btn btn-danger btn-remove-favorite" data-id="${user.id}">X</button>
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
  } else if (e.target.matches('.btn-remove-favorite')) {
    removeFavorite(Number(e.target.dataset.id))
  }
})
function removeFavorite(id) {
  if (!users) return
  userIndex = users.findIndex((u) => u.id === id)
  if (userIndex === -1) return
  users.splice(userIndex, 1)
  localStorage.setItem('favorite', JSON.stringify(users))
  renderCards(users)
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
renderCards(users)
