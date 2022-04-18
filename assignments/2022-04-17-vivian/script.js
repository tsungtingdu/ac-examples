const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movies = []
let filterMovie = []   // 移到這

const MOVIES_PER_PAGE = 12    // 分頁(每一頁出現12筆資料)

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const changeModeBtn = document.querySelector('#change-mode')

searchForm.addEventListener('submit', function onSearchFormSubmitted(event){
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  // filter 作法
  filterMovie = movies.filter((movie)=>
    movie.title.toLowerCase().includes(keyword)
  )
  if(filterMovie.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  // renderMovieList(filterMovie)
  renderPaginator(filterMovie.length)
  // renderMovieList(getMoviesByPage(1))
  checkMode(getMoviesByPage(1))
})


dataPanel.addEventListener('click', function onPanelClicked(event) {
  if(event.target.matches('.btn-show-movie')) {
    showMovieModal(event.target.dataset.id)
  } else if(event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

function checkMode(data) {
  // 預設為 check-mode
  if(dataPanel.dataset.mode === 'check-mode' || dataPanel.dataset.mode === 'mode-card'){
    renderMovieCard(data)
  } else {
    renderMovieList(data)
  }
}

changeModeBtn.addEventListener('click', function onChangeMode(event){
  if(event.target.matches('#mode-card')){
    dataPanel.dataset.mode = 'mode-card'
    renderMovieCard(getMoviesByPage(1))
  } else if(event.target.matches('#mode-list')) {
    dataPanel.dataset.mode = 'mode-list'
    renderMovieList(getMoviesByPage(1))
  }
})

function renderMovieCard(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${
          POSTER_URL + item.image
        }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" 
            data-bs-toggle="modal" data-bs-target="#movie-modal"
            data-id="${item.id}">
              More
          </button>
          <button class="btn btn-info btn-add-favorite"
            data-id="${item.id}">
            +
          </button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function renderMovieList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `
      <ul class="d-flex justify-content-between border-bottom list-group-flush">
        <span>${item.title}</span>
        <div>
          <button class="btn btn-primary btn-show-movie" 
            data-bs-toggle="modal" data-bs-target="#movie-modal"
            data-id="${item.id}">
              More
          </button>
          <button class="btn btn-info btn-add-favorite"
            data-id="${item.id}">
            +
          </button>
        </div>
      </ul>
    `
  })
  dataPanel.innerHTML = rawHTML
}


axios
  .get(INDEX_URL) // 修改這裡
  .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    // renderMovieList(getMoviesByPage(1))
    checkMode(getMoviesByPage(1))
  })
  .catch((err) => console.log(err))

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id).then((response)=>{
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `
      <img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">
    `
  })
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find((movie)=> movie.id === id)
  if(list.some((movie)=> movie.id === id)) {
    return alert('此電影已在收藏清單中')
  }
  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
  console.log(list)
}

function getMoviesByPage(page) {
  const data = filterMovie.length ? filterMovie : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE

  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `
      <li class="page-item">
        <a class="page-link" href="#" data-page="${page}">${page}</a>
      </li>
    `
  }
  paginator.innerHTML = rawHTML
}

paginator.addEventListener('click', function onPaginatorClicked(event){
  if(event.target.tagName !== 'A') return

  const page = Number(event.target.dataset.page)
  // renderMovieList(getMoviesByPage(page))
  checkMode(getMoviesByPage(page))
})