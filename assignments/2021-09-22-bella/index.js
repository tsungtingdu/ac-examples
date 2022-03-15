const BASE_URL = "https://movie-list.alphacamp.io/"
const INDEX_URL = BASE_URL + "api/v1/movies/"
const POSTER_URL = BASE_URL + "/posters/"
const MOVIES_PER_PAGE = 12

const movies = [];
let filteredMovies = [];
const dataPanel = document.querySelector('#data-panel');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const paginator = document.querySelector('#paginator');
const viewMode = document.querySelector('#view-mode');
let currentPage = 1;
// Set the default value in the initial view
let defaultView = 'card';
// Switch between 'card' and 'list' modes
function renderMovieList(data, view){
    if (view === 'card'){
        rawHTML = ``
        data.forEach(item => {
            rawHTML += `
            <div class="col-sm-3" id="movie-modal">
                <div class="mb-2">
                    <div class="card">
                        <img src="${POSTER_URL+item.image}"
                            class="card-img-top" alt="Movie Poster">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movieModal" data-id="${item.id}">
                                More
                            </button>
                            <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            </div>`
        });
    }else{
        rawHTML = `<ul class="list-group mb-4 w-100">`;
        data.forEach(item => {
            rawHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <h6>${item.title}</h6>
                <div>
                <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movieModal" data-id="${item.id}">
                    More
                </button>
                <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
                </div>
            </li>
            `
        })
        rawHTML += `</ul>`;
    }
    dataPanel.innerHTML = rawHTML;
}

function renderPaginator(amount){
    const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
    rawHTML = ``;
    for(let page = 1; page <= numberOfPages; page ++){
        rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
    }
    paginator.innerHTML = rawHTML;
}

function getMoviesByPage(page){
    // If the length of 'filteredMovies' is not 0, define 'data' as 'filteredMovies'; otherwise, define 'data' as 'movies'.
    const data = filteredMovies.length ? filteredMovies : movies
    const startIndex = (page - 1) * MOVIES_PER_PAGE;
    return data.slice(startIndex, startIndex+MOVIES_PER_PAGE);
}

function showMovieModal(id){
    const modalTitle = document.querySelector("#movie-modal-title");
    const modalImage = document.querySelector("#movie-modal-image");
    const modalDate = document.querySelector("#movie-modal-date");
    const modalDescriptione = document.querySelector("#movie-modal-description");
    axios.get(INDEX_URL+id).then(response => {
        const data = response.data.results;
        modalTitle.innerText = data.title;
        modalDate.innerText = 'Realease date: '+data.release_date;
        modalDescriptione.innerText = data.description;
        modalImage.innerHTML = `<img src="${POSTER_URL+data.image}" class="card-img-top" alt="Movie Poster">`
    })
}

function addToFavorite(id){
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const movie = movies.find((movie) => movie.id === id);
    if(list.some((movie) => movie.id === id)){
        return alert('This movie has been collected!');
    }
    list.push(movie);
    // console.log(list)
    localStorage.setItem('favoriteMovies',JSON.stringify(list));
}

dataPanel.addEventListener("click", function onPanelClicked(event){
    if(event.target.matches('.btn-show-movie')){
        showMovieModal(Number(event.target.dataset.id));
    }else if(event.target.matches('.btn-add-favorite')){
        addToFavorite(Number(event.target.dataset.id));
    }
})

paginator.addEventListener("click", function onPaginatorClicked(event){
    if (event.target.tagName !== 'A') return;
    const page = Number(event.target.dataset.page);
    currentPage = page;
    renderMovieList(getMoviesByPage(currentPage))
})

searchForm.addEventListener("submit", function onSearchFormSubmitted(event){
    event.preventDefault();
    const keyword = searchInput.value.trim().toLowerCase();
    
    filteredMovies = movies.filter((movie)=>
        movie.title.toLowerCase().includes(keyword)
    )
    if (filteredMovies.length === 0){
        return alert('Cannot find movie with keyword: '+keyword);
    }
    renderPaginator(filteredMovies.length);
    renderMovieList(getMoviesByPage(1));
})

viewMode.addEventListener("click", function onViewModeClicked(event){
    viewSwitch = event.target.dataset.mode;
    if(event.target.tagName === 'I'){
        renderMovieList(getMoviesByPage(currentPage),viewSwitch)
    }
})

axios.get(INDEX_URL).then((response)=>{
    movies.push(...response.data.results);
    renderPaginator(movies.length);
    renderMovieList(getMoviesByPage(1),defaultView);
})
