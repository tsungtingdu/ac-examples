const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12
let mode = 'card' //預設為卡片模組
let PageNow = 1 //初始頁

const movies = []
let filteredMovies = []



const dataPanel = document.querySelector('#data-panel')
const paginator = document.querySelector('#paginator')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const displayMode = document.querySelector('#display-mode')
const cardMode = document.querySelector('#card-mode')
const listMode = document.querySelector('#list-mode')
//...

//*新的函式：判斷該顯示的模組
function renderList(data){
if (mode === 'card'){
renderMovieList(data)
}
else if (mode === 'list'){
 renderLinePage(data)
}
}

//函式：卡片模組顯示
function renderMovieList(data) {
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
          <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

//*新的函式：列表模組顯示
function renderLinePage(data){
  let rawHTML = `<div class="col-sm-12"><table class="table">`
  listMode.parentElement.className = "border-bottom border-dark p-2 mr-2";
  cardMode.parentElement.className = "p-2 mr-2";
  data.forEach((item) => {
    // title, image
    rawHTML += `
    <tr>
      <th scope="row"><h5 class="list-title">${item.title}</h5></th>
      <td>
        <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
        <button type="button" class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
      </td>
    </tr>
    `;
  });
  rawHTML += `</table></div>`;
  dataPanel.innerHTML = rawHTML;
}

//切割第一頁
function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  // // const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE
  )
}
//總頁數
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += ` <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
  paginator.children[PageNow - 1].className = 'page-item active'
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
//＊加入最愛
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find((movie) => movie.id === id)
  if (list.some((movie) => movie.id === id)) {
    return alert('此電影已經在收藏清單中')
  }
  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
  return alert('收藏成功')
}
//＠監聽器：按鈕顯示詳情與加入最愛
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  }
  else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

//@監聽器：搜尋電影
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault() 
  const keyword = searchInput.value.trim().toLowerCase()
  if (keyword.length === 0) {
    return alert('請輸入有效字串！')
  }
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )
  PageNow = 1
  if (filteredMovies.length === 0) {
    return alert('找不到這部電影: ' + keyword)
  }
  renderPaginator(filteredMovies.length) 
  // 預設顯示第 1 頁的搜尋結果
  renderList(getMoviesByPage(PageNow)) //修改這裡
})

//@監聽器：判斷頁數及重新載入頁碼與電影資料
paginator.addEventListener('click', function onPaginatorClicked(event) {
  const target = event.target
  const data = filteredMovies.length ? filteredMovies : movies
  if (event.target.tagName !== 'A') return
  PageNow = Number(event.target.dataset.page)
  renderPaginator(data.length)
  renderList(getMoviesByPage(PageNow))
})

// @監聽器：判斷顯示模式並載入電影資料
displayMode.addEventListener("click", function onDisplayModeClicked(event) {
  const target = event.target;
  if (target.matches("#list-mode")) {
    mode = "list";
  } else if (target.matches("#card-mode")) {
    mode = "card";
  }
  renderList(getMoviesByPage(PageNow));
});

axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderList(getMoviesByPage(PageNow))
  }).catch((err) => console.log(err))


//note
//新增兩個function和一個監聽功能
// function：
// -renderList作為電影呈現模式的判斷
// -renderLinePage為電影列表模式
// 監聽：
// displayMode為此次加碼的卡片與列表模式切換判斷


