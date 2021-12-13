//技術總結：.dataset、arr.filter(函式)、.trim().、toLowerCase()、arr.includes(變數)、preventDefault()、arr.find(函式)
//localStorage.getItem、localStorage.setItem、arr.some(函式)、JSON.stringify、.tagName、?... : ...


const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIE_PER_PAGE = 12

const movies = []
let filteredMovies = []


const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-submit-button')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const listSwitch = document.querySelector('.list-switch')

let listSwitchID = listSwitch.dataset.id


function renderMovieCard(data) {
  let rawHTML = ''

  data.forEach(item => {

    // title, image
    rawHTML += `
      <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top" alt="Movie Poster" />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      </div>
    `
  });
  dataPanel.innerHTML = rawHTML
}

// page
function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies

  const startIndex = (page - 1) * MOVIE_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIE_PER_PAGE)
}

//get paginator
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIE_PER_PAGE)
  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`
  }

  paginator.innerHTML = rawHTML
}

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.innerText)

  if (listSwitchID === 'card') {
    renderMovieCard(getMoviesByPage(page))
  } else {
    renderMovieList(getMoviesByPage(page))
  }
})



function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-img')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    console.log(data.image)
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
  })
}

function addToFavorite(id) {

  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find((movie) => movie.id === id)

  if (list.some((movie) => movie.id === id)) {
    return alert('此電影已經在清單中')
  }

  list.push(movie)
  console.log(list)

  localStorage.setItem('favoriteMovies', JSON.stringify(list))

}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    console.log(Number(event.target.dataset.id))
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

//search form
searchForm.addEventListener('click', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()


  // if (!keyword.length) {
  //   return alert('please enter a valid string')
  // }
  filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(keyword)
  })
  if (filteredMovies.length === 0) {
    return alert("can't find the movie")
  }
  renderPaginator(filteredMovies.length)

  if (listSwitchID === 'card') {
    renderMovieCard(getMoviesByPage(1))
  } else {
    renderMovieList(getMoviesByPage(1))
  }

})

//List switched
function renderMovieList(data) {
  let rawHTML = `<ul class="list-group list-group-flush">`

  data.forEach(item => {

    // title, image
    rawHTML += `
      <li class="list-group-item mb-2">
        <h5 class="card-title">${item.title}</h5>
        <span>
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite"data-id="${item.id}">+</button>
        </span>
      </li>
    `
  });
  rawHTML += `</ul>`
  dataPanel.innerHTML = rawHTML
}



listSwitch.addEventListener('click', (element) => {
  if (element.target.className === 'fa fa-bars') {
    listSwitchID = 'list'
    renderMovieList(getMoviesByPage(1))
  } else if (element.target.className === 'fa fa-th') {
    listSwitchID = 'card'
    renderMovieCard(getMoviesByPage(1))
  }
})


axios
  .get('https://movie-list.alphacamp.io/api/v1/movies/')
  .then((response) => {
    movies.push(...response.data.results)
    renderMovieCard(getMoviesByPage(1))
    renderPaginator(movies.length)
  })
  .catch((err) => {
    console.log(err)
  })