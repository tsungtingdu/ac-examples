const BASE_URL = "https://movie-list.alphacamp.io/";
const INDEX_URL = BASE_URL + "api/v1/movies/";
const IMAGE_URL = BASE_URL + "posters/";
const MOVIES_PER_PAGE = 12;

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");

const movies = [];
let filteredMovies = [];
let page = 1;

// 將參數給予的陣列物件，依照所需呈現的網頁內容顯示出來
// renderMovieList() 用來顯示列表的版面
function renderMovieList(data) {
  let rawHTML = `<ul class="list-group">`;
  data.forEach((item) => {
    rawHTML += `
       <li class="list-group-item">
          <div class="row">
            <div class="col-8 align-self-center">${item.title}</div>
            <div class="col-4">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
           </div>
         </div>
       </li>
     `;
  });
  rawHTML += "</ul>";
  dataPanel.innerHTML = rawHTML;
}

// 用以顯示原本的卡片列表
function renderMovieCard(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
      <div class = "col-3 d-flex my-2">
         <div class="card">
           <img src="${
             IMAGE_URL + item.image
           }" class="card-img-top" alt="Movie Poster">
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

// 給予指定頁數，先判斷在搜尋或瀏覽完整頁面的狀況，再回傳切割該頁數應呈現的內容
function getMovieByPages(page) {
  const data = filteredMovies.length ? filteredMovies : movies;
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

// 傳入物件總數，由每頁最大限制數量去計算需要頁數，並且渲染出該呈現的頁數
// 進階：因渲染後固定呈現第一頁，因此讓第一頁的形式為點擊後的頁面
function renderPaginator(amount) {
  const pagesOfMovies = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = `<li class="page-item active" aria-current="page"><span class="page-link" data-page="1">1</span>`;
  for (let page = 2; page <= pagesOfMovies; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }
  paginator.innerHTML = rawHTML;
}

// 給予特定的 id ，向伺服器 API 要求指定資料內容，並渲染在 Madol 的指定區域
function showMovieMadol(id) {
  const movieTitle = document.querySelector("#movie-modal-title");
  const movieImage = document.querySelector("#movie-modal-image");
  const movieDate = document.querySelector("#movie-modal-date");
  const movieDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    movieTitle.innerText = data.title;
    movieDate.innerText = "release date: " + data.release_date;
    movieDescription.innerText = data.description;
    movieImage.innerHTML = `<img src="${
      IMAGE_URL + data.image
    }" alt="movie-poster" id="image-fluid">`;
  });
}

// 先判斷 localStorage 是否有內容，有就先轉換先前的內容，無則新增陣列，將傳入的 id 找到對應的電影資料，加入清單內，並且儲存在 localStorage 之內
// 有出現過加入 null 的狀況，為了避免錯誤，於是多設定一個避免 movie 為空
// showFavorite([movie]) 把剛加入書籤的電影旁，馬上加上記號
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) return alert("Already in list!");

  if (movie) {
    list.push(movie);
    localStorage.setItem("favoriteMovies", JSON.stringify(list));

    showFavorite([movie]);
  }
}

// 從 favoriteMovies 讀取清單，並且和畫面上出現的電影一一比對，最後有在清單內且呈現在螢幕上的加在 + 按鈕之後
function showFavorite(onPanelMovies) {
  const favList = JSON.parse(localStorage.getItem("favoriteMovies"));
  if (!favList) return;

  onPanelMovies.forEach((moive) => {
    const favIndex = favList.findIndex((fav) => fav.id === moive.id);
    if (favIndex === -1) return;

    const heart = document.createElement("i");
    heart.setAttribute("class", "fa-solid fa-heart fa-lg turn-red");

    const elementPapaOfHeart = document.querySelectorAll(
      `[data-id='${moive.id}']`
    )[1].parentElement;
    elementPapaOfHeart.append(heart);
    favList.splice(favIndex, 1);
  });
}

