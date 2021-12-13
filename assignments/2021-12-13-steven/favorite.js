// 變數：API位址
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com';
const INDEX_URL = BASE_URL + '/api/v1/users/';
// 變數：儲存 API Users 資料
const favoriteList = JSON.parse(localStorage.getItem('favoriteUsers')) || []
// 變數：儲存最近的 user list 渲染結果
let userShowAnswer = favoriteList.slice(0, favoriteList.length)
// 變數：節點
const userPanel = document.querySelector('#user-panel');
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const btnRemoveFavorite = document.querySelector('#btn-remove-favorite')
const paginator = document.querySelector('#paginator')
// 變數：分頁器每頁顯示筆數
const USER_PER_PAGE = 12



// 網頁初始狀態，渲染收藏清單的分頁 1
renderUserList(getUsersByPage(1))
renderPaginator(favoriteList.length)
setEventListenerToUserCards()


// 事件監聽：搜尋欄提交事件
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  // 停止瀏覽器的預設行為
  event.preventDefault()

  const keyword = searchInput.value.trim().toLowerCase()
  const filteredUsers = favoriteList.filter(user => {
    const fullName = `${user.name} ${user.surname}`
    return fullName.toLowerCase().includes(keyword)
  })

  // 若沒有符合 keyword 的 user，則跳出對話視窗，且不進行渲染 User list
  if (!filteredUsers.length) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的人`)
  }

  userShowAnswer = filteredUsers
  renderUserList(getUsersByPage(1))
  renderPaginator(userShowAnswer.length)
  setEventListenerToUserCards()
})


// 事件監聽：按下 User modal 中的"remove from favorite"紐，將此 user 自收藏清單中移除
btnRemoveFavorite.addEventListener('click', function onBtnRemoveFavoriteClicked(event) {
  removeFromFavorite(Number(event.target.dataset.id))
})


// 事件監聽：分頁器頁碼點擊事件
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return

  const page = Number(event.target.dataset.page)
  renderUserList(getUsersByPage(page))
  setEventListenerToUserCards()
})




// 函式：渲染 User list
function renderUserList(data) {
  let textHTML = '';
  data.forEach((element) => {
    textHTML += `
    <div class="col-md-3 col-lg-2">
      <div class="mb-3">
        <div class="card card-show-modal" data-toggle="modal" data-target="#user-modal" data-id="${element.id}">
          <img src="${element.avatar}" class="card-img-top" alt="Avatar">
          <div class="card-body p-1">
            <p class="card-text"><strong>${element.name} ${element.surname}</strong></p>
          </div>
        </div>
      </div>
    </div>
  `;
  });
  userPanel.innerHTML = textHTML;
}

// 函式：在所有代表 User 頭像的 Card 上設置事件監聽-->點擊卡片，則渲染 User modal
function setEventListenerToUserCards() {
  const userCards = document.querySelectorAll('.card-show-modal');
  userCards.forEach((card) => {
    card.addEventListener('click', function userCardClicked(event) {
      const id = this.dataset.id;
      // 渲染 User modal
      renderUserModal(id);
    });
  });
}

// 函式：渲染 User modal
function renderUserModal(id) {
  const userModalName = document.querySelector('#user-modal-name');
  const userModalImage = document.querySelector('#user-modal-image');
  const userModalInfo = document.querySelector('#user-modal-info');
  const userModaldate = document.querySelector('#user-modal-date');

  axios
    .get(`${INDEX_URL}${id}`)
    .then((response) => {
      const data = response.data;
      const created_at = data.created_at.split('T')[0];
      const updated_at = data.updated_at.split('T')[0];

      userModalName.innerText = `${data.name} ${data.surname}`;
      userModalImage.innerHTML = `
        <img src="${data.avatar}" alt="Avatar" class="img-fluid rounded">
      `;
      userModalInfo.innerHTML = `
        <li>email: ${data.email}</li>
        <li>gender: ${data.gender}</li>
        <li>age: ${data.age}</li>
        <li>region: ${data.region}</li>
        <li>birthday: ${data.birthday}</li>
      `;
      userModaldate.innerHTML = `
        created at: ${created_at}<br>
        updated at: ${updated_at}
      `;
      btnRemoveFavorite.dataset.id = id
    })
    .catch((error) => {
      console.log(error);
    });
}

// 函式：將 user 自收藏清單中移除
function removeFromFavorite(id) {
  if (!favoriteList || !favoriteList.length) return
  
  const userIndexOfFavoriteList = favoriteList.findIndex(user => user.id === id)
  const userIndexOfShowAnswer = userShowAnswer.findIndex(user => user.id === id)

  if (userIndexOfFavoriteList === -1) return

  const removedUser = favoriteList.splice(userIndexOfFavoriteList, 1)[0]
  userShowAnswer.splice(userIndexOfShowAnswer, 1)
  localStorage.setItem('favoriteUsers', JSON.stringify(favoriteList))

  renderUserList(getUsersByPage(1))
  renderPaginator(userShowAnswer.length)
  setEventListenerToUserCards()
  alert(`你成功地將 ${removedUser.name} ${removedUser.surname} 自收藏清單中移除。`)
}

// 函式：渲染分頁器
function renderPaginator(amount) {
  const pageAmount = Math.ceil(amount / USER_PER_PAGE)

  let rawHTML = ''
  for (page = 1; page <= pageAmount; page++) {
    rawHTML += `
      <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `
  }
  paginator.innerHTML = rawHTML
}

// 函式：依據分頁器頁數，回傳部分 user 資料
function getUsersByPage(page) {
  const startIndex = (page - 1) * USER_PER_PAGE
  return userShowAnswer.slice(startIndex, startIndex + USER_PER_PAGE)
}