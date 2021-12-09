const BASE_URL = 'https://movie-list.alphacamp.io/'
const INDEX_URL = BASE_URL + 'api/v1/movies/'
const POSTER_URL = BASE_URL + 'posters/'
const dataPanel = document.querySelector('#data-panel')
const movieModel = document.querySelector('#movie-model')
const movies = []
let searchedMovies = []

const searchForm = document.querySelector('#search-form')
const MOVIES_PER_PAGE = 12
const paginator = document.querySelector('#paginator')

// JS註解皆為 卡片-清單模式 所寫

// 新增變數
const controlForm = document.querySelector('#control-form')
let currentForm = 'card-form'
let currentPage = 1

// render movie方式1: 卡片模式
// renderMovieList命名改為renderMovieByCardForm
function renderMovieByCardForm(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `
      <div class="card mt-3" style="width: 21%">
        <img
          src=${POSTER_URL + item.image}
          class="card-img-top" alt="Movie Poster">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#modal" data-id="${item.id}">
              More
            </button>
            <a href="#" class="btn btn-info btn-add-favorite" data-id="${item.id}">+</a>
          </div>
        </div>
      `
  })
  dataPanel.innerHTML = rawHTML
}

// render movie方式2: 清單模式
// 新增function
function renderMovieByListForm(data) {
  let rawHTML = ''
  rawHTML += `<table class="table">
        <tbody>
          <tr>
            <th scope="row"></th>
            <td></td>
          </tr>`
  data.forEach(item => {
    rawHTML += `
    <tr>
      <th scope="row">${item.title}</th>
      <td class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary btn-show-movie mx-2" data-bs-toggle="modal"
          data-bs-target="#modal" data-id="${item.id}">
          More
        </button>
        <a href="#" class="btn btn-info btn-add-favorite" data-id="${item.id}">+</a>
      </td>
    </tr>`
  })
  rawHTML += `
        </tbody>
      </table>`
  dataPanel.innerHTML = rawHTML
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('.modal-title')
  const modelImg = document.querySelector('.model-img')
  const modelDate = document.querySelector('.modal-date')
  const modalDescription = document.querySelector('.modal-description')
  axios.get(INDEX_URL + String(id))
    .then(function (response) {
      const movieData = response.data.results
      modalTitle.innerText = movieData.title
      modelImg.src = POSTER_URL + movieData.image
      modelDate.innerText = 'Release date : ' + movieData.release_date
      modalDescription.innerText = movieData.description
    })
    .catch(error => console.log(error))
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  if (list.some(movie => movie.id === id)) {
    return alert('此部電影已加入收藏清單')
  }
  const movie = movies.find(movie => movie.id === id)
  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}

searchForm.addEventListener('submit', function onSearchFormClicked(e) {
  e.preventDefault()
  const searchInput = document.querySelector('#search-input')
  const keyword = searchInput.value.trim().toLowerCase()
  searchedMovies = movies.filter(movie => movie.title.toLowerCase().includes(keyword))
  if (searchedMovies.length === 0) return alert('cannot find: ' + keyword)
  currentPage = 1
  renderPaginator(searchedMovies.length)
  renderMovieByCardForm(getMoviesByPage(currentPage))
})

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-add-favorite')) {
    const id = Number(event.target.dataset.id)
    addToFavorite(id)
  }
})

function renderPaginator(numbersOfMovies) {
  const numbersOfPage = Math.ceil(numbersOfMovies / MOVIES_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numbersOfPage; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" data-page="${page}" href="#">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

// 新增監聽器: 
// 1.currentPage=點到的頁數
// 2.渲染該頁
paginator.addEventListener('click', function onPaginatorClicked(e) {
  if (e.target.tagName !== 'A') return
  currentPage = Number(e.target.dataset.page)
  renderMovieByForm(currentPage)
})

function getMoviesByPage(page) {
  const selectedMovies = (searchedMovies.length === 0) ? movies : searchedMovies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  const endIndex = startIndex + MOVIES_PER_PAGE
  return selectedMovies.slice(startIndex, endIndex)
}

// 新增function: 
// 1.根據目前模式是 '卡片or清單'，用 '卡片or清單' 渲染電影
// 2.根據傳進來的頁數，決定渲染第幾頁
function renderMovieByForm(page) {
  if (currentForm === 'card-form') {
    renderMovieByCardForm(getMoviesByPage(page))
  } else if (currentForm === 'list-form') {
    renderMovieByListForm(getMoviesByPage(page))
  }
}

// 新增監聽器: 
// 1.點擊卡片圖式->currentForm='card-form'
//   點擊清單圖式->currentForm='list-form'
// 2.根據currentForm渲染頁面
controlForm.addEventListener('click', (e) => {
  currentForm = e.target.id
  renderMovieByForm(currentPage)
})

axios.get(INDEX_URL)
  .then(response => {
    movies.push(...response.data.results)
    renderMovieByForm(currentPage) //根據currentForm渲染頁面
    renderPaginator(movies.length)
  })
  .catch(error => console.log(error))


