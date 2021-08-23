const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIE_PER_PAGE = 12;
const movies = [];
let filteredMovies = [];
const dataPanel = document.querySelector("#data-panel");

function renderMovieList(data) {
  let rawHTML = "";

  data.forEach((item) => {
    // title, image
    console.log(item);
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
  dataPanel.classList.add("row");
  dataPanel.innerHTML = rawHTML;
}

// change layout//

const listView = document.querySelector("#list-layout");
const inlineView = document.querySelector("#inline-layout");

function renderMovieToList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
    <hr>
        <div class="d-flex justify-content-between align-items-center" >
              <h5 class="card-title">${item.title}</h5>
            
            <div>
              <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                data-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
        </div>
    </hr>`;
  });
  dataPanel.classList.remove("row");
  dataPanel.innerHTML = rawHTML;
}
// pagination//
function getMoviesByPage(page) {
  const startIndex = (page - 1) * MOVIE_PER_PAGE;
  const data = filteredMovies.length ? filteredMovies : movies;
  return data.slice(startIndex, startIndex + MOVIE_PER_PAGE);
}

listView.addEventListener("click", function change(event) {
  renderMovieToList(getMoviesByPage(1));
});
inlineView.addEventListener("click", function change(event) {
  renderMovieList(getMoviesByPage(1));
});

// pagination//
function getMoviesByPage(page) {
  const startIndex = (page - 1) * MOVIE_PER_PAGE;
  const data = filteredMovies.length ? filteredMovies : movies;
  return data.slice(startIndex, startIndex + MOVIE_PER_PAGE);
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Released Date" + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster class="fluid">`;
  });
}
// favorite movie
function addToFavorite(id) {
  function isMovieIdMatched(movie) {
    return movie.id === id;
  }
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find(isMovieIdMatched);

  if (list.some(isMovieIdMatched)) {
    return alert("此電影已在收藏清單中！");
  }

  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id));
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

// Search form

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  console.log("click");
  const keyword = searchInput.value.trim().toLowerCase();

  if (!keyword.length) {
    return alert("請輸入有效字串！");
  }
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  renderMovieList(filteredMovies);
});

// Paginator

const paginator = document.querySelector("#paginator");
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIE_PER_PAGE);
  let rawHTML = "";
  for (let page = 1; page < numberOfPages; page++) {
    rawHTML += `
      <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `;
  }
  paginator.innerHTML = rawHTML;
}
paginator.addEventListener("click", function onPaginatorClick(event) {
  if (event.target.tagName !== "A") return;
  renderMovieList(getMoviesByPage(Number(event.target.dataset.page)));
});

axios.get(INDEX_URL).then((response) => {
  console.log(response.data.results);

  for (const movie of response.data.results) {
    movies.push(movie);
    console.log(movies);
  }

  movies.push(...response.data.results);
  console.log(movies);
  renderPaginator(movies.length);
  renderMovieList(getMoviesByPage(1));
});
