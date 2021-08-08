const BASE_URL = "https://movie-list.alphacamp.io/";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIES_PER_PAGE = 12;
let display_mode = "card"; //預設顯示模式為card
let now_page = 1; //初始頁面

const movies = [];
let filteredMovies = [];

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const displayMode = document.querySelector("#display-mode");
const listMode = document.querySelector("#list-mode");
const cardMode = document.querySelector("#card-mode");

// 函式：判斷顯示模式並載入電影資料
function renderMovieList(data) {
  if (display_mode === "card") {
    DisplayByCardMode(data);
  } else if (display_mode === "list") {
    DisplayByListMode(data);
  }
}

// 函式：卡片模式
function DisplayByCardMode(data) {
  let rawHTML = "";
  cardMode.parentElement.className = "border-bottom border-dark p-2 mr-2";
  listMode.parentElement.className = "p-2 mr-2";
  data.forEach((item) => {
    rawHTML += `
    <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal"
                data-target="#movie-modal" data-id="${item.id}">More</button>
              <button type="button" class="btn btn-info btn-add-favorite" data-id="${
                item.id
              }">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  dataPanel.innerHTML = rawHTML;
}

// 函式：列表模式
function DisplayByListMode(data) {
  let rawHTML = `<div class="col-sm-12"><table class="table">`;
  listMode.parentElement.className = "border-bottom border-dark p-2 mr-2";
  cardMode.parentElement.className = "p-2 mr-2";
  data.forEach((item) => {
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

// 函式：載入頁碼
function renderPaginator(amount) {
  const numberOfPage = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = "";
  for (let page = 1; page <= numberOfPage; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }
  paginator.innerHTML = rawHTML;
  paginator.children[now_page - 1].className = "page-item active";
}

// 函式：該頁電影陣列
function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies;
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

// 函式：載入modal詳細資訊
function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImg = document.querySelector("#movie-modal-img");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    modalTitle.innerHTML = data.title;
    modalImg.innerHTML = `<img
        src="${POSTER_URL + data.image}"
        alt="movie-poster" class="img-fluid">`;
    modalDate.innerHTML = "release date: " + data.release_date;
    modalDescription.innerHTML = data.description;
  });
}

// 函式：加入收藏至local storage
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);
  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中");
  }
  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
  return alert("收藏成功");
}

// dataPanel監聽器：判斷點擊位置
dataPanel.addEventListener("click", function onPanelClick(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id));
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

// searchForm 監聽器：input錯誤處理、篩選資料後重新載入頁碼及電影資料
searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();
  if (keyword.length === 0) {
    return alert("請輸入內容");
  }
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  now_page = 1;
  if (filteredMovies.length === 0) {
    return alert("Cannot find movie with keyword: " + keyword);
  }
  renderPaginator(filteredMovies.length);
  renderMovieList(getMoviesByPage(now_page));
});

// 分頁監聽器：判斷頁數並重新載入頁碼及電影資料
paginator.addEventListener("click", function onPaginatorClicked(event) {
  const target = event.target;
  const data = filteredMovies.length ? filteredMovies : movies;
  if (target.tagName !== "A") return;
  now_page = Number(event.target.dataset.page);
  renderPaginator(data.length);
  renderMovieList(getMoviesByPage(now_page));
});

// displayMode監聽器：判斷顯示模式並載入電影資料
displayMode.addEventListener("click", function onDisplayModeClicked(event) {
  const target = event.target;
  if (target.matches("#list-mode")) {
    display_mode = "list";
    renderMovieList(getMoviesByPage(now_page));
  } else if (target.matches("#card-mode")) {
    display_mode = "card";
    renderMovieList(getMoviesByPage(now_page));
  }
});

axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results);
    renderPaginator(movies.length);
    renderMovieList(getMoviesByPage(now_page));
  })
  .catch((err) => console.log(err));
