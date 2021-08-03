// 宣告網址
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

// 空陣列：儲存所有卡片資料
const cards = []
// 空陣列：儲存搜尋後的卡片資料
let filteredCards = []

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const cards_Per_Page = 16

// 函式：（DOM操作）載入卡片
function renderCard(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `
    <div class="col-sm-3">
      <div class="card mb-3" >
        <img src="${item.avatar}" data-id="${item.id}" class="card-img-top" alt="Avatar">
        <div class="card-body">
          <h5 class="card-text">${item.name} ${item.surname}</h5>
          <button type="button" class="btn btn-primary btn-show-info" data-toggle="modal" data-target="#community-modal"
          data-id="${item.id}">More</button>
          <button type="button" class="btn btn-success btn-add-friend" data-id="${item.id}">Add</button>
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

// 函式：加入好友儲存於local Storage
function addToFriend(id) {
  const list = JSON.parse(localStorage.getItem('friend')) || []
  const card = cards.find((card) => card.id === id)
  if (list.some((card) => card.id === id)) {
    return alert('已加入好友清單')
  }
  list.push(card)
  localStorage.setItem('friend', JSON.stringify(list))
  return alert('加入成功')
}

// 函式：分頁功能
function getCardsByPage(page) {
  const data = filteredCards.length ? filteredCards : cards
  const startIndex = (page - 1) * cards_Per_Page
  return data.slice(startIndex, startIndex + cards_Per_Page)
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

// search form 監聽器
searchForm.addEventListener('submit', function SearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  if (keyword.length === 0) {
    return alert("請輸入內容")
  }
  filteredCards = cards.filter(card => card.surname.toLowerCase().includes(keyword) || card.name.toLowerCase().includes(keyword))
  renderPaginator(filteredCards.length)
  renderCard(getCardsByPage(1))
})

// data panel 監聽器
dataPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.btn-show-info')) {
    // console.log(event.target.dataset.id)
    showModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-add-friend')) {
    addToFriend(Number(event.target.dataset.id))
  }
})

// paginator 監聽器
paginator.addEventListener('click', function paginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  renderCard(getCardsByPage(page))
})

axios.get(INDEX_URL).then((response) => {
  cards.push(...response.data.results)
  renderPaginator(cards.length)
  renderCard(getCardsByPage(1))
}).catch((err) => console.log(err))
