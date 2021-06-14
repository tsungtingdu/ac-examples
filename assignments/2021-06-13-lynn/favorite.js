const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const users = JSON.parse(localStorage.getItem('favoriteUsers'))

const dataPanel = document.querySelector('#data-panel')

function renderUserList(data) {
  let rawHTML = ''
  data.forEach(item => {
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
              <button class="btn btn-info btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  dataPanel.innerHTML = rawHTML
}


function removeFromFavorite(id) {
  if (!users) return

  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return
  users.splice(userIndex, 1)

  localStorage.setItem('favoriteUsers', JSON.stringify(users))

  renderUserList(users)
}


dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-user')) {
    showUserModal(Number(event.target.dataset.id))
    //新增以下
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
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


renderUserList(users)





