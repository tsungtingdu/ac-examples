"use strict";
const BASE_URL = "https://movie-list.alphacamp.io/";
const INDEX_URL = BASE_URL + "api/v1/movies/";
const POSTER_URL = BASE_URL + "posters/";

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
// 宣告變數modeIcon並選出改變mode的圖示
const changeModeIcon = document.querySelector(".mode-icon");

const movies = [];
// 宣告變數movies_per_page並放入每一頁要呈現多少部電影
const movies_per_page = 12;
// 宣告空的變數陣列filteredMovies
let filteredMovies = [];
// 宣告變數currentPage並放入數字1(剛連結網頁時為第一頁)
let currentPage = 1;

axios
  .get(INDEX_URL)
  .then((response) => {
    const data = response["data"]["results"];

    movies.push(...data);
    // 呼叫displayPaginator函式
    displayPaginator(movies.length);

    displayMovieList(getMoviesByPage(currentPage));
  })
  .catch((error) => {
    console.log(error);
  });

// 在dataPanel上加監聽器
dataPanel.addEventListener("click", onPanelClicked);

// 在searchForm上加監聽器
searchForm.addEventListener("submit", onSearchFormSubmitted);

// 在paginator上加監聽器
paginator.addEventListener("click", onPaginatorClicked);

// 在changeModeIcon上放監聽器
changeModeIcon.addEventListener("click", onSwitchClicked);

// 宣告displayMovieList函式
function displayMovieList(data) {
  let rawHTML = "";

  // 當mode為card-mode時要呈現的頁面
  if (dataPanel.dataset.mode === "card-mode") {
    data.forEach((item) => {
      rawHTML += `
        <div class="col-sm-3">
            <div class="card m-3" style="width: 15rem; height: 32rem;">
              <img src="${
                POSTER_URL + item.image
              }" class="card-img-top" class="card-img-top" alt="Movie Poster">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
              </div>
              <div class="card-footer">
                <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${
                  item.id
                }">More</button>
              <button type="button" class="btn btn-dark btn-add-favorite" data-id="${
                item.id
              }">+</button>
              </div>
            </div>
          </div>
          `;
    });
    // 當mode為list-mode時要呈現的頁面
  } else if (dataPanel.dataset.mode === "list-mode") {
    data.forEach((item) => {
      rawHTML += `
      <div class="container border-top mt-3">
        <div class="row justify-content-between p-3">
          <p>${item.title}</p>
          <div class="button-footer">
              <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
            <button type="button" class="btn btn-dark btn-add-favorite" data-id="${item.id}">+</button>
          </div>
        </div> 
      </div>
    `;
    });
  }
  dataPanel.innerHTML = rawHTML;
}

// 宣告changeDisplayMode函式
function changeDisplayMode(displayMode) {
  // 當點擊到的mode跟當下的mode是一樣時結束函式
  if (dataPanel.dataset.mode === displayMode) return;
  // 如果是不一樣則將mode放入
  dataPanel.dataset.mode = displayMode;
}

// 宣告onSwitchClicked函式
function onSwitchClicked(event) {
  const target = event.target;
  // 如果點擊到的mode是list-mode時
  if (target.matches("#list-mode-button")) {
    changeDisplayMode("list-mode"); // 呼叫changeDisplayMode函式
    displayMovieList(getMoviesByPage(currentPage)); // 呼叫displayMoviesList函式並放入當下頁面的電影
    // 如果點擊到的mode是card-mode時
  } else if (target.matches("#card-mode-button")) {
    changeDisplayMode("card-mode"); // 呼叫changeDisplayMode函式
    displayMovieList(getMoviesByPage(currentPage)); // 呼叫displayMoviesList函式並放入當下頁面的電影
  }
}

// 宣告onPaginatorClicked函式
function onPaginatorClicked(event) {
  const target = event.target;
  // 宣告變數page並放入dataset中的page參數且將資料從string轉成number
  const page = Number(target.dataset.page);
  // 將currentPage放入page
  currentPage = page;
  // 宣告activeItem並放入paginator下的子元素
  const activeItem = paginator.children;

  // 由於activeItem是HTMLCollection
  // 所以用for回圈串接出每一個li標籤
  for (let item of activeItem) {
    // 如果已經有active的效果時，要先刪除active的效果
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }

  // 呼叫addActive函式
  addActive(event);

  // 如果點擊到的位置不包含a標籤則結束程式
  if (target.tagName !== "A") return;
  // 呼叫displayMovieList函式並放入點擊到的頁面所需的電影陣列
  displayMovieList(getMoviesByPage(currentPage));
}

