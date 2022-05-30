const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const MOVIES_PER_PAGE = 12
// 宣告currentPage紀錄目前分頁，確保切換模式時分頁不會跑掉且搜尋時不會顯示錯誤
let currentPage = 1

const movies = []
let filteredMovies = []

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const switchMode = document.querySelector('#switch-mode')

// 加碼功能：新增依據不同模式需求，渲染出卡片/清單模式電影清單
function renderMovieList(data) {
  if (dataPanel.dataset.mode === 'card-mode') {
    let rawHTML = ''
    data.forEach((item) => {
        rawHTML += `
        <div class="col-sm-3">
            <div class="mb-2">
                <div class="card">
                    <img src="${POSTER_URL + item.image}"
                     class="card-img-top" alt="Movie Poster">
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
        </div>`
    })
    dataPanel.innerHTML = rawHTML
  } else if (dataPanel.dataset.mode === 'list-mode') {
    let rawHTML = '<ul class="list-group list-group-flush m-5">'
    data.forEach((item) => {
        rawHTML += `
  <li class="list-group-item d-flex justify-content-between">
    <h5 class="card-title">${item.title}</h5>
    <div><button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                        data-bs-target="#movie-modal" data-id="${item.id}">More</button>
                        <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button></div>
  </li>`  
    })
    rawHTML += `</ul>`
    dataPanel.innerHTML = rawHTML
  }
}

function renderPaginator(amount) {
    // 運用 Math.ceil（無條件進位到整數），計算出總計的頁數數量
    const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
    // 製作 template
    let rawHTML = ''
    for (let page = 1; page <= numberOfPages; page++) {
        rawHTML += `
        <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
    } 
    // 放回 HTML
    paginator.innerHTML = rawHTML
}

function getMoviesByPage(page) {
    // 如果搜尋結果有東西，條件判斷為 true ，會回傳 filteredMovies，然後用 data 保存回傳值
    const data = filteredMovies.length ? filteredMovies : movies
    // 設定起始 index
    const startIndex = (page - 1) * MOVIES_PER_PAGE
    // 回傳切割後的新陣列
    return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImg = document.querySelector('#movie-modal-img')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')
    axios.get(INDEX_URL + id).then((response) => {
        const data = response.data.results
        modalTitle.innerText = data.title
        modalDate.innerText = 'Release Date: ' + data.release_date
        modalDescription.innerText = data.description
        modalImg.innerHTML = `
        <img src="${POSTER_URL + data.image}" alt="movie-poster" id="image-fluid">`
    })
}

function addToFavorite(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = movies.find((movie) => movie.id === id)
    if (list.some((movie) => movie.id === id)) {
        return alert('此電影已加入進收藏清單中！')
    }
    list.push(movie)
    localStorage.setItem('favoriteMovies',JSON.stringify(list))
}

// 加碼功能：依據需求切換 data-mode 為清單/卡片顯示模式
function displayMode(mode) {
  if (dataPanel.dataset.mode === mode) return
  dataPanel.dataset.mode = mode
}

// 加碼功能：設定監聽事件：switchMode 
switchMode.addEventListener('click', function onSwitchModeClicked(event) {
    // 點擊到 list
    if (event.target.matches('#btn-list-mode')){
      displayMode('list-mode')
      renderMovieList(getMoviesByPage(currentPage))
    // 點擊到 card
}   else if(event.target.matches('#btn-card-mode')) {
      displayMode('card-mode')
      renderMovieList(getMoviesByPage(currentPage))
    }
})

// 設定監聽事件： dataPanel
dataPanel.addEventListener('click', function onPanelClicked(event) {
    // 點擊到 more
    if (event.target.matches('.btn-show-movie')){
    showMovieModal(Number(event.target.dataset.id))
    // 點擊到 +
}   else if(event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
    }
})

// 設定監聽事件： paginator
paginator.addEventListener('click', function onPaginatorClicked(event) {
    // 確保點擊的 event.target 為 <a> 語法標籤
    if (event.target.tagName !== 'A') return 
    // 透過 dataset 取得目標頁數
    const page = Number(event.target.dataset.page)
    // 帶入目前頁數   
    currentPage = page
    // 重新產出頁面
    renderMovieList(getMoviesByPage(currentPage))
})

// 設定監聽事件：搜尋列
searchForm.addEventListener('submit', function onSearchFormSubmitted(event){
    event.preventDefault()
    const keyword = searchInput.value.trim().toLowerCase()

    // 使用filter篩選
    filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(keyword)) 

    // 如果輸入的關鍵字無結果
    if (filteredMovies.length === 0) {
        return alert (`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
    }
    
    currentPage = 1
    renderPaginator(filteredMovies.length)
    renderMovieList(getMoviesByPage(currentPage))

})


// 載入 API 資料
axios
    .get(INDEX_URL)
    .then((response) => {
        movies.push(...response.data.results)
        renderPaginator(movies.length) 
        renderMovieList(getMoviesByPage(currentPage))
    })
    .catch((err) => console.log(err))

