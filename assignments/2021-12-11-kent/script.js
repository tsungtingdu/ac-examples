// 設置變數
const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const dataPanel = document.querySelector("#data-panel")
const fanData = []

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
let filterdSearchedFans = []
const FANS_PER_PAGE = 18
const paginator = document.querySelector('#paginator')


// 渲染fans資料於畫面
function showFanList(data) {
  let rawHTML = ""

  data.forEach(function (item) {
    rawHTML += `
    <div class="col-sm-2">
      <div class="mb-2 mx-2">
        <div class="card border-warning">
          <img
              src="${item.avatar}"
              class="card-img-top" alt="fan avatar">
          <div class="card-body">
            <h3 class="card-title text-center">${item.name}</h3>
          </div>
          <div class="card-footer text-center">
            <button class="btn btn-show-fan-data" data-bs-toggle="modal"
                data-bs-target="#show-user-data" data-id="${item.id}" style=" background-color: #552084; color: #fdba21; ">More</button>
            <button class="btn btn-dark btn-add-to-vip" data-id="${item.id}" style="border-radius:50%;">+</button>
          </div>
        </div>
      </div>
    </div>

    `
  })

  dataPanel.innerHTML = rawHTML
}



// 分頁功能
// 得到不同頁數的資料
function getFansByPage(page) {
  const data = filterdSearchedFans.length? filterdSearchedFans:fanData
  const startIndex = (page-1) * FANS_PER_PAGE
  return data.slice(startIndex, startIndex + FANS_PER_PAGE)
}

// 依照資料數量產生分頁器
function pagination(dataLength) {
  const pages = Math.ceil(dataLength / FANS_PER_PAGE)
  let rawHTML = ''

  for ( let page = 1; page <= pages; page++ ) {
    rawHTML += `
    <li class="page-item"><a class="page-link fw-bolder" style="color:#fdb827; " href="#">${page}</a></li> `
  }

  paginator.innerHTML = rawHTML

}

// 頁面轉換
paginator.addEventListener('click', changePage)

function changePage(event) {
  const target = Number(event.target.innerText)
  showFanList(getFansByPage(target))
}



// 取得INDEX(每位使用者的資料顯示於畫面)
axios
  .get(INDEX_URL)
  .then((response) => {
    const resultsArr = response.data.results
    fanData.push(...resultsArr)
    showFanList(getFansByPage(1))
    pagination(fanData.length)
  })
  .catch((err) => console.log(err))


//VIP 判斷 [尚未完成的功能]
// fanData.forEach(fan => {
//   const vipListArr = JSON.parse(localStorage.getItem('vipFansList')) || []
//   const cardBody = document.querySelector('#card-body')

//   if ( vipListArr.some( Vip => Vip === fan) ) {
//     isVip.innerHTML = `
//       <span class="card-title">${fan.name}</span>
//       <mark id="isVip">VIP</mark>`
//   }
// })



// 顯示fan的詳細資料
function showMedalData(data) {
  // 將會使用到的節點先存取為變數
  const fanName = document.querySelector("#user-name-and-surname")
  const fanMedalAvatar = document.querySelector("#user-medal-avatar")
  const fanAge = document.querySelector("#user-age")
  const fanGender = document.querySelector("#user-gender")
  const fanRegion = document.querySelector("#user-region")
  const fanEmail = document.querySelector("#user-email")

  // 取得Show API的資料
  axios
    .get(INDEX_URL + data)
    .then((response) => {
      const data = response.data

      fanName.innerText = data.name + " " + data.surname
      fanAge.innerText = data.age
      fanGender.innerText = data.gender
      fanRegion.innerText = data.region
      fanEmail.innerText = data.email
      fanMedalAvatar.innerHTML = `<img src="${data.avatar}" alt="user-medal-avatar">`
    })
    .catch((err) => console.log(err))
}



// 收藏功能
// 將fan加入VIP LIST
function addToVIP(newVipId) {
  const vipList = JSON.parse(localStorage.getItem('vipFansList')) || []
  const newVipFan = fanData.find(fan => fan.id === newVipId)
  
  if ( vipList.some(fan => fan.id === newVipId)) {
    return alert('The fan has been already added in VIP List!')
  }

  vipList.push(newVipFan)
  localStorage.setItem('vipFansList', JSON.stringify(vipList))
}


// showMedal or addToVIP事件
dataPanel.addEventListener("click", function (event) {
  const target = event.target
  if (target.matches(".btn-show-fan-data")) {
    showMedalData(target.dataset.id)
  } else if ( target.matches(".btn-add-to-vip") ) {
    addToVIP(parseInt(target.dataset.id))
  } 
})


// Search事件
searchForm.addEventListener('submit', onSearchFormSubmitted)

function onSearchFormSubmitted(event) {
  event.preventDefault()

  const seachedName = searchInput.value.trim().toLowerCase()
  filterdSearchedFans = fanData.filter(
    fan => fan.name.toLowerCase().includes(seachedName)
  )

  if ( filterdSearchedFans.length === 0 ) {
    alert(`No result has been found with '${seachedName}'`)
  }

  showFanList(getFansByPage(1))
  pagination(filterdSearchedFans.length)
}




