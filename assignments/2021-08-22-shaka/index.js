const baseURL = "https://lighthouse-user-api.herokuapp.com"
const indexURL = baseURL + "/api/v1/users/"
const dataPanel = document.querySelector("#data-panel");
const paginator = document.querySelector(".pagination")

const searchForm = document.querySelector("#search-bar")
const searchInput = document.querySelector("#search-input")

const USERS = []
const perPageByUsers = 18

//顯使朋友名單
function getAllUser(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
      <div class="col-sm-2">
        <div class="mb-2">
          <div class="card">
            <img
              src="${item.avatar}"
              class="card-img-top" alt="User Avatar" data-toggle="modal" data-target="#user-modal" data-id="${item.id}"/>
            <div class="card-body">
              <h5 class="card-title">${item.name} ${item.surname}</h5>
            </div>
          </div>
        </div>
      </div >
      `;
  });
  dataPanel.innerHTML = rawHTML;
}

function showUserModal(id) {
  const modalTitle = document.querySelector("#user-modal-title");
  const modalImage = document.querySelector("#user-modal-image");
  const modalDescription = document.querySelector("#user-modal-description");
  axios.get(indexURL + "/" + id).then((response) => {
    const data = response.data;
    modalTitle.innerText = `${data.name} ${data.surname}`;
    modalImage.children[0].src = `${data.avatar}`;
    modalDescription.innerHTML = `
      Email : ${data.email}<br>
      age : ${data.age}<br>
      birthday : ${data.birthday}<br>
      gender : ${data.gender}<br>
      region : ${data.region}
    `;
  });
}


//設置搜尋的監聽器
searchForm.addEventListener("submit", function onSearchFormClicked(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  let filterName = []

  if (!keyword.length) {
    return alert("請輸入有效字串！")
  }
  //輸入的字串跟名字比對，有包含輸入字串的，丟到getAllUser函式裡
  filterName = USERS.filter((input) =>
    input.name.toLowerCase().includes(keyword))
  getAllUser(filterName)
})


function usersSetToPages(page) {
  const startIndex = (page - 1) * perPageByUsers
  return USERS.slice(startIndex, startIndex + perPageByUsers)
}

function getPages(total) {
  const pagesNumber = Math.ceil(total / perPageByUsers)

  let pageHTML = ""
  for (let page = 1; page <= pagesNumber; page++) {
    pageHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = pageHTML
}

paginator.addEventListener("click", function clickOnPagination(event) {
  if (event.target.tagName !== "A") return

  const thePage = Number(event.target.dataset.page)
  getAllUser(usersSetToPages(thePage))
})

axios.get(indexURL).then((response) => {
  USERS.push(...response.data.results)
  getPages(USERS.length)
  getAllUser(usersSetToPages(1))
})

// 監聽 data panel
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".card-img-top")) {
    showUserModal(event.target.dataset.id);
    // console.log(event.target.dataset.id)
  }
});
