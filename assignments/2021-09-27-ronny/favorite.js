// api常數
const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const users = JSON.parse(localStorage.getItem('favoriteUsers')) || [];
// dom常數
const dataPanel = document.querySelector("#data-panel");
// search常數
const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
// modal常數
const modalBox = document.querySelector("#user-modal")
// page常數
const USERS_PER_PAGE = 10
const paginator = document.querySelector("#paginator")


// axios

// function
// function-render list
function renderList(data) {

  dataPanel.innerHTML = data.map(item => {
    return `
    <div class="card gx-0 mb-3 me-5" style="width: 10rem;">
      <img src="${item.avatar}" data-id=${item.id} class="card-img-top card-user-img" data-bs-toggle="modal" data-bs-target="#user-modal" alt="user-img" role="button">
      <div class="card-body p-0">
        <h5 class="card-user-name text-center mb-1">${item.name} ${item.surname}</h5>
        <h5 class="card-add-favorite text-center mb-0"><i class="fas fa-heart favorite-icon" role="button" data-id=${item.id}></i></h5>
      </div>
    </div>
    `
  }).join('');
  // remove常數
  const removeBtnList = document.querySelectorAll(".card-add-favorite");
  // DOM- removeBtnList
  removeBtnList.forEach(btn => {
    btn.addEventListener("click", removeClicked);
  })
}
// function-PanelClicked
function onPanelClicked(event) {
  if (event.target.matches(".card-user-img")) {
    showUserModal(event.target.dataset.id);
  }
}

// function-showusermodal
function showUserModal(id) {
  // modaldom常數
  const modalTitle = document.querySelector("#user-modal-title");
  const modalImage = document.querySelector("#user-modal-image");
  const modalGender = document.querySelector("#user-modal-gender");
  const modalAge = document.querySelector("#user-modal-age");
  const modalBirth = document.querySelector("#user-modal-birth");
  const modalRegion = document.querySelector("#user-modal-region");
  const modalEmail = document.querySelector("#user-modal-email");
  const modalBtn = document.querySelector(".modal-footer")
  modalTitle.innerText = ''
  modalImage.innerHTML = ''
  modalGender.innerHTML = ''
  modalAge.innerHTML = ''
  modalBirth.innerHTML = ''
  modalRegion.innerHTML = ''
  modalEmail.innerHTML = ''

  //show api
  axios.get(INDEX_URL + id).then((response) => {
    const info = response.data;

    // insert data into modal ui
    modalTitle.innerText = `${info.name} ${info.surname}`;
    modalImage.innerHTML = `<img src="${info.avatar}
    " alt="user-img" class="modal-user-image col-12" id="user-modal-image">`;
    modalGender.innerHTML = `<i class="fas fa-venus-mars me-3"></i>${info.gender}`;
    modalAge.innerHTML = `<i class="fas fa-user-clock me-3"></i>${info.age}`;
    modalBirth.innerHTML = `<i class="fas fa-birthday-cake me-3"></i>${info.birthday}`;
    modalRegion.innerHTML = `<i class="fas fa-globe-asia me-3"></i>${info.region}`;
    modalEmail.innerHTML = `<i class="fas fa-envelope-open-text me-3"></i>${info.email}`;
    modalBtn.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Out</button>
          <button type="button" class="btn btn-primary btn-remove-favorite" id="user-modal-AddFavoriteBtn" data-id="${info.id}">say goodbye</button>`
  });
}

// function-search bar
function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  if (!keyword.length) {
    return alert('請輸入有效字串！')
  }

  let filteredUsers = []

  filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword)
  )
  if (filteredUsers.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的人`)
  }
  renderList(filteredUsers)
}

// Function- modal-say goodbyeClicked
function addFavoriteClicked(event) {
  if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
}
// function - add-faovrite-List
function addToFavoriteList(id) {
  const list = JSON.parse(localStorage.getItem('favoriteUsers')) || []
  const user = users.find((user) => user.id === id)

  if (list.some((user) => user.id === id)) {
    return alert('此人已在喜愛名單中！')
  }
  list.push(user)
  localStorage.setItem('favoriteUsers', JSON.stringify(list))
}

// function -removeClicked
function removeClicked(event) {
  if (event.target.matches(".favorite-icon")) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
}

// function-removeFromFavorite
function removeFromFavorite(id) {
  const userIndex = users.findIndex((user) => user.id === id)
  const removeUser = users.find((user) => user.id === id)
  if (userIndex === -1) return
  users.splice(userIndex, 1)
  const message = `再見了${removeUser.name}，我們分手吧～：( `
  console.log(message)
  alert(message)
  localStorage.setItem("favoriteUsers", JSON.stringify(users))
  renderList(users)
  renderPaginator(users.length)
  renderList(getUsersByPage(1))
}

// function getUsersByPage
function getUsersByPage(page) {
  //計算起始 index 
  const startIndex = (page - 1) * USERS_PER_PAGE
  //回傳切割後的新陣列
  return users.slice(startIndex, startIndex + USERS_PER_PAGE)
}

// function renderPaginator
function renderPaginator(amount) {
  //計算總頁數
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  //製作 template 
  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  //放回 HTML
  paginator.innerHTML = rawHTML
}

// function onPaginatorClicked
function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return

  const page = Number(event.target.dataset.page)
  renderList(getUsersByPage(page))
}

// DOM-modal
dataPanel.addEventListener("click", onPanelClicked);

// DOM-modal-addFavorite
modalBox.addEventListener("click", addFavoriteClicked);


// DOM-search
searchForm.addEventListener('submit', onSearchFormSubmitted)

// DOM-Page
paginator.addEventListener('click', onPaginatorClicked)

// render
renderList(users)
renderPaginator(users.length)
renderList(getUsersByPage(1))