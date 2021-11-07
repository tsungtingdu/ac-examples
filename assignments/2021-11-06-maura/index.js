const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12

const movies = []
let filteredMovies = []
let currentPage = 1

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const modeChangeSwitch = document.querySelector('#change-mode')

function renderMovieList(data) {
  if (dataPanel.dataset.mode === 'card-mode'){
    let rawHtml = ''
    data.forEach(item => {
      rawHtml += `
      <div class="col-sm-3">
        <div class="my-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id=${item.id}>More</button>
              <button type="button" class="btn btn-info btn-add-favorite" data-id=${item.id}>+</button>
            </div>
          </div>
        </div>
      </div>
  `
    })
    dataPanel.innerHTML = rawHtml
  } else if(dataPanel.dataset.mode === 'list-mode'){
    let rawHtml = '<ul class="list-group list-group-flush flex-fill">'
    data.forEach(item => {
      rawHtml += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${item.title}</span>
          <span><button type="button" class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
              data-bs-target="#movie-modal" data-id=${item.id}>More</button>
            <button type="button" class="btn btn-info btn-add-favorite" data-id=${item.id}>+</button></span>
        </li>
      `
    })
    rawHtml += '</ul>'
    dataPanel.innerHTML = rawHtml
  }
  
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHtml = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }

  paginator.innerHTML = rawHtml
}

function showMovieModal(id) {
  const movieTitle = document.querySelector('#movie-modal-title')
  const movieImage = document.querySelector('#movie-modal-image')
  const movieDate = document.querySelector('#movie-modal-date')
  const movieDescription = document.querySelector('#movie-modal-description')

  axios.get(INDEX_URL + id).then(response => {
    const data = response.data.results
    movieTitle.innerText = data.title
    movieDate.innerText = `Release Date: ${data.release_date}`
    movieDescription.innerText = data.description
    movieImage.innerHTML = `
    <img src="${POSTER_URL + data.image}" alt="Movie Poster" class="img-fluid">
    `
  })

}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find(movie => movie.id === id)
  if (list.some(movie => movie.id === id)) {
    return alert('此電影已在收藏清單中!')
  }
  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}

function getMoviesByPage(page) {
  //page1 0 - 11
  //page2 12 - 23
  //page3 24 - 35
  const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function changeDisplayMode(displayMode) {
  if(dataPanel.dataset.mode !== displayMode) return dataPanel.dataset.mode = displayMode
}

modeChangeSwitch.addEventListener('click', function onSwitchClicked(event) {
  if(event.target.matches('#card-mode-btn')) {
    changeDisplayMode('card-mode')
    renderMovieList(getMoviesByPage(currentPage))
  } else if(event.target.matches('#list-mode-btn')) {
    changeDisplayMode('list-mode')
    renderMovieList(getMoviesByPage(currentPage))
  }
})


searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(keyword))
  if (filteredMovies.length === 0) {
    alert('Cannot find movies keyword: ' + keyword)
  }
  currentPage = 1
  renderPaginator(filteredMovies.length)
  renderMovieList(getMoviesByPage(currentPage))
})

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  currentPage = page
  renderMovieList(getMoviesByPage(currentPage))
})

axios.get(INDEX_URL).then(response => {
  movies.push(...response.data.results)
  renderPaginator(movies.length)
  renderMovieList(getMoviesByPage(currentPage))
})