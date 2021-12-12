//將API URL拆分成變數，並在js文件開頭宣告，增加易讀性
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movies = [] //設定一個container，來存放response的資料

//指向卡片式node
const dataPanel = document.querySelector('#data-panel')

//search
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')//指向input文字
const changeLayout = document.querySelector('#change-layout')
let filteredMovies = []//設置一個裝篩選後資訊的array

//監聽表單提交事件
 searchForm.addEventListener('submit', function onSearchFormSubmitted(event)  {
    event.preventDefault()//預防按下後網頁更新
    const keyword = searchInput.value.trim().toLowerCase()//將value去掉空白跟變成小寫

  filteredMovies = movies.filter((movies)=>
    movies.title.toLowerCase().includes(keyword)
    )
    if (filteredMovies.length === 0) {
        return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
      }
    renderMovieList(getMoviesByPage(1))
    renderPaginator(filteredMovies.length)
})

//宣告func-1 （連帶 data-id call進來）
function renderMovieList1(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${
          POSTER_URL + item.image
        }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

//宣告func-1.1（list
function renderMovieList2(data){
    let rawHTML = '<ul class="list-group list-group-flush">'
    data.forEach((item)=>{
        rawHTML +=`<li class="list-group-item justify-content-between align-items-start d-flex">${item.title}<div>
        <button class="btn btn-primary btn-show-movie " data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
        <button class="btn btn-info btn-add-favorite " data-id="${item.id}">+</button></div></li>`
    })
    rawHTML +=`</ul>`
    dataPanel.innerHTML = rawHTML
}

function renderMovieList(data){
    renderMovieList1(data)
}

//request API：將 response 執行func-1
axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(1)) //新增這裡
  })
  .catch((err) => console.log(err))

  //改變api
  changeLayout.addEventListener('click',function w(event){
    if(event.target.matches('.card-layout')){
        renderMovieList1(getMoviesByPage(pageContainer))
        
    }else if(event.target.matches('.list-layout')){
        renderMovieList2(getMoviesByPage(pageContainer))
    }
})

  //宣告func-2：model資訊的編排規則
function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')
    axios.get(INDEX_URL + id).then((response) => {
      const data = response.data.results
      modalTitle.innerText = data.title
      modalDate.innerText = 'Release date: ' + data.release_date
      modalDescription.innerText = data.description
      modalImage.innerHTML = `<img src="${
        POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
    })
  }

//宣告event：點擊執行func-2
dataPanel.addEventListener('click',function onPanelClicked(event){
    if (event.target.matches('.btn-show-movie')) {
        //透過dataset.來呼叫data開頭的描述
        showMovieModal(event.target.dataset.id)
    }
    if(event.target.matches('.btn-add-favorite')){
        addToFavorite(Number(event.target.dataset.id))
    }

  })
  function addToFavorite(id){
        const list = JSON.parse(localStorage.getItem('favoriteMovies'))||[]//取出轉回js物件，從favorite，取得key為favoritemovies的value 或是創建空矩陣，
        //為了避免每次進來都重置成[]，前面改用JSON..取得已經加到暫存的
        const movie = movies.find((movie) => movie.id === id)//存到最愛的物件
        if (list.some((movie) => movie.id === id)) {//some回傳bulean
          return alert('此電影已經在收藏清單中！')
        }
        list.push(movie)//丟入資料
        localStorage.setItem('favoriteMovies', JSON.stringify(list))//丟入暫存
    }
  
    //pagination
    const MOVIES_PER_PAGE = 12
    function getMoviesByPage(page) {
        //計算起始 index 
        const startIndex = (page - 1) * MOVIES_PER_PAGE
        //回傳切割後的新陣列
        return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE)
      }
    
    //計算總頁數
    function renderPaginator(amount) {
        //計算總頁數
        const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
        //製作 template 
        let rawHTML = ''
        
        for (let page = 1; page <= numberOfPages; page++) {
          rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
        }
        //放回 HTML
        paginator.innerHTML = rawHTML
      }


      let pageContainer ="1"
      //掛pagination監聽器
      paginator.addEventListener('click', function onPaginatorClicked(event) {
        //如果被點擊的不是 a 標籤，結束
        if (event.target.tagName !== 'A') return
        
        //透過 dataset 取得被點擊的頁數
        const page = Number(event.target.dataset.page)
        pageContainer = Number(event.target.dataset.page)
        console.log(pageContainer)
        //更新畫面
        if(dataPanel.firstChild.classList[0]===`list-group`){
            renderMovieList2(getMoviesByPage(page))
        }else{
        renderMovieList1(getMoviesByPage(page))}
      })
      
      

      //搜尋結果也要分頁
      function getMoviesByPage(page) {
        //新增這裡
        const data = filteredMovies.length ? filteredMovies : movies
        const startIndex = (page - 1) * MOVIES_PER_PAGE
        //修改這裡
        return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
      }