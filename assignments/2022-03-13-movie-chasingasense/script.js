const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIES_PER_PAGE = 12;
let currentPage = 1;

const movies = [];
let filteredMovies = [];

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const changeMode = document.querySelector("#change-mode");

//在渲染電影清單的函式中用if else寫兩種模式的模板
function renderMovieList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    if (dataPanel.dataset.mode === "card-mode") {
      rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img src="${
              POSTER_URL + item.image
            }" class="card-img-top" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${
                item.id
              }">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
      dataPanel.innerHTML = rawHTML;
    } else if (dataPanel.dataset.mode === "list-mode") {
      let rawHTML = `<ul class="list-group col-sm-12 mb-2">`;
      data.forEach((item) => {
        rawHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <h5 class="card-title">${item.title}</h5>
        <div>
            <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                data-bs-target="#movie-modal" data-id="${item.id}">More</button>
           <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
      </li>`;
      });
      rawHTML += "</ul>";
      dataPanel.innerHTML = rawHTML;
    }
  });
}

//分頁
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += ` <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }

  paginator.innerHTML = rawHTML;
}

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies;

  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

//MovieModal
function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;

    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src = "${POSTER_URL + data.image}"
    alt = "movie-poster" class="img-fluid" >`;
  });
}

//收藏
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已在收藏清單中!");
  }

  list.push(movie);
  console.log(list);

  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(event.target.dataset.id);
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

//分頁
paginator.addEventListener("click", function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return;
  const page = Number(event.target.dataset.page);
  renderMovieList(getMoviesByPage(page));
});

//search
searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();

  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  if (filteredMovies.length === 0) {
    return alert("Cannot find movies with keyword:" + keyword);
  }

  renderPaginator(filteredMovies.length);
  renderMovieList(getMoviesByPage(1));
});

//監聽-切換模式
changeMode.addEventListener("click", function onChangeModeClicked(event) {
  if (event.target.matches("#card-mode-button")) {
    dataPanel.dataset.mode = "card-mode";
    renderMovieList(getMoviesByPage(currentPage));
  } else if (event.target.matches("#list-mode-button")) {
    dataPanel.dataset.mode = "list-mode";
    renderMovieList(getMoviesByPage(currentPage));
  }
});

// function changeDisplayMode(displayMode) {
//   if (dataPanel.dataset.mode === displayMode) return;
//   dataPanel.dataset.mode = displayMode;
// }

// changeMode.addEventListener("click", function onChangeModeClicked(event) {
//   if (event.target.matches("#card-mode-button")) {
//     changeDisplayMode("card-mode");
//     renderMovieList(getMoviesByPage(currentPage));
//   } else if (event.target.matches("#list-mode-button")) {
//     changeDisplayMode("list-mode");
//     renderMovieList(getMoviesByPage(currentPage));
//   }
// });

axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results);
  renderPaginator(movies.length);
  renderMovieList(getMoviesByPage(1));
});