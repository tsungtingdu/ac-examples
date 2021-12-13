const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIES_PER_PAGE = 16;

const movies = [];
let filteredMovies = [];

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const viewMode = document.querySelector("#view-mode");
let currentPage = 1;
let mode = "Card";

function renderMovieCard(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                data-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${
                item.id
              }">+</button>
            </div>
          </div>
        </div>
      </div>`;
  });
  dataPanel.innerHTML = rawHTML;
}
function renderMovieList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
      <div class="list-body col-8 mb-5 border-bottom">
        <h5 class="list-title">${item.title}</h5>
      </div>
      <div class="list-footer col-4 mb-5 border-bottom " >
          <button class="btn btn-primary btn-show-movie mr-5" data-toggle="modal"
            data-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
      </div>`;
  });
  dataPanel.innerHTML = rawHTML;
}
function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalImage.innerHTML = `
       <img src="${
         POSTER_URL + data.image
       }" alt="movie-poster" class="img-fluid">`;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
  });
}
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);
  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中！");
  }
  list.push(movie);
  alert("已加入清單");
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }

  paginator.innerHTML = rawHTML;
}
function getMoviesByPage(page) {
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const data = filteredMovies.length > 0 ? filteredMovies : movies;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(event.target.dataset.id);
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`);
  }
  renderPaginator(filteredMovies.length);
  renderMovieCard(getMoviesByPage(1));
});

viewMode.addEventListener("click", function onChangeModeButton(event) {
  const target = event.target;
  if (target.matches(".turn-list")) {
    mode = "List";
    renderMovieList(getMoviesByPage(currentPage));
  } else if (target.matches(".turn-card")) {
    mode = "Card";
    renderMovieCard(getMoviesByPage(currentPage));
  }
});

paginator.addEventListener("click", function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return;
  currentPage = Number(event.target.dataset.page);

  if (mode === "Card") {
    renderMovieCard(getMoviesByPage(currentPage));
  } else if (mode === "List") {
    renderMovieList(getMoviesByPage(currentPage));
  }
});

axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results);
    renderPaginator(movies.length);
    renderMovieCard(getMoviesByPage(1));
  })
  .catch((err) => console.log(err));
