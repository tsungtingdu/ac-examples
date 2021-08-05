const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const selectedUsers = JSON.parse(localStorage.getItem('favoriteUsers')) || []

const users = []; //人名清單
let filteredUsers = [] //搜尋清單

const USERS_PER_PAGE = 12

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')

function renderUserList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += ` 
     <div class="col-sm-3">
      <div class="mb-2">
          <img src="${item.avatar}" class="card-img-top" alt="User-avatar">
          <div class="card-body">
            <h5 class="card-title">${item.name} ${item.surname}</h5>
          </div>
          <div class="card-footer ">
            <button class="btn btn-primary btn-show-user" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">About Me</button>
            <button class ="btn btn-info btn-add-favorite"> + </button>
          </div>
      </div>
    </div>
    `;
  });
  dataPanel.innerHTML = rawHTML;
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

function getUsersByPage(page) {
  const data = filteredUsers.length ? filteredUsers : users
  const startIndex = (page - 1) * USERS_PER_PAGE

  return data.slice(startIndex, startIndex + USERS_PER_PAGE)
}

function showUserModal(id) {
  const modalUserTitle = document.querySelector("#user-modal-title");
  const modalUserGender = document.querySelector("#user-modal-gender");
  const modalUserAge = document.querySelector("#user-modal-age");
  const modalUserBirthday = document.querySelector("#user-modal-birthday");
  const modalUserRegion = document.querySelector("#user-modal-region");
  const modalUserEmail = document.querySelector("#user-modal-email");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data;
    modalUserTitle.innerText = `${data.name} ${data.surname}`;
    modalUserGender.innerText = `Gender: ${data.gender}`;
    modalUserAge.innerText = `Age: ${data.age}`;
    modalUserBirthday.innerText = `Birthday: ${data.birthday}`;
    modalUserRegion.innerText = `Region: ${data.region}`;
    modalUserEmail.innerText = `Email: ${data.email}`;
  });
}


// listen to data panel
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-user")) {
    showUserModal(event.target.dataset.id);
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
});

//listen to search form
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword) //看看這邊 title是不是要改
  )

  if (filteredUsers.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的名單`)
  }
  renderPaginator(filteredUsers.length)
  renderUserList(getUsersByPage(1))
})

// listen to paginator
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return

  const page = Number(event.target.dataset.page)
  renderUserList(getUsersByPage(page))
})

function addToFavorite(id) {
  const selectedUsers = JSON.parse(localStorage.getItem('favoriteUsers')) || []
  const user = users.find((user) => user.id === id)

  if (selectedUsers.some((user) => user.id === id)) {
    return alert('此名單已經在收藏清單中！')
  }

  selectedUsers.push(user)
  localStorage.setItem('favoriteUsers', JSON.stringify(selectedUsers))
}

// send request to index api
axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderPaginator(users.length)
    renderUserList(getUsersByPage(1))
  })
  .catch((err) => console.log(err))