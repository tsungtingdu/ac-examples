const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = []
let filteredMovies = []


const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const MOVIES_PER_PAGE = 12
const paginator = document.querySelector('#paginator')

//新增參數
const displayStyle = document.querySelector('#display-Style')
let currentPage = 1
let currentView = 'Card'

//Card的data panel
function renderMovieCard(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image
      }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id
      }">+</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
  currentView = 'Card'
}

//Column的data panel
function renderMovieColumn(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image
    rawHTML += `
    <div class="col-12 row border-bottom d-flex justify-content-center align-items-center mb-2 pb-2">

        <div class="col-6 text-center pt-3">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="col-6 text-center">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id
      }">+</button>
        </div>
      </div>`
  })
  dataPanel.innerHTML = rawHTML
  currentView = 'Column'
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
  })
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中！");
  }
  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}


function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)

  let rawHtml = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }

  paginator.innerHTML = rawHtml

}

paginator.addEventListener('click', function onPaginatorClick(event) {
  if (event.target.tagName !== 'A') return

  //新增currentPage抓取現在頁數

  currentPage = Number(event.target.dataset.page)

  //新增if else判定現在的display模式，換頁之後維持此模式

  if (currentView === 'Card') {
    renderMovieCard(getMoviesByPage(currentPage))
  } else {
    renderMovieColumn(getMoviesByPage(currentPage))
  }
})



searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()



  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )

  if (filteredMovies.length === 0) {
    alert(`Cannot find movie with keyword: ` + keyword)
  }
  renderPaginator(filteredMovies.length)
  renderMovieCard(filteredMovies)
})


dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(event.target.dataset.id)
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

//新增監聽器for切換display模式
displayStyle.addEventListener('click', function onDisplayStyleClicked(event) {
  if (event.target.matches('.list-column')) {
    renderMovieColumn(getMoviesByPage(currentPage))
  } else if (event.target.matches('.list-card')) {
    renderMovieCard(getMoviesByPage(currentPage))
  }
})





axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderMovieCard(getMoviesByPage(currentPage))
  })
  .catch((err) => console.log(err))

