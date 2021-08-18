const baseUrl = "https://lighthouse-user-api.herokuapp.com"
const indexUrl = baseUrl + "/api/v1/users"
const dataPanel = document.querySelector(".data-panel")
const modalBody = document.querySelector(".modal-body")
const searchBar = document.querySelector("#search-bar")
const searchInput = document.querySelector("#search-input")
const pagination = document.querySelector(".pagination")
const myFavourite = document.querySelector("#my-favourite")
const dataPerPage = 48

let searchFriends = []
const dataArray = JSON.parse(localStorage.getItem('favouriteUsers'))




// render userlist
pageGenerator(dataArray)
renderDataPanel(pageRenderer(1))

// search friends
searchBar.addEventListener('submit', function (e) {
  event.preventDefault()
  const input = searchInput.value.trim().toLowerCase()
  // 如果找不到就跳 alert
  if (!input.length) {
    searchFriends = []
    renderDataPanel(pageRenderer(1))
    return alert("Invalid Keywords")
  } else {
    searchFriends = []
    searchFriends.push(...dataArray.filter(friend => {
      return friend.name.toLowerCase().includes(input)
    }))
    renderDataPanel(pageRenderer(1))
    pageGenerator(searchFriends)
  }
  // 如果沒結果就跳 alert
  if (!searchFriends.length) {
    searchFriends = []
    renderDataPanel(pageRenderer(1))
    return alert("No results")
  }
})

// 跳頁
pagination.addEventListener('click', function (e) {
  event.preventDefault()
  let page = Number(e.target.dataset.page)
  renderDataPanel(pageRenderer(page))
})

// pop-up info
dataPanel.addEventListener('click', function (e) {
  if (e.target.matches('.card-img-top')) {
    axios.get(indexUrl + `/${e.target.dataset.id}`).then(function (response) {
      const result = response.data
      modalBody.innerText = `
      name:${result.name}
      surname:${result.surname}
      email:${result.email}
      gender:${result.gender}
      age:${result.age}
      region:${result.region}
      birthday:${result.birthday}`
    })
  }
  // 刪除好友
  if (e.target.id.includes("btn-delete-favourite")) {
    let useId = Number(e.target.dataset.id)
    deleteFavourite(useId)
  }
})




// 函式
// 刪除
function deleteFavourite(id) {
  let index = dataArray.findIndex(friend => friend.id === id)
  dataArray.splice(index, 1)
  localStorage.setItem('favouriteUsers', JSON.stringify(dataArray))
  renderDataPanel(pageRenderer(1))
}

// render 頁面
function renderDataPanel(data) {
  let rawHtml = ''
  data.forEach((friend) => {
    rawHtml += `
      <div class="card w-25">
        <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="${friend.avatar}" class="card-img-top" alt="..." data-id="${friend.id}">
        </button>
        <div class="card-body d-flex justify-content-between">
          <p class="card-text align-self-center">${friend.name}</p>
          <button type="button" class="btn btn-danger" id="btn-delete-favourite" data-id="${friend.id}">X</button>
        </div>
      </div>`
  })
  dataPanel.innerHTML = rawHtml
}

// 根據 data 的數量來決定頁面有幾頁
function pageGenerator(data) {
  let dataLength = data.length
  let pages = Math.ceil(dataLength / dataPerPage)
  let rawHtml = ''
  for (let page = 1; page <= pages; page++) {
    rawHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  pagination.innerHTML = rawHtml
}

// 在每一頁顯示指定的 dataPerPage
function pageRenderer(page) {
  let startIndex = (page - 1) * dataPerPage
  let data = searchFriends.length ? searchFriends : dataArray
  pageGenerator(data)
  return data.slice(startIndex, startIndex + dataPerPage)
}