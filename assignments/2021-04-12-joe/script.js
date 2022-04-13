// 目前功能：
// click more 顯示 movie info
// 加入最愛
// 搜尋
// 分頁器：
//   顯示目前頁 / 總頁數
//   跳到第1頁
//   跳到最後1頁
//   點數字換頁
//   到前一頁
//   到後一頁
//   目前頁 class="active"
// LIST_DISPLAY
// CARD_DISPLAY
// 顯示模式儲存在 localStorage 'displayModes'，重新開網頁，或是在 index.html 和 favorite.html 之間切換，會使用記憶的顯示模式

const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIES_PER_PAGE = 12;
const PAGES_PER_PAGINATOR = 3;
const LIST_DISPLAY = 1;
const CARD_DISPLAY = 0;

let lastViewedPage = 1; // 目前瀏覽頁面
let numberOfPages = 0; // total pages
let pageStart = 0; // 分頁器最左邊的數字
let pageEnd = 0; // 分頁器最右邊的數字

// display mode
let displayMode =
  JSON.parse(localStorage.getItem("displayModes")) || CARD_DISPLAY;

const movies = []; // store movies as an array
let filteredMovies = []; // movies which are searched

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form"); // 搜尋監聽器
const searchInput = document.querySelector("#search-input"); // 關鍵字
const paginator = document.querySelector("#paginator");
const displayModeContainer = document.querySelector("#display-mode-container");

// show Movie Modal
// add to Favorite
dataPanel.addEventListener("click", onPanelClicked);
searchForm.addEventListener("submit", onSearchFormSubmitted); // 搜尋監聽器
paginator.addEventListener("click", onPaginatorClicked); // 分頁區域監聽器
displayModeContainer.addEventListener("click", onDisplaySwitch);

axios
  .get(INDEX_URL)

  .then((response) => {
    movies.push(...response.data.results); // total 80 movies
    numberOfPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

    setPageStartAndEnd();
    renderPaginator(pageStart, pageEnd);

    renderMovieList(getMoviesByPage(1), displayMode);
    lastViewedPage = 1;
    toggleActivePage(lastViewedPage);
  })
  .catch((err) => console.log(err));

function handleCardDisplay(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
      <div class="col-sm-3 mb-5">
        <div class="card">
          <img src="${
            POSTER_URL + item.image
          }" class="card-img-top" alt="Movie Poster" />

          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>

          <div class="card-footer">
            <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${
              item.id
            }">More</button>

            <button class="btn btn-info btn-add-favorite" data-id="${
              item.id
            }">+</button>
          </div>
        </div>
      </div>
    `;
  });
  dataPanel.innerHTML = rawHTML;
}
function handleListDisplay(data) {
  let rawHTML = "";
  rawHTML += '<table class="table table-dark table-hover">';
  data.forEach((item) => {
    rawHTML += `
      <tr>
      <td>${item.title}</td>

      <td><button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button></td>

      <td><button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button></td>
      </tr>
    `;
  });
  rawHTML += "</table>";
  dataPanel.innerHTML = rawHTML;
}
function renderMovieList(data, display) {
  if (display === CARD_DISPLAY) {
    handleCardDisplay(data);
  } else if (display === LIST_DISPLAY) {
    handleListDisplay(data);
  }
}

function onPanelClicked(event) {
  const target = event.target;
  const id = Number(target.dataset.id);
  if (target.matches(".btn-show-movie")) {
    showMovieModal(id);
  } else if (target.matches(".btn-add-favorite")) {
    addToFavorite(id);
  }
}

function showMovieModal(id) {
  const modalContent = document.querySelector(".modal-content");
  const found = movies.find((element) => element.id === id);
  const src = POSTER_URL + found.image;
  modalContent.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="movie-modal-title">${found.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body" id="movie-modal-body">
      <div class="row">
        <div class="col-sm-8" id="movie-modal-image">
          <img src=${src} alt="movie-poster" class="img-fuid">
        </div>
        <div class="col-sm-4">
          <p><em id="movie-modal-date">Release date: ${found.release_date}</em></p>
          <p id="movie-modal-description">${found.description}</p>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  `;
}
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  let movie = list.find((element) => element.id === id);
  if (movie) {
    // movie 有找到
    return alert("this movie is already in Favorite List");
  } else {
    // movie = undefined
    movie = movies.find((element) => element.id === id);
    list.push(movie);
    localStorage.setItem("favoriteMovies", JSON.stringify(list));
  }
}
function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.toLowerCase().trim();

  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  // 當使用者沒有輸入任何關鍵字時，畫面顯示全部電影
  // 使用者輸入一堆空白，在 include() 中傳入空字串，所有項目都會通過篩選）
  if (keyword.length === 0) {
    alert("input is empty");
  } else if (filteredMovies.length === 0) {
    // 當使用者輸入的關鍵字找不到符合條件的項目時，跳出提示
    return alert("Cannot find any User Name with keyword:【" + keyword + "】");
  }
  numberOfPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  setPageStartAndEnd();
  renderPaginator(pageStart, pageEnd);

  lastViewedPage = 1; // 搜尋後重新 render，回到第 1 頁
  renderMovieList(getMoviesByPage(lastViewedPage), displayMode);
  toggleActivePage(lastViewedPage);
}

function getMoviesByPage(page) {
  // data 可能等於全部 movies[]
  // 或者只等於被搜尋的 filteredMovies[]
  const data = filteredMovies.length ? filteredMovies : movies;
  // if filteredMovies.length > 0 => data = filteredMovies
  // else => data = movies

  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  return data.slice(startIndex, endIndex);
}

