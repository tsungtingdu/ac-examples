const BASE_URL = "https://movie-list.alphacamp.io/";
const INDEX_URL = BASE_URL + "api/v1/movies/";
const POSTER_URL = BASE_URL + "posters/";
const MOVIE_PER_PAGE = 12;

const movies = [];
let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
let filterMovies = [];
let currentPage = 1;

const navBar = document.querySelector("#nav-bar");
const dataPanel = document.querySelector("#data-panel");
const mainDiv = document.querySelector("#main");
const paginator = document.querySelector("#paginator");

// function
// 渲染當前清單+分頁
function renderMainDiv() {
  renderPaginator(getRenderData().length);
  renderMovieList(getMovieByPage(currentPage));
}
// 渲染電影清單(array:渲染內容)
function renderMovieList(data) {
  const type = dataPanel.dataset.viewType;
  type === "list" ? MoviesRenderList(data) : MoviesRenderCard(data);
}
function MoviesRenderCard(data) {
  let rawHTML = "";
  let btnHTML = "";

  data.forEach((item) => {
    btnHTML = favoriteMovies.some((movie) => movie.id === item.id)
      ? `<button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">x</button>`
      : `<button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>`;
    rawHTML += `<div class="col-sm-3 mb-2">
          <div class="card h-100">
            <img src="${
              POSTER_URL + item.image
            }" class="card-img-top btn-show-movie" style="height:376.5px" alt="Movie Poster" data-toggle="modal"  data-target="#movie-modal" data-id="${
      item.id
    }">
            <div class="card-body d-flex align-items-center btn-show-movie" data-toggle="modal"  data-target="#movie-modal" data-id="${
              item.id
            }">
              <h5 class="card-title my-0">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal"  data-target="#movie-modal" data-id="${
                item.id
              }">More</button>
              ${btnHTML}
            </div>
          </div>
      </div>`;
  });

  dataPanel.classList.remove("table-responsive");
  dataPanel.innerHTML = rawHTML;
}
function MoviesRenderList(data) {
  let preHTML = '<table class="table"><tbody>';
  let sufHTML = "</tbody></table>";
  let rawHTML = "";

  data.forEach((item) => {
    btnHTML = favoriteMovies.some((movie) => movie.id === item.id)
      ? `<button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">x</button>`
      : `<button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>`;
    rawHTML += `          <tr>
            <th scope="row" class="align-middle btn-show-movie" data-toggle="modal"  data-target="#movie-modal" data-id="${item.id}">
              ${item.title}
            </td>
            <td class="text-right">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal"  data-id="${item.id}">More</button>
              ${btnHTML}
            </td>
          </tr>`;
  });

  dataPanel.classList.add("table-responsive");
  dataPanel.innerHTML = preHTML + rawHTML + sufHTML;
}
// 渲染分頁器(int:渲染物件數)
function renderPaginator(amount) {
  if (amount === 0) amount = 1;
  const numberOfPages = Math.ceil(amount / MOVIE_PER_PAGE);
  let rawHTML = "";
  for (let page = 1; page < numberOfPages + 1; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }

  paginator.innerHTML = rawHTML;
  paginator.children[currentPage - 1].classList.add("active");
}
function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  // inition
  modalTitle.textContent = "";
  modalDate.textContent = "Release date: ";
  modalDescription.textContent = "";
  modalImage.innerHTML = "";

  axios.get(INDEX_URL + id).then((res) => {
    const data = res.data.results;
    modalTitle.textContent = data.title;
    modalDate.textContent = "Release date: " + data.release_date;
    modalDescription.textContent = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster" class="image-fluid">`;
  });
}
function addToFavorite(id) {
  const list = favoriteMovies;
  const movie = movies.find((movie) => movie.id === id);
  const tipWrap = document.querySelector("#tip-wrap");
  let alertElement = document.createElement("div");
  alertElement.innerHTML = `    <div class="tip-item">
      <div class="alert alert-success fade show text-center" role="alert">
        <h5 class="my-0">已加入最愛清單</h5>
      </div>
    </div>`;
  tipWrap.innerHTML = "";
  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已在收藏清單中！");
  }

  list.push(movie);
  favoriteMovies = list;
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
  renderMovieList(getMovieByPage(currentPage));
  tipWrap.append(alertElement);
}
function removeFromFavorite(id) {
  const movieIndex = favoriteMovies.findIndex((movie) => movie.id === id);
  const tipWrap = document.querySelector("#tip-wrap");
  let alertElement = document.createElement("div");
  alertElement.innerHTML = `    <div class="tip-item">
      <div class="alert alert-danger fade show text-center" role="alert">
        <h5 class="my-0">已從最愛清單中移除</h5>
      </div>
    </div>`;
  tipWrap.innerHTML = "";
  favoriteMovies.splice(movieIndex, 1);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  renderMovieList(getMovieByPage(currentPage));
  if (favoriteMovies.length === 0 && dataPanel.dataset.list === "favorite")
    displayAlert("您還沒有收藏任何一部電影，快去收藏吧！");
  tipWrap.append(alertElement);
}
function getMovieByPage(page) {
  const data = getRenderData();
  const startIndex = (page - 1) * MOVIE_PER_PAGE;
  const endIndex = startIndex + MOVIE_PER_PAGE;

  return data.slice(startIndex, endIndex);
}
function getRenderData() {
  const data =
    dataPanel.dataset.list === "favorite"
      ? favoriteMovies
      : filterMovies.length
      ? filterMovies
      : movies;
  return data;
}
function displayAlert(content) {
  const inputAlert = document.querySelector("#input-alert");
  inputAlert.children[0].textContent = content;
  inputAlert.style.display = "block";
}
function removeAlert() {
  const inputAlert = document.querySelector("#input-alert");
  inputAlert.style.display = "none";
}

