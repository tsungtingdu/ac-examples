const userList = document.querySelector('#container')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const INDEX_URL = "https://lighthouse-user-api.herokuapp.com/api/v1/users/"
const users = []
const USERS_PER_PAGE = 32


function renderUserList(data) {
  let rawHTML = ""
  data.forEach((item) => {
    rawHTML += `
    <div class="card ml-3 mb-3" style="width: 14rem;">
    <img class="card-img-top" src="${item.avatar}" alt="Card image cap">
    <div class="card-body">
      <h6 class="card-title">${item.name} ${item.surname}</h6>
    </div>
    <div class="card-footer text-muted">
      <button type="button" class="btn btn-primary btn-show-user" data-toggle="modal"
        data-target="#exampleModal" data-id="${item.id}">Information</button>
      <button type="button" class="btn btn-info btn-add-favorite">Like!</button>
    </div>
  </div>
    `
  });
  userList.innerHTML = rawHTML
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  // 200 / 32 = 6...8 =7
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `
      <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `
    paginator.innerHTML = rawHTML
  }
}

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  renderUserList(getUsersByPage(page))
})

function getUsersByPage(page) {
  // page 1 --> 0~31
  // page 2 --> 32~63
  // ...
  const startIndex = (page - 1) * USERS_PER_PAGE
  return users.slice(startIndex, startIndex + USERS_PER_PAGE)
}

function showUserInfo(id) {
  const modalName = document.querySelector("#modal-user-name")
  const modalAvatar = document.querySelector("#modal-user-avatar")
  const modalEmail = document.querySelector("#modal-email")
  const modalGender = document.querySelector("#modal-gender")
  const modalAge = document.querySelector("#modal-age")
  const modalRegion = document.querySelector("#modal-region")
  const modalBirthday = document.querySelector("#modal-birthday")
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data
    modalName.innerText = data.name + " " + data.surname
    modalAvatar.innerHTML = `<img src=${data.avatar}
    alt="User Avatar" class="img-fluid avatar">
    `
    modalEmail.innerText = data.email
    modalGender.innerText = data.gender
    modalAge.innerText = data.age
    modalRegion.innerText = data.region
    modalBirthday.innerText = data.birthday
  })
}

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  let filterdUsers = []
  if (!keyword.length) {
    return alert('請輸入字串')
  }

  filterdUsers = users.filter((user) =>
    user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword)
  )
  renderUserList(filterdUsers)
})

axios.get(INDEX_URL).then((response) => {
  users.push(...response.data.results)
  renderPaginator(users.length)
  renderUserList(getUsersByPage(1))
  userList.addEventListener('click', function onInfoClicked(event) {
    showUserInfo(event.target.dataset.id)
  })
})