function setPageStartAndEnd() {
  pageStart = 1;
  pageEnd = pageStart + PAGES_PER_PAGINATOR - 1;
  if (numberOfPages < pageEnd) {
    pageEnd = numberOfPages;
  }
}

function renderPaginator(start, end) {
  let rawHTML = "";
  rawHTML += `
    <li class="page-link" id="now-page">Page: ${lastViewedPage} / ${numberOfPages}</li>
    <li class="page-item"><a class="page-link" id="first-page">K</a></li>
    <li class="page-item"><a class="page-link" id="previous-page" style="font-weight:bold;">ㄑ</a></li>
  `;
  for (let page = start; page <= end; page++) {
    rawHTML += `
      <li class="page-item"><a class="page-link" data-page="${page}">${page}</a></li>
    `;
  }
  rawHTML += `
    <li class="page-item"><a class="page-link" id="next-page" style="font-weight:bold; transform:scaleX(-1);">ㄑ</a></li>
    <li class="page-item"><a class="page-link" id="last-page" style="transform:scaleX(-1);">K</a></li>
  `;
  paginator.innerHTML = rawHTML;
}

function onPaginatorClicked(event) {
  const target = event.target;
  if (target.tagName !== "A" || numberOfPages === 0) return;

  if (target.matches("#previous-page")) {
    if (lastViewedPage - 1 <= 0) return; // now is at Page 1
    if (lastViewedPage - 1 < pageStart) {
      pageEnd = lastViewedPage - 1;
      pageStart = pageEnd - PAGES_PER_PAGINATOR + 1;
      renderPaginator(pageStart, pageEnd);
    }
    toggleActivePage(lastViewedPage);
    lastViewedPage = nowPageAdjust(lastViewedPage, -1);
    renderMovieList(getMoviesByPage(lastViewedPage), displayMode);
    toggleActivePage(lastViewedPage);
    return;
  } else if (target.matches("#next-page")) {
    if (lastViewedPage + 1 > numberOfPages) return; // now is at Final Page
    if (lastViewedPage + 1 > pageEnd) {
      pageStart = lastViewedPage + 1;
      pageEnd = pageStart + PAGES_PER_PAGINATOR - 1;
      if (pageEnd > numberOfPages) pageEnd = numberOfPages; // 不需要那麼多頁
      renderPaginator(pageStart, pageEnd);
    }
    toggleActivePage(lastViewedPage);
    lastViewedPage = nowPageAdjust(lastViewedPage, 1);
    renderMovieList(getMoviesByPage(lastViewedPage), displayMode);
    toggleActivePage(lastViewedPage);
    return;
  } else if (target.matches("#first-page")) {
    pageStart = 1;
    pageEnd = pageStart + PAGES_PER_PAGINATOR - 1;
    if (pageEnd > numberOfPages) pageEnd = numberOfPages; // 不需要那麼多頁
    renderPaginator(pageStart, pageEnd);
    lastViewedPage = nowPageAdjust(1, 0);
    toggleActivePage(lastViewedPage);
    renderMovieList(getMoviesByPage(lastViewedPage), displayMode);
  } else if (target.matches("#last-page")) {
    goToLastPage();
  } else {
    // 使用者直接點分頁的數字
    const page = Number(target.dataset.page);
    toggleActivePage(lastViewedPage);
    renderMovieList(getMoviesByPage(page), displayMode);
    lastViewedPage = nowPageAdjust(page, 0);
    toggleActivePage(lastViewedPage);
  }
}
function nowPageAdjust(now, adjust) {
  const nowPage = document.querySelector("#now-page");
  nowPage.innerHTML = `
    Page: ${now + adjust} / ${numberOfPages}
  `;
  return now + adjust;
}
function goToLastPage() {
  const remainder = numberOfPages % PAGES_PER_PAGINATOR;
  const quotient = Math.floor(numberOfPages / PAGES_PER_PAGINATOR);
  if (quotient === 0 && remainder === 0) {
    pageEnd = 0;
    pageStart = 1;
  } else if (remainder === 0) {
    pageEnd = numberOfPages;
    pageStart = pageEnd - PAGES_PER_PAGINATOR + 1;
  } else {
    pageStart = 1 + quotient * PAGES_PER_PAGINATOR;
    pageEnd = pageStart + remainder - 1;
  }
  renderPaginator(pageStart, pageEnd);
  lastViewedPage = nowPageAdjust(numberOfPages, 0);
  toggleActivePage(lastViewedPage);
  renderMovieList(getMoviesByPage(lastViewedPage), displayMode);
}

function toggleActivePage(page) {
  let str = "";
  str += '[data-page="' + page + '"]';
  // show('str', str)
  const node = document.querySelector(str);
  if (node === null) return;
  node.parentElement.classList.toggle("active");
}

function onDisplaySwitch(event) {
  const target = event.target;

  if (target.matches("#list-display") && displayMode === CARD_DISPLAY) {
    displayMode = LIST_DISPLAY;
    renderMovieList(getMoviesByPage(lastViewedPage), displayMode);
    localStorage.setItem("displayModes", JSON.stringify(LIST_DISPLAY));
  } else if (target.matches("#card-display") && displayMode === LIST_DISPLAY) {
    displayMode = CARD_DISPLAY;
    renderMovieList(getMoviesByPage(lastViewedPage), displayMode);
    localStorage.setItem("displayModes", JSON.stringify(CARD_DISPLAY));
  }
}