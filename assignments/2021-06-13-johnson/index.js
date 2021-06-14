const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIES_PER_PAGE = 12;

let currentPage = 1;
let viewMode = "grid";

const movies = [];
let filteredMovies = [];

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const switchView = document.querySelector("#switch-view");

function displayDataList() {
  movieList = getMoviesByPage(currentPage);
  viewMode === "grid" ? renderMovieList(movieList) : renderListView(movieList);
}

function renderListView(data) {
  let rawHTML = "";

  data.forEach((item) => {
    rawHTML += `
            <div class="col-md-12 border-bottom d-flex justify-content-between py-1 my-2">
              <h3 class="h4">${item.title}</h3>
              <div>
                <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                  data-target="#movie-modal" data-id="${item.id}">More</button>
                <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
              </div>
            </div>
        `;
  });

  dataPanel.innerHTML = rawHTML;
}

function renderMovieList(data) {
  let rawHTML = "";

  // processing
  // 需要item裡面的 item, image
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img class="card-img-top"
              src="${POSTER_URL + item.image}"
              alt="movie poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <div class="card-footer">
                <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                  data-target="#movie-modal" data-id="${item.id}">More</button>
                <button class="btn btn-info btn-add-favorite" data-id="${
                  item.id
                }">+</button>
              </div>
            </div>
          </div>
        </div>

      </div>`;
  });

  dataPanel.innerHTML = rawHTML;
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);

  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }

  paginator.innerHTML = rawHTML;
}

paginator.addEventListener("click", function onPageinatorClicked(event) {
  if (event.target.tagName !== "A") return;
  currentPage = Number(event.target.dataset.page);
  displayDataList();
});

function getMoviesByPage(page) {
  // 如果filteredmovies有長度，data = filtererdMovies，如果沒有data= movies
  const data = filteredMovies.length ? filteredMovies : movies;
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Released Date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster"
                class="img-fluid">
            </div>`;
  });
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中！");
  }

  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

switchView.addEventListener("click", function onListClicked(event) {
  if (event.target.matches("#listView")) {
    viewMode = "list";
  } else if (event.target.matches("#gridView")) {
    viewMode = "grid";
  }
  displayDataList();
});

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id));
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();

  // if (!keyword.length) {
  //   return alert('please enter a valid string!')
  // }

  // for (const movie of movies) {
  //   if (movie.title.toLowerCase().includes(keyword)) {
  //     filteredMovies.push(movie)
  //   }
  // }

  // map, filter, reduce 陣列操作三寶
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  if (filteredMovies.length === 0) {
    return alert("Cannot find movies with keyword: " + keyword);
  }

  renderPaginator(filteredMovies.length);
  displayDataList();
});

axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results);
  renderPaginator(movies.length);
  // renderMovieList(getMoviesByPage(1))
  displayDataList();
});