// 用以控制呈現的清單形式，由於在渲染列表後都需要加上最愛的呈現，所以一並執行
// 用 .actived-mod 控制渲染內容，並且相應的按鈕也會有改變
function renderPanelAndFavo(data) {
  const activedForm = document.querySelector(".actived-mod");
  if (activedForm.id === "list-display") renderMovieList(data);
  if (activedForm.id === "card-display") renderMovieCard(data);
  showFavorite(data);
}

// 由於有數個地方需要重複做移除和重新上 .active 類型的，所以寫一個專用的函式運作
// 將讀取進來的目標和需要更換的 class 名稱，找到舊的改掉，並且直接幫現在的目標加上 class
function removeAndAddClass(target, tagName) {
  const lastTarget =
    document.querySelector(`.${tagName}`) ||
    document.querySelector(`#${tagName}`);
  if (lastTarget) lastTarget.classList.remove(`${tagName}`);

  if (typeof target === "string") {
    const targetNode =
      document.querySelector(`#${target}`) ||
      document.querySelector(`.${target}`);
    targetNode.classList.add(`${tagName}`);
    return {
      beforeNode: lastTarget,
      afterNode: targetNode
    };
  }
  target.classList.add(`${tagName}`);
  return {
    beforeNode: lastTarget,
    afterNode: target
  };
}

// 從 INDEX_URL 要求資料，展開 results 之後，放入 movies 陣列
// 同時需要先設定卡片模式、渲染清單和最愛、分頁器
axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results);

  removeAndAddClass("card-display", "actived-mod");
  renderPanelAndFavo(getMovieByPages(1));
  renderPaginator(movies.length);
});

// 點在電影卡片上時，若點了 more 則跳出該電影資料的 Madol ，點了 + 則加入最愛
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie"))
    showMovieMadol(Number(event.target.dataset.id));
  if (event.target.matches(".btn-add-favorite"))
    addToFavorite(Number(event.target.dataset.id));
});

// submit 預設的動作是重新整理，所以該停止預設動作再繼續執行
// 讀取字串並將前後空白去除，小寫之後才和 movies 內容作比對
// 如果成功搜尋到資料，則重新渲染清單和分頁器
searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  if (!filteredMovies.length) return alert("Please enter a vaild keyword.");

  page = 1;
  renderPanelAndFavo(getMovieByPages(page));
  renderPaginator(filteredMovies.length);
});

// 點分頁之後，將該頁的內容重新渲染出來，包括清單和最愛
// 進階：由於需要讓使用者知道自己點擊的頁面，以及讓被點擊的頁面不會再次被點擊
// 因此也需要將點擊後的和上次點擊的分頁器更改內容
paginator.addEventListener("click", function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return;
  const activedPage = document.querySelector("#paginator .active");
  if (activedPage) {
    activedPage.removeAttribute("aria-current");
    const actPage = activedPage.children[0].dataset.page;
    activedPage.innerHTML = `<a class="page-link" href="#" data-page="${actPage}">${actPage}</a>`;
    activedPage.classList.remove("active");
  }

  const currentPage = event.target.parentElement;
  currentPage.classList.add("active");
  currentPage.setAttribute("aria-current", "page");

  page = Number(event.target.dataset.page);
  currentPage.innerHTML = `<span class="page-link" data-page="${page}">${page}</span>`;
  renderPanelAndFavo(getMovieByPages(page));
});

// 點擊圖示去切換電影清單如何呈現，會呼叫切換 .active 的 removeAndAddClass() ，以及讀取該頁籤的資料後重新渲染的頁面
searchForm.addEventListener("click", function onListIconClicked(event) {
  if (event.target.tagName !== "I" || event.target.matches(".actived-mod"))
    return;

  removeAndAddClass(event.target, "actived-mod");
  renderPanelAndFavo(getMovieByPages(page));
});

// 下面兩個就是控制滑鼠移動到切換圖示之後，滑鼠經過會旋轉，離開則停止
searchForm.addEventListener("mouseover", function (event) {
  if (event.target.tagName !== "I") return;
  event.target.classList.add("fa-spin");
});

searchForm.addEventListener("mouseout", function (event) {
  if (event.target.tagName !== "I") return;
  event.target.classList.remove("fa-spin");
});
