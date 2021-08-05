const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";

const users = JSON.parse(localStorage.getItem('favoriteUsers')) || []
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
let filteredUsers = []

// 監聽 dataPanel
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-user')) {
    showUserModal(event.target.dataset.id) // 
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

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
            <button class="btn btn-primary btn-show-info" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">About Me</button>
            <button class ="btn btn-info btn-add-favorite"> + </button>
          </div>
      </div>
    </div>
    `;
  });
  dataPanel.innerHTML = rawHTML;
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

function removeFromFavorite(id) {
  if (!users) return

  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return

  users.splice(userIndex, 1)

  localStorage.setItem('favoriteUsers', JSON.stringify(users))

  renderUserList(users)
}

renderUserList(users)