// 宣告addActive函式並將點擊到的頁數加入active
function addActive(event) {
  const parent = event.target.parentElement;
  parent.classList.add("active");
}

// 以下為沒有修改的區域

// 宣告onSearchFormSubmitted函式
function onSearchFormSubmitted(event) {
  // 停止瀏覽器預設事件，在此即為傳送表單時，會重新載入首頁
  event.preventDefault();
  // 宣告變數keyword放入輸入字串並去除頭尾空格且轉換成小寫
  const keyword = searchInput.value.trim().toLowerCase();

  // 利用array中的filter留下含有keyword的電影名稱
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  // 當輸入空格或沒有輸入時，顯示"請輸入有效字串!!"
  if (!keyword.length) {
    return alert("請輸入有效字串!!");
  } else if (filteredMovies.length === 0) {
    // 當filteredMovies內沒有任何元素時，顯示"關鍵字沒有符合的電影"
    return alert(`輸入的關鍵字：${keyword} 沒有符合條件的電影`);
  }

  // 呼叫displayPaginator函式並呈現搜尋後所產生的頁數
  displayPaginator(filteredMovies.length);
  // 呼叫displayMovieList並將getMoviesByPage(1)放入參數中即可顯示搜尋第一頁
  currentPage = 1;
  displayMovieList(getMoviesByPage(currentPage));
}

// 宣告onPanelClicked函式
function onPanelClicked(event) {
  const target = event.target;
  const numId = Number(target.dataset.id);

  if (target.matches(".btn-show-movie")) {
    displayMovieModal(numId);
  } else if (target.matches(".btn-add-favorite")) {
    // 當按下+鈕時加入到favorite清單中
    addFavoriteList(numId); // 呼叫addFavoriteList函式
  }
}

// 宣告displayPaginator函式(動態呈現頁數列表)
function displayPaginator(amount) {
  // 宣告變數totalPages放入總頁數並利用Math.ceil取出大於等於的數
  const totalPages = Math.ceil(amount / movies_per_page);
  let rawHTML = "";

  // 因為從第一頁開始要有active的效果
  rawHTML += `
    <li class="page-item active">
    <a class="page-link" href="#" data-page="1">1</a>
  </li>
  `;

  // 利用for迴圈串接出每一頁的標籤並在a標籤中放入data-page
  // 以便動態產生出該頁所需的電影
  for (let page = 2; page <= totalPages; page++) {
    rawHTML += `
      <li class="page-item">
        <a class="page-link" href="#" data-page="${page}">${page}</a>
      </li>
    `;
  }
  paginator.innerHTML = rawHTML;
}

// 宣告getMoviesByPage函式(目的要能夠達到輸入頁數就輸出該頁數所需呈現的電影)
function getMoviesByPage(page) {
  // 宣告startIndex並放入起始index號碼
  const startIndex = (page - 1) * movies_per_page;
  // 宣告變數endIndex並放入結束index號碼
  const endIndex = startIndex + movies_per_page;
  // 宣告變數data又當filteredMovies中有電影時，就放入filteredMovies，反之則放入movies
  const data = filteredMovies.length ? filteredMovies : movies;

  // 回傳該頁數所需要的電影，利用slice將所需電影擷取出來
  return data.slice(startIndex, endIndex);
}

// 宣告addFavoriteList函式
function addFavoriteList(id) {
  // 宣告變數list放入提取localStorage中的資料或是空陣列
  // 如果前方item為true則回傳前方item，反之則回傳空陣列
  // 若前方與後方同時都為true時，則以前方為優先
  // 要提出localStorage中的資料時，需要利用JSON.parse()先將裡面的資料從string轉成array或object
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  // 宣告變數movie放入找出在movies陣列中與id符合的電影
  const movie = movies.find((movie) => movie.id === id);

  // 若在list中已經有相同id的電影時
  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中!!"); // 跑出提示訊息電影已經在收藏清單中
  }

  // 如果沒有的話就將movie object放入list array中
  list.push(movie);

  // 在localStorage中建立favorite的資料庫並放入利用JSON.stringify將list中的movie object轉成string
  // 由於localStorage中的資料都是以string儲存
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

function displayMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");
  const modalImage = document.querySelector("#movie-modal-image");

  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const data = response["data"]["results"];
      modalTitle.innerText = data["title"];
      modalDate.innerText = "Release Date: " + data["release_date"];
      modalDescription.innerText = data["description"];
      modalImage.innerHTML = `
      <img
              src="${POSTER_URL + data["image"]}"
              alt="movie-poster" class="img-fluid">
    `;
    })
    .catch((error) => {
      console.log(error);
    });
}
