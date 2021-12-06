// variable
// API
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

// 渲染user
const userPanel = document.querySelector('#user-panel')

// 渲染user + 移除好友
const friendsList = JSON.parse(localStorage.getItem('friends')) || []

// function: 渲染user
function renderUserList(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `
      <div class="col-sm-2 my-2 mx-3 border border-light bg-light rounded-2">
        <img class="avatar d-block mx-auto mt-2 rounded-2" role="button" src="${item.avatar}" alt="" data-bs-toggle="modal" data-bs-target="#modal" data-id="${item.id}">
        <div class="d-flex justify-content-around my-1">
          <span class="name">${item.name}<br>region: ${item.region}</span>
          <button class="btn-remove-friend btn btn-danger btn-sm" data-id="${item.id}" style="height:30px;">X</button>
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

// function: 移除好友
function removeFromFriends(id) {
  const friendIndex = friendsList.findIndex(user => user.id === id)
  if (friendIndex === -1) return
  friendsList.splice(friendIndex, 1)
  renderUserList(friendsList)
  localStorage.setItem('friends', JSON.stringify(friendsList))
}

// 功能: Modal + 移除好友
userPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.avatar')) { // 點到頭像 -> 跳出Modal
    const id = event.target.dataset.id
    showUserModal(id)
  } else if (event.target.matches('.btn-remove-friend')) { // 點X -> 移除好友
    const id = Number(event.target.dataset.id)
    removeFromFriends(id)
  }
})

// 主程式
renderUserList(friendsList) // 渲染(好友清單裡的user)