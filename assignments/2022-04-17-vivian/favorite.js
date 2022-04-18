const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = JSON.parse(localStorage.getItem('favorite'))

const dataPanel = document.querySelector('#data-panel')
const cardImg = document.querySelector('.card-tap')

dataPanel.addEventListener('click', (event)=> {
  if(event.target.matches('.card-tap')) {
    showUserModal(event.target.dataset.id)
  } else if(event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

function removeFromFavorite(id) {
  if(!users || !users.length) return

  const userIndex = users.findIndex((user) => user.id === id)
  if(userIndex === -1) return
  users.splice(userIndex, 1)
  localStorage.setItem('favorite', JSON.stringify(users))

  renderUsers(users)
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

renderUsers(users)