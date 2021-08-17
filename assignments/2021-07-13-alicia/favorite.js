const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const users = JSON.parse(localStorage.getItem('favoriteUsers')) || []
const dataPanel = document.querySelector('#data-panel') // 存放資料 DOM 元件
// 存放表單 DOM 元件
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// 監聽 data panel
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-user')) {
    showUserModal(event.target.dataset.id) // 取得 id
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

// Render User List
function renderUserList(data) {
  let dataHTML = ''

  data.forEach((item) => {
    // name, image, id 隨著 item 改變
    dataHTML += `<div class="col-sm-auto">
      <div class="card" mb-2>
        <img src="${item.avatar}" class="card-img-top" alt="User Photo">
        <div class="card-body">
          <h5 class="card-title">${item.name} ${item.surname}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-user" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">More</button>
          <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">x</button>
        </div>
      </div>
    </div>`
  })
  dataPanel.innerHTML = dataHTML
}

// 移除按鈕
function removeFromFavorite(id) {
  // 如果 Favorite 內不存在資料，就終止 function
  if (!users) return
  // 透過 id 找到要刪除資料的 index
  const userIndex = users.findIndex((user) => user.id === id)
  // 如果找不到相關的index值，就終止 function
  if (userIndex === -1) return
  // 刪除該筆(1 筆)資料
  users.splice(userIndex, 1)
  // 刪除資料後的清單，存回 local storage
  localStorage.setItem('favoriteUsers', JSON.stringify(users))
  // 更新頁面
  renderUserList(users)
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

renderUserList(users)