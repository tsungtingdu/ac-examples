// API URLs
const baseURL = 'https://movie-list.alphacamp.io'
const indexURL = baseURL + '/api/v1/movies/'
const posterURL = baseURL + '/posters/'

// data
const movies = []
let filteredMovies = []
const MOVIES_PER_PAGE = 12
let currentPage = 1

// elements
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const modeChange = document.querySelector('#change-mode')

// functions

const renderPaginator = (amount) => {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ``
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page=${page}>${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

const renderMovieList = (data) => {
  let rawHTML = ``
  if (dataPanel.dataset.mode === 'card-mode') {
    data.forEach((item) => {
      rawHTML += `
        <div class="col-sm-3">
            <div class="mb-2">
                <div class="card">
                    <img
                        src="${posterURL + item.image}"
                        class="card-img-top"
                        alt="..."
                    />
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                    <div class="card-footer">
                        <button
                            class="btn btn-primary btn-show-movie"
                            data-bs-toggle="modal"
                            data-bs-target="#movie-modal"
                            data-id="${item.id}"
                        >
                            More
                        </button>
                        <button class="btn btn-info btn-add-favorite">+</button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
  } else if (dataPanel.dataset.mode === 'list-mode') {
    rawHTML = `<ul class="list-group col-sm-12 mb-2">`
    data.forEach((item) => {
      rawHTML += `
        <li class="list-group-item d-flex justify-content-between">
          <h5 class="card-title">${item.title}</h5>
          <div>
            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal"
              data-id="${item.id}">More</button>
            <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
          </div>
        </li>`
    })
    rawHTML += '</ul>'
  }   
  dataPanel.innerHTML = rawHTML
}

const showMovieModal = (id) => {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')
    modalTitle.textContent = ''
    modalDate.textContent = ''
    modalDescription.textContent = ''
    modalImage.innerHTML = ``
    axios
        .get(indexURL + id)
        .then((res) => {
            const data = res.data.results
            modalTitle.textContent = data.title
            modalDate.textContent = 'Release date: ' + data.release_date
            modalDescription.textContent = data.description
            modalImage.innerHTML = `
            <img src="${posterURL + data.image}" alt="movie-poster" class="img-fluid">
            `
        })
        .catch((err) => {
            console.log(err)
        })
}


const getMoviesByPage = (page) => {
  const data = filteredMovies.length ? filteredMovies : movies;
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

const changeDisplayMode = (mode) => {
  if (dataPanel.dataset.mode === mode) return
  dataPanel.dataset.mode = mode
}

// event listener

dataPanel.addEventListener('click', (e) => {
    if (e.target.matches('.btn-show-movie')) {
        showMovieModal(e.target.dataset.id)
    }
})

searchForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )
  if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  renderPaginator(filteredMovies.length)
  renderMovieList(getMoviesByPage(currentPage))
})

paginator.addEventListener('click', (e)=> {
  if (e.target.tagName !== 'A') return
  const page = Number(e.target.dataset.page)
  currentPage = page
  renderMovieList(getMoviesByPage(currentPage))
})

modeChange.addEventListener('click', (e)=> {
   if (e.target.matches('#card-mode-button')) {
     changeDisplayMode('card-mode')
   } else if (e.target.matches('#list-mode-button')) {
     changeDisplayMode('list-mode')
   }
  renderMovieList(getMoviesByPage(currentPage))
})

// axios

axios
    .get(indexURL)
    .then((response) => {
        movies.push(...response.data.results)
        renderPaginator(movies.length)
        renderMovieList(getMoviesByPage(currentPage))
    })
    .catch((err) => console.log(err))