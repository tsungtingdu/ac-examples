const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const USERS_PER_PAGE = 6
const PAGES_PER_PAGINATOR = 3

const favoriteUsers = JSON.parse(
  localStorage.getItem('favoriteUsers')
) || []

let filteredUsers = []; // 被搜尋的 users
let lastViewedPage = 1 // 目前瀏覽頁面，初始值 1
let numberOfPages = 0 // total pages
let pageStart = 0
let pageEnd = 0

const dataPanel = document.querySelector("#data-panel");
const paginator = document.querySelector('#paginator')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const body = document.body;

const modal = document.querySelector('.diy-modal')
const modalBackgroud = document.querySelector('.diy-modal-background')
const modalImage = document.querySelector("#box-img");
const modalName = document.querySelector("#box-name");
const picEmail = document.querySelector('#email-icon')
const textEmail = document.querySelector('#email-text')
const picGender = document.querySelector('#gender-icon')
const textGender = document.querySelector('#gender-text')
const picAge = document.querySelector('#age-icon')
const textAge = document.querySelector('#age-text')
const picRegion = document.querySelector('#region-icon')
const textRegion = document.querySelector('#region-text')
const picBirthday = document.querySelector('#birthday-icon')
const textBirthday = document.querySelector('#birthday-text')
const closeBtn = document.querySelector('.close-button')

// 實作點擊卡片avatar，秀出個人info
dataPanel.addEventListener("click", onPanelClicked);
// 分頁區域監聽器
paginator.addEventListener('click', onPaginatorClicked)
// 搜尋監聽器
searchForm.addEventListener('submit', onSearchFormSubmitted)

numberOfPages = Math.ceil(favoriteUsers.length / USERS_PER_PAGE)
setPageStartAndEnd()
renderPaginator(pageStart, pageEnd)
renderUserList(getUsersByPage(1))
toggleActivePage(lastViewedPage)

function renderUserList(data) {
  
  let rawHTML = "";
  data.forEach((item) => {
    const backgroundURL = teams[item.team].backgroundImg
    const account = item.email.split("@", 1);
    // const account = item.email

    rawHTML += `
      <div class="col-md-2 mb-4">
        <div class="card data-id="${item.id}" style="background-image:linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${backgroundURL}); background-size: cover; ">
          <img src="${item.avatar}" class="card-img-top" alt="person photo" data-bs-toggle="modal" data-bs-target="#user-file" data-id="${item.id}">

          <div class="card-body">
            <p class="card-text" style="color:white; font-family:'Comic Sans MS', 'Comic Sans', cursive;">${account}</p>
            
            <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
          </div>
        </div>
      </div>
    `;
  });
  dataPanel.innerHTML = rawHTML;
}

function onPanelClicked(event) { // click avatar => show info modal
  const target = event.target;
  const id = target.dataset.id

  if (target.matches(".card-img-top")) {
    showPlayerInfoModal(Number(id))
  } else if (target.matches('.btn-remove-favorite')) {
    removeFavorite(Number(id))
  }
}

function showPlayerInfoModal(id) {
  modal.style.display = "grid";
  modalBackgroud.style.display = "block";

  const found = favoriteUsers.find(element => element.id === id);

  const team = found.team;
  modal.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),  url('" + teams[team].backgroundImg + "')"

  modal.style.backgroundRepeat = "no-repeat"
  modal.style.backgroundSize = "contain"
  modal.style.backgroundColor = teams[team].backgroundColor

  modalImage.setAttribute("src", found.avatar)

  modalName.innerHTML = `
    <p>${found.name}</p>
    <p>${found.surname}</p>
  `

  picEmail.setAttribute("src", "./pic/email-removebg-preview.png")
  textEmail.textContent = `${found.email}`;

  picGender.setAttribute("src", "./pic/gender-removebg-preview.png")
  textGender.textContent = `${found.gender}`;

  picAge.setAttribute("src", "./pic/age-removebg-preview.png")
  textAge.textContent = `${found.age}`;

  picRegion.setAttribute("src", "./pic/region-removebg-preview.png")
  textRegion.textContent = `${found.region}`;

  picBirthday.setAttribute("src", "./pic/cake.png")
  textBirthday.textContent = `${found.birthday}`;

}

// if 8 users per page
// page 1 => 0 ~ 7
// page 2 => 8 ~ 15
// page 3 => 16 ~ 23
function getUsersByPage(page) {
  // data 可能等於全部 users
  // 或者只等於被搜尋的 filteredUsers
  const data = filteredUsers.length ? filteredUsers : favoriteUsers
  // if filteredUsers.length > 0 => data = filteredUsers
  // else => data = favoriteUsers

  const startIndex = (page - 1) * USERS_PER_PAGE
  const endIndex = startIndex + USERS_PER_PAGE
  return data.slice(startIndex, endIndex)
}

function toggleActivePage(page) {
  let str = ''
  str += ('[data-page="' + page + '"]')
  const node = document.querySelector(str)

  if (node === null) return
  node.parentElement.classList.toggle("active")
}

function setPageStartAndEnd() {
  pageStart = 1
  pageEnd = pageStart + PAGES_PER_PAGINATOR - 1
  if (numberOfPages < pageEnd) {
    pageEnd = numberOfPages
  }
}

