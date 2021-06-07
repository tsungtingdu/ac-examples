const BASE_URL = "https://movie-list.alphacamp.io"
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movies = []
let filteredMovies = []
const MOVIES_PER_PAGE = 12
//因之後要用assign賦值 故用let 宣告變數
let nowPage = 1//此變數用於 不管是一開始渲染畫面為第一頁及 搜尋後渲染也仍為第一頁
let mode = 'card'//此變數用於 切換Card模式 或List模式 使判斷式 判斷使用者使用哪個模式
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
//在 CardMode 及ListMode 上的 div id="change-mode" 設下節點
const changeMode = document.querySelector('#change-mode')
//用API聯結 來渲染畫面
axios.get(INDEX_URL).then(response => {
  movies.push(...response.data.results)
  renderPaginator(movies.length)
  displayDataList()
})
.catch(error => {
    console.log(error)
  })
//根據 mode變數 來選擇渲染的函式
function displayDataList() {
  const movieList = getMoviesByPage(nowPage)
  mode === 'card' ? renderMovieListCardMode(movieList) : renderMovieListListMode(movieList)
}
//用list方式渲染畫面
function renderMovieListListMode(data) {
  let rawHTML = ''
  rawHTML += '<table class="table"><tbody>'
  data.forEach((item) => {
    rawHTML += `
        <tr>
          <td>
              <h5 class="card-title">${item.title}</h5>
          </td>
          <td>
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
          </td>
        </tr>
    `
  })
  rawHTML += '</tbody></table>'
  dataPanel.innerHTML = rawHTML
}
//用card的方式渲染畫面
function renderMovieListCardMode(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img class="card-img-top"
              src="${POSTER_URL + item.image}"
              alt="movie-poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>           
            <div class="card-footer text-muted">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal"
              data-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}
function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page -1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}
function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Realese date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">`
  })
}
//加入Favorite頁面
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find((movie) => movie.id === id)

  if (list.some((movie) => movie.id === id)) {
    return alert('此電影已經在收藏清單中！')
  }

  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}
//綁定事件
dataPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
//將點選的分頁碼 指派為 現在的頁數
  nowPage = Number(event.target.dataset.page)
  displayDataList()
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(keyword))
  if (filteredMovies.length === 0) {
    return alert('Cannot find movies with keyword: ' + keyword)
  }
  renderPaginator(filteredMovies.length)
  displayDataList()
})

//設立監聽器 點選圖示來更改mode值 以便 判斷使用者要體驗的模式
changeMode.addEventListener('click', function onChangeModeClicked(event) {
  if (event.target.matches('#cardMode')) {
    mode = 'card'
  } else if (event.target.matches('#listMode')) {
    mode = 'list'
  }
  displayDataList()
})


