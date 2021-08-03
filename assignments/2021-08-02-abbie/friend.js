// 宣告網址
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

// local stroage中的卡片資料
const cards = JSON.parse(localStorage.getItem('friend'))

const dataPanel = document.querySelector('#data-panel')
const paginator = document.querySelector('#paginator')
const cards_Per_Page = 16

// 函式：（DOM操作）載入卡片
function renderCard(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `
    <div class="col-sm-3">
      <div class="card mb-3">
          <img src="${item.avatar}" data-id="${item.id}" class="card-img-top" alt="Avatar">
          <div class="card-body">
            <h5 class="card-text">${item.name} ${item.surname}</h5>
            <button type="button" class="btn btn-primary btn-show-info" data-toggle="modal" data-target="#community-modal"
            data-id="${item.id}">More</button>
            <button type="button" class="btn btn-danger btn-remove-friend" data-id="${item.id}">remove</button>
          </div>
        </div>
      </div>
      `
  })
  dataPanel.innerHTML = rawHTML
}

// 函式：串接該筆id並載入modal（DOM操作）
function showModal(id) {
  const modalAvatar = document.querySelector('#modal-avatar')
  const modalName = document.querySelector('#modal-name')
  const modalEmail = document.querySelector('#modal-email')
  const modalAge = document.querySelector('#modal-age')
  const modalRegion = document.querySelector('#modal-region')
  const modalBirthday = document.querySelector('#modal-birthday')

  axios.get(INDEX_URL + id).then(response => {
    const data = response.data
    modalAvatar.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Modal-avatar">`
    modalName.innerHTML = 'Name: ' + data.name + '  ' + data.surname
    modalEmail.innerHTML = 'Email: ' + data.email
    modalAge.innerHTML = 'Age: ' + data.age
    modalRegion.innerHTML = 'Region: ' + data.region
    modalBirthday.innerHTML = 'Birthday: ' + data.birthday
  })

}

// 函式：移除好友並將新的cards儲存於local storage中
function removeFriend(id) {
  const card = cards.findIndex((card) => card.id === id)
  cards.splice(card, 1)
  localStorage.setItem('friend', JSON.stringify(cards))
  renderCard(cards)
  return alert('移除成功')
}

// 函式：分頁功能
function getCardsByPage(page) {
  const startIndex = (page - 1) * cards_Per_Page
  return cards.slice(startIndex, startIndex + cards_Per_Page)
}

// 函式：（DOM操作）載入分頁器
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / cards_Per_Page)
  // console.log(numberOfPages)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  // console.log(rawHTML)
  paginator.innerHTML = rawHTML
}

// data panel 監聽器
dataPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.btn-show-info')) {
    // console.log(event.target.dataset.id)
    showModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-remove-friend')) {
    removeFriend(Number(event.target.dataset.id))
  }
})

// paginator 監聽器
paginator.addEventListener('click', function paginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  renderCard(getCardsByPage(page))
})

renderPaginator(cards.length)
renderCard(getCardsByPage(1))