function renderPaginator(start, end) {
  let rawHTML = ''
  rawHTML += `
    <li class="page-link" id="now-page">Page: ${lastViewedPage} / ${numberOfPages}</li>
    <li class="page-item"><a class="page-link" href="#" id="first-page">K</a></li>
    <li class="page-item"><a class="page-link" href="#" id="previous-page" style="font-weight:bold;">ㄑ</a></li>
  `
  for (let page = start; page <= end; page++) {
    rawHTML += `
      <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `
  }

  rawHTML += `
    <li class="page-item"><a class="page-link" href="#" id="next-page" style="font-weight:bold; transform:scaleX(-1);">ㄑ</a></li>
    <li class="page-item"><a class="page-link" href="#" id="last-page" style="transform:scaleX(-1);">K</a></li>
  `
  paginator.innerHTML = rawHTML
}

function onPaginatorClicked(event) {
  const target = event.target
  if (target.tagName !== 'A') return

  if (target.matches('#previous-page')) {
    if (lastViewedPage - 1 <= 0) return // now is at Page 1
    if (lastViewedPage - 1 < pageStart) {
      pageEnd = lastViewedPage - 1
      pageStart = pageEnd - PAGES_PER_PAGINATOR + 1
      renderPaginator(pageStart, pageEnd)
    }
    toggleActivePage(lastViewedPage)
    lastViewedPage = nowPageAdjust(lastViewedPage, -1)
    renderUserList(getUsersByPage(lastViewedPage))
    toggleActivePage(lastViewedPage)
    return
  } else if (target.matches('#next-page')) {
    console.log('lets render users')
    if (lastViewedPage + 1 > numberOfPages) return // now is at Final Page
    if (lastViewedPage + 1 > pageEnd) {
      pageStart = lastViewedPage + 1
      pageEnd = pageStart + PAGES_PER_PAGINATOR - 1
      if (pageEnd > numberOfPages) pageEnd = numberOfPages // 不需要那麼多頁
      renderPaginator(pageStart, pageEnd)
    }
    toggleActivePage(lastViewedPage)
    lastViewedPage = nowPageAdjust(lastViewedPage, 1)
    renderUserList(getUsersByPage(lastViewedPage))
    toggleActivePage(lastViewedPage)
    return
  } else if (target.matches('#first-page')) {
    pageStart = 1;
    pageEnd = pageStart + PAGES_PER_PAGINATOR - 1
    renderPaginator(pageStart, pageEnd)

    lastViewedPage = nowPageAdjust(1, 0)
    toggleActivePage(lastViewedPage)
    renderUserList(getUsersByPage(lastViewedPage))

  } else if (target.matches('#last-page')) {
    goToLastPage()
  } else { // 使用者直接點分頁的數字
    const page = Number(target.dataset.page)
    toggleActivePage(lastViewedPage)
    renderUserList(getUsersByPage(page))

    lastViewedPage = nowPageAdjust(page, 0)
    toggleActivePage(lastViewedPage)
  }
}
function nowPageAdjust(now, adjust) {
  const nowPage = document.querySelector('#now-page')
  nowPage.innerHTML = `
    Page: ${now + adjust} / ${numberOfPages}
  `
  return now + adjust
}
function goToLastPage() {
  const remainder = numberOfPages % PAGES_PER_PAGINATOR
  const quotient = Math.floor(numberOfPages / PAGES_PER_PAGINATOR)

  if (remainder === 0) {
    pageEnd = numberOfPages
    pageStart = pageEnd - PAGES_PER_PAGINATOR + 1
  } else {
    pageStart = 1 + quotient * PAGES_PER_PAGINATOR
    pageEnd = pageStart + remainder - 1
  }

  renderPaginator(pageStart, pageEnd)
  lastViewedPage = nowPageAdjust(numberOfPages, 0)
  toggleActivePage(lastViewedPage)
  renderUserList(getUsersByPage(lastViewedPage))
}

function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.toLowerCase().trim()

  filteredUsers = favoriteUsers.filter(user => user.email.toLowerCase().includes(keyword))

  if (keyword.length === 0) { // keyword 全空白
    alert('input is empty')
  } else if (filteredUsers.length === 0) { // 當使用者輸入的關鍵字找不到符合條件的項目時，跳出提示
    return alert('Cannot find any User Name with keyword:【' + keyword + '】')
  }

  numberOfPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  setPageStartAndEnd()
  renderPaginator(pageStart, pageEnd)

  lastViewedPage = 1; // 搜尋後重新 render，回到第 1 頁
  renderUserList(getUsersByPage(lastViewedPage))
  toggleActivePage(lastViewedPage)
}

// remove favorite user from both 【favorite.html】 and 【localStorage】
function removeFavorite(id) {
  if (!favoriteUsers || !favoriteUsers.length) return // 收藏清單是空的
  const index = favoriteUsers.findIndex(user => user.id === id)

  if (index === -1) return // 傳入的 user id 在收藏清單中不存在

  favoriteUsers.splice(index, 1) // 刪除一個 user
  const before = numberOfPages
  numberOfPages = Math.ceil(favoriteUsers.length / USERS_PER_PAGE)
  const after = numberOfPages

  if (after < before) { // 刪除卡片後，分頁數減少
    goToLastPage()
  } else {
    renderUserList(getUsersByPage(lastViewedPage))
  }

  localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
}
function closeModal() {
  const target = event.target

  if (target.matches('.close-button')) { // close modal
    modalBackgroud.style.display = 'none'
  }
}
closeBtn.addEventListener('click', () => {
  closeModal()
})
body.addEventListener('keydown', () => {
  if (event.key === "Escape") {
    modalBackgroud.style.display = 'none'
  }
})