// Event listener
// Movie List
dataPanel.addEventListener("click", function onPanelClicked(e) {
  const id = Number(e.target.dataset.id);
  if (e.target.matches(".btn-show-movie")) {
    showMovieModal(id);
  } else if (e.target.matches(".btn-add-favorite")) {
    e.target.classList.remove("btn-info", "btn-add-favorite");
    e.target.classList.add("btn-danger", "btn-remove-favorite");
    e.target.textContent = "x";
    addToFavorite(id);
  } else if (e.target.matches(".btn-remove-favorite")) {
    e.target.classList.add("btn-info", "btn-add-favorite");
    e.target.classList.remove("btn-danger", "btn-remove-favorite");
    e.target.textContent = "+";
    removeFromFavorite(id);
  }
});

// 檢視模式
mainDiv.addEventListener("click", function onViewItemClicked(e) {
  if (e.target.tagName !== "I") return;
  const viewItem = document.querySelector("#view-item");
  const navLink = e.target.parentElement;
  const cardLink = viewItem.children[0].children[0];
  const listLink = viewItem.children[1].children[0];

  navLink.classList.add("active");
  // 判斷是哪個按鈕，把另一個的 active 移除
  navLink === cardLink
    ? listLink.classList.remove("active")
    : cardLink.classList.remove("active");
  dataPanel.dataset.viewType = e.target.dataset.type;
  renderMovieList(getMovieByPage(currentPage));
});

// 分頁
paginator.addEventListener("click", function onPaginatorClicked(e) {
  if (e.target.tagName !== "A" || Number(e.target.dataset.page) === currentPage)
    return;
  currentPage = Number(e.target.dataset.page);
  renderMovieList(getMovieByPage(currentPage));
  renderPaginator(filterMovies.length ? filterMovies.length : movies.length);
});

// 搜尋功能
mainDiv.addEventListener("submit", function onMainDivSubmitted(e) {
  e.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const keyword = searchInput.value.trim().toLowerCase();
  if (keyword === "") {
    renderMovieList(movies);
  } else if (!keyword.length) {
    return alert("請輸入有效字串！");
  }
  filterMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  if (filterMovies.length === 0) {
    alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`);
  }
  currentPage = 1;
  renderMainDiv();
});
mainDiv.addEventListener("keyup", function onMainDivSubmitted(e) {
  removeAlert();
  const searchInput = document.querySelector("#search-input");
  const keyword = searchInput.value.trim().toLowerCase();
  filterMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  if (filterMovies.length === 0) {
    displayAlert("您輸入的關鍵字沒有符合條件的電影");
  }
  currentPage = 1;
  renderMainDiv();
});

// 切換到最愛
navBar.addEventListener("click", function onNavBarClicked(e) {
  if (e.target.tagName !== "A" || !e.target.classList.contains("nav-link"))
    return;
  removeAlert();
  // 取 #nav-bar 的連結內文
  const linkTarget = e.target.innerText.split("\n")[0].toLowerCase();
  const searchForm = document.querySelector("#search-form");
  const navItem = e.target.parentElement;
  const navItems = [...navItem.parentElement.children];
  navItems.forEach((item) => {
    item.classList.remove("active");
  });
  switch (linkTarget) {
    case "home":
      dataPanel.dataset.list = "all";
      searchForm.style.visibility = "visible";
      break;
    case "favorite":
      dataPanel.dataset.list = "favorite";
      searchForm.style.visibility = "hidden";
      if (favoriteMovies.length === 0)
        displayAlert("您還沒有收藏任何一部電影，快去收藏吧！");
      break;
    default:
      dataPanel.dataset.list = linkTarget;
  }
  navItem.classList.add("active");
  currentPage = 1;
  renderMainDiv();
});

// axios
axios
  .get(INDEX_URL)
  .then((res) => {
    movies.push(...res.data.results);
    renderMainDiv();
  })
  .catch((err) => console.log(err));
