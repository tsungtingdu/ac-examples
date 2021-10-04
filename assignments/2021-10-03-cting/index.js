const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12

const movies = [] //電影總清單
let filteredMovies = [] //搜尋清單
let NowPage = 1 //預設當前頁面

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const displayMode = document.querySelector('#display-mode')
const paginator = document.querySelector('#paginator')

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  //搜尋關鍵字取得資料=filterMovies有值（使用filterMovie來分頁），無取得（movies來分頁）
  
  const startIndex = (page - 1) * MOVIES_PER_PAGE //計算index起點

  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)//回傳切割後新的陣列
}

//設置Card和List監聽器
displayMode.addEventListener('click',function displayModeClicked(event) {
  if (event.target.tagName !== "I") return
  if (event.target.matches('.btn-card-mode')) {
    ModeChange('card-mode', 'list-mode')
  } else if (event.target.matches('.btn-list-mode')) {
    ModeChange('list-mode', 'card-mode')
  }
})

//模式加入data-pannel的class
function ModeChange(clickedMode, removeMode) {
  dataPanel.classList.add(clickedMode)
  dataPanel.classList.remove(removeMode) //刪除class後再渲染畫面
  renderMovieList(getMoviesByPage(NowPage))
}

function renderMovieList(data) {
  let rawHTML = ''

  if (dataPanel.classList.contains("card-mode")) {
    //新增判斷data-panel的class現在是card mode還是list mode，來render相對應模式的樣式
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
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${
            item.id
          }">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${
            item.id
          }">+</button>
        </div>
      </div>
    </div>
  </div>`
  })

 }else if (dataPanel.classList.contains("list-mode")) {
    data.forEach((item) => {
      rawHTML += `
    <div class="col-sm-12 border-top mb-3 pt-3">
        <div class="row">
          <div class="col-sm-8">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="col-sm-4">
            <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal"
              data-id=${item.id}>More</button>
            <button type="button" class="btn btn-info btn-add-favorite" data-id=${item.id}>+</button>
          </div>
        </div>
      </div>`
    })
  }

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
// listen to paginator
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  NowPage = Number(event.target.dataset.page)//記住現在頁面
  renderMovieList(getMoviesByPage(NowPage))
})

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title")
  const modalImage = document.querySelector("#movie-modal-image")
  const modalDate = document.querySelector("#movie-modal-date")
  const modalDescription = document.querySelector("#movie-modal-description")

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalImage.innerHTML = `<img src=${
      POSTER_URL + data.image
    } class="card-fluid"
       alt="Movie Poster">`
    modalDate.innerText = "Release at ：" + data.release_date
    modalDescription.innerText = data.description
  })
}
// listen to data panel
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(event.target.dataset.id)
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find((movie) => movie.id === id)

  if (list.some((movie) => movie.id === id)) {
    return alert('此電影已經在收藏清單中！')
  }

  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}



//listen to search form
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )

  if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  renderPaginator(filteredMovies.length)
  NowPage = 1 //搜尋出資料後要把NowPage預設為1，避免回到原先記錄的畫面
  renderMovieList(getMoviesByPage(NowPage))
})



// send request to index api
axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(NowPage))
  })
  .catch((err) => console.log(err))