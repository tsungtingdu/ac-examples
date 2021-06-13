const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = "https://lighthouse-user-api.herokuapp.com/api/v1/users/";
const users = JSON.parse(localStorage.getItem('addUsers'))
// 資料內容格式是陣列
const USERS_PER_PAGE = 16;
let filteredUsers = [];

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
// 加入到dataPanel中的HTML結構的函式
function renderUserList(data) {
    let rawHTML = "";
    data.forEach((item) => {
        rawHTML += `
    <div class="col-sm-3">
        <div class = "mb-2">
            <img src="${item.avatar}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <button type="button" class="btn btn-primary btn-show-info" data-toggle="modal"
                    data-target="#user-Modal" data-id = "${item.id}">More
                </button>
                 <button type="button" class="btn btn-primary btn-remove-user"
                     data-id = "${item.id}">X
                </button>
            </div>
        </div>
    </div>
        `;
    });
    dataPanel.innerHTML = rawHTML;
}

// 產生Modal 的內容函式，利用id為參數配對相應的資料
function showUserModal(id) {
    const modalTitle = document.querySelector("#user-modal-title");
    const modalAvatar = document.querySelector("#user-modal-avatar");
    const modalEmail = document.querySelector("#user-modal-email");
    const modalAge = document.querySelector("#user-modal-age");
    const modalGender = document.querySelector("#user-modal-gender");
    const modalRegion = document.querySelector("#user-modal-region");
    const modalDate = document.querySelector("#user-modal-date");
    // Show API https://lighthouse-user-api.herokuapp.com/api/v1/users/id
    axios.get(INDEX_URL + id).then((response) => {
        //  console.log(response)
        const data = response.data;
        modalTitle.innerText = `${data.name}  ${data.surname}`;
        modalAvatar.innerHTML = `<img src="${data.avatar}" class="card-img-top" alt="user-avatar">`;
        modalEmail.innerHTML = `E-mail： ${data.email}`;
        modalGender.innerText = `gender： ${data.gender}`;
        modalAge.innerText = `Age： ${data.age}`;
        modalRegion.innerText = `region： ${data.region}`;
        modalDate.innerText = `birthday： ${data.birthday}`;
    });
}

// 設定頁面中所顯示的資料筆數
function getUsersByPage(page) {
    const data = filteredUsers.length ? filteredUsers : users;
    const startIndex = (page - 1) * USERS_PER_PAGE;
    return data.slice(startIndex, startIndex + USERS_PER_PAGE);
}

// 計算總頁數
function renderUserPage(amount) {
    const numberOfPage = Math.ceil(amount / USERS_PER_PAGE);
    let rawHTML = "";

    for (let page = 1; page <= numberOfPage; page++) {
        rawHTML += `
  <li class="page-item"><a class="page-link" href="#" data-page=${page}>${page}</a></li>
    `;
    }
    paginator.innerHTML = rawHTML;
}
//
// 監聽 data panel
dataPanel.addEventListener("click", function onPanelClicked(event) {
    // console.log(event)
    if (event.target.matches(".btn-show-info")) {
        showUserModal(Number(event.target.dataset.id));
    } else if (event.target.matches(".btn-remove-user")) {
        removeUser(Number(event.target.dataset.id))
    }
});


// 刪除使用者
function removeUser(id) {
    //  console.log(id)
    const userIndex = users.findIndex((user) => user.id === id)
    users.splice(userIndex, 1)
    localStorage.setItem('addUsers', JSON.stringify(users))
    renderUserList(users
    )
}

renderUserList(users)