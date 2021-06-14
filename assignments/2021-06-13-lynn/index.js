const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const users = [];
const USERS_PER_PAGE = 12

let filteredUsers = []

axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderPaginator(users.length)
    renderUserList(getUsersByPage(1))
  })
  .catch((err) => console.log(err));


const paginator = document.querySelector('#paginator')

function getUsersByPage(page) {
  const data = filteredUsers.length ? filteredUsers : users
  const startIndex = (page - 1) * USERS_PER_PAGE
  return data.slice(startIndex, startIndex + USERS_PER_PAGE)
}


function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }

  paginator.innerHTML = rawHTML
}


paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return

  const page = Number(event.target.dataset.page)
  renderUserList(getUsersByPage(page))
})




const dataPanel = document.querySelector('#data-panel')


function renderUserList(users) {
  let rawHTML = "";
  users.forEach((item) => {
    rawHTML += `
      <div class="col-sm-3">
        <div class="mb-3">
          <div class="card" style="width: 16rem;">
            <img
              src="${item.avatar}"
              class="card-img-top" alt="User Avatar">
            <div class="card-body">
              <h5 class="card-title">${item.name} ${item.surname}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-user" data-toggle="modal"
                data-target="#user-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}"><i class="fas fa-heart btn-add-favorite favorite-click-icon" data-id="${item.id}"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  dataPanel.innerHTML = rawHTML;
}


function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteUsers')) || []
  const user = users.find(user => user.id === id)

  if (list.some(user => user.id === id)) {
    return alert('此使用者已經在收藏清單中！')
  }

  list.push(user)
  console.log(list)


  localStorage.setItem('favoriteUsers', JSON.stringify(list))

}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-user')) {
    showUserModal(Number(event.target.dataset.id))
    //新增以下
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})


function showUserModal(id) {
  const modalName = document.querySelector("#user-modal-name");
  const modalGender = document.querySelector("#user-modal-gender");
  const modalAge = document.querySelector("#user-modal-age");
  const modalBirthday = document.querySelector("#user-modal-birthday");
  const modalRegion = document.querySelector("#user-modal-region");
  const modalEmail = document.querySelector("#user-modal-email");
  const modalAvatar = document.querySelector("#user-modal-avatar");


  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data;
    console.log(data);
    modalName.innerText = data.name + " " + data.surname;
    modalGender.innerHTML = `<i class="fas fa-venus-mars icon"></i> Gender : ${data.gender}`;
    modalAge.innerHTML = `<i class="far fa-calendar-alt icon"></i> Age : ${data.age}`;
    modalBirthday.innerHTML = `<i class="fas fa-birthday-cake icon"></i> Birthday : ${data.birthday}`;
    modalRegion.innerHTML = `<i class="fas fa-map-signs icon"></i> Region : ${data.region}`;
    modalEmail.innerHTML = `<i class="far fa-envelope icon"></i> Email : <a href="mailto:${data.email}"> ${data.email}</a>`;
    modalAvatar.innerHTML = `<img src="${data.avatar}" id="user-modal-img" alt="User Avatar"></img>`


  });
}

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()


  if (!keyword.length) {
    return alert('請輸入有效字串！')
  }

  filteredUsers = users.filter((user =>
    user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword)
  ))

  if (filteredUsers.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的使用者`)
  }

  renderPaginator(filteredUsers.length)
  renderUserList(getUsersByPage(1))
})



