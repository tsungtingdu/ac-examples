const Base_URL = 'https://lighthouse-user-api.herokuapp.com'
const Index_URL = Base_URL + '/api/v1/users/'
const Show_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/:id'

const dataPanel = document.querySelector('#data-Panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const pagination = document.querySelector('#pagination')


const friends = []
let filterFriends = []
const Friends_Per_Page = 18

// dataPanel click event
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.tagName === 'IMG') {
    showFriendModel(event.target.dataset.id)
  } else if (event.target.tagName === 'BUTTON') {
    addToFavorite(Number(event.target.dataset.id))
    console.log(event.target.dataset.id)
  }  
})

// searchBar click event
searchForm.addEventListener('submit', function onSearchFormClicked(event) {
  event.preventDefault()

  const keyword = searchInput.value.trim().toLowerCase()

  if (!keyword.length) {
    return alert('Please Enter your data')
  }

  filterFriends = friends.filter((friend) =>
    `${friend.name} ${friend.surname}`.toLowerCase().includes(keyword)
  ) 
  console.log(filterFriends) 

  randomFriendList(filterFriends)
})

// pagination click event
pagination.addEventListener('click', function onPaginationClicked(event){
if(event.target.tagName !== "A") return

let page = Number(event.target.dataset.page)
randomFriendList(getFriendPage(page))
})

function getFriendPage(page){
let startIndex= (page - 1) * Friends_Per_Page

return friends.slice(startIndex,startIndex + Friends_Per_Page)

}

function getPagePagintion(amount){
let rowHtml = ""
let pageNumber = Math.ceil(amount / Friends_Per_Page)

for(let page = 1; page <= pageNumber ; page++){
rowHtml +=
` <li class="page-item"><a class="page-link" href="#" data-page=${page}>${page}</a></li>`
}
pagination.innerHTML = rowHtml
}

function randomFriendList(data) {
  let htmlContent = ''

  data.forEach((item) => {
    htmlContent += `
    <div class="col-sm-2">
          <div class="mb-2">
            <div class="card">
              <img src="${item.avatar}"  class="card-img-top " style="cursor: pointer"  data-toggle="modal" data-target="#friend-modal" data-id="${item.id}" >
                <div class="card-body">
                  <div class="friend-name">${item.name}${item.surname}</div>
                </div>
                <div class="card-footer">
                  <button class="btn btn-favorite" id="btn-favorite" data-id=${item.id}> ☆ </button>
                </div>
            </div>
          </div>
    </div>
` 
  }) 

  dataPanel.innerHTML = htmlContent 
}

// function  favorite localStorage
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favorite')) || [] 
  const friend = friends.find((friend) => friend.id === id) 
  if (list.some((friend) => friend.id === id)) {
    return alert('已收藏您的好友！') 
  }
  list.push(friend) 
  localStorage.setItem('favorite', JSON.stringify(list)) 
}

// function can get API data and show into the Modal list
function showFriendModel(id) {
  const friendTitle = document.querySelector('#friend-modal-title') 
  const friendImage = document.querySelector('#friend-model-image') 
  const friendRegion = document.querySelector('#friend-model-region') 
  const friendId = document.querySelector('#friend-model-id') 
  const friendBirthday = document.querySelector('#friend-model-birthday') 
  const friendGender = document.querySelector('#friend-model-gender') 
  const friendEmail = document.querySelector('#friend-model-email') 

  axios.get(Index_URL + id).then((response) => {
    const result = response.data 
    friendImage.innerHTML = `
      <img src=${result.avatar}></div>
      ` 
    friendTitle.innerText = result.name 
    friendRegion.innerText = 'Region:  ' + result.region 
    friendId.innerText = 'ID number:  ' + result.id 
    friendBirthday.innerText = 'Birthday:  ' + result.birthday 
    friendGender.innerText = 'Gender:  ' + result.gender 
    friendEmail.innerText = 'Email:  ' + result.email 
  }) 
}

axios.get(Index_URL).then((response) => {
  friends.push(...response.data.results) 
  getPagePagintion(friends.length)
  randomFriendList(getFriendPage(1)) 
}) 
