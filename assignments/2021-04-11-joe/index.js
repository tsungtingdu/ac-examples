const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/"; // 200 users

const FIRST_USER_ID = 601
const NUM_TEAM = 17
const NUM_MEMBER = 12
const PLAYERS_PER_PAGE = 5

const PAGE_START = 1 // 分頁最小值
const PAGE_END = 3 // 分頁最大值

let nowPage = []; // array 存放每一隊目前瀏覽第幾頁
let memberContainerPanel = [] // 各隊成員背後白色透明圖片的 container panel

const users = []; // store users as an array
const favoriteUsers = JSON.parse(
  localStorage.getItem('favoriteUsers')
) || []

const blackHeartList = [] // 被加入過最愛的 user，其 blackHeartList[i] === 1
let afterSearch = false;
let filteredUsers = []; // 被搜尋的 users
let numPlayersToRender = 0; // 尚未被 render 出來的 users 數量

let playersOfTeam = Array(NUM_TEAM).fill().map(() => Array(NUM_MEMBER));
let numPlayers = []
for (let i = 0; i < NUM_TEAM; i++) {
  numPlayers.splice(i, 1, 0)
}
// numPlayers[i] = 第 i 隊被搜尋到人數
// playersOfTeam[i] = 第 i 隊被搜尋到的 players 組成的 array

const body = document.body;
const dataPanel = document.querySelector("#data-panel");

const modal = document.querySelector('.diy-modal')
const modalBackgroud = document.querySelector('.diy-modal-background')
const modalImage = document.querySelector("#box-img");
const modalName = document.querySelector("#box-name");
const picEmail = document.querySelector('#email-icon')
const textEmail = document.querySelector('#email-text')
const picGender = document.querySelector('#gender-icon')
const textGender = document.querySelector('#gender-text')
const picAge = document.querySelector('#age-icon')
const textAge = document.querySelector('#age-text')
const picRegion = document.querySelector('#region-icon')
const textRegion = document.querySelector('#region-text')
const picBirthday = document.querySelector('#birthday-icon')
const textBirthday = document.querySelector('#birthday-text')
const closeBtn = document.querySelector('.close-button')

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

axios
  .get(INDEX_URL)

  .then((response) => {
    // get all users from API and push all users into users[]
    users.push(...response.data.results);

    for (let i = 0; i < users.length; i++) {
      const result = favoriteUsers.find(element => isIdMatched(element, users[i].id))
      if (result) { // 有找到，回傳之前已經被加入過最愛的 user 給 result，初始化 render 實心 heart
        blackHeartList.push(1)
      } else { // undefined，初始化 render 空心 heart
        blackHeartList.push(0)
      }
    }

    divideTeam(users, NUM_MEMBER) // 把全部 users 分隊

    for (let i = 0; i < NUM_TEAM; i++) {
      renderTeam(i, users, users.length)
      nowPage.push(1) // 初始化每隊一開始都在第一頁
    }
  })
  .catch((err) => console.log(err));

function renderTeam(
  i, // 目前 render 第幾隊
  players, // 要 render 的 players array
  length) { // length of players array

  const team = document.createElement('div') // 此 element 裝背景
  team.setAttribute('data-team', i)
  team.className = 'team'
  team.style.backgroundColor = teams[i].backgroundColor
  team.style.backgroundImage = "url('" + teams[i].backgroundImg + "')"
  team.style.backgroundRepeat = "no-repeat"
  team.style.backgroundSize = "contain"

  const whiteDiv = document.createElement('div') // create white picture behind players
  whiteDiv.id = `member-container-${i}`
  whiteDiv.className = 'member-container'
  team.appendChild(whiteDiv)

  const teamName = document.createElement('div') // show team name
  teamName.className = 'team-name'
  teamName.textContent = teams[i].name
  team.appendChild(teamName)

  dataPanel.appendChild(team)

  memberContainerPanel[i] = document.querySelector(`#member-container-${i}`)

  if (numPlayersToRender > 0) {
    // 針對有搜尋成功的 render
    renderMember(
      getPlayersByPage(1, 0, players, length, i),
      memberContainerPanel[i] // 目前render到第幾隊的 panel
    )
  } else { // numPlayersToRender === 0
    // 普通的 render
    renderMember(
      getPlayersByPage(1, i * NUM_MEMBER, players, length, i),
      memberContainerPanel[i] // 目前render到第幾隊的 panel
    )
  }

  const page = document.createElement('div')
  page.className = 'page-container'
  page.id = `paginator-${i}`
  renderTeamPaginator(1, page, i)
  team.appendChild(page)
}

function renderTeamPaginator(nowPage, panel, team) {
  let rawHTML = ''
  rawHTML += `
    <div class="page-element" id="previous-page" data-team="${team}"><</div>
    <div class="page-element" id="now-page" data-team="${team}">${nowPage}</div>
    <div class="page-element" id="next-page" data-team="${team}">></div>
  `
  panel.innerHTML = rawHTML
}

function renderMember(players, panel) {
  let rawHTML = "";
  players.forEach(player => {
    rawHTML += `
      <div class="member">

        <img src="${player.avatar}" class="card-img-top" alt="photo" 
          data-id="${player.id}"
          style="border-radius: 50%"
        >

        <div class="card-body player-name ">
          <p class="card-text">${player.name}</p>
        </div>
      `

    const id = player.id - FIRST_USER_ID

    if (blackHeartList[id] === 1) {
      rawHTML += `
      <div class="card-body pt-0 heart-container">
          <img class="heart" src="./pic/solid_black_heart-removebg-preview.png" data-heart="${player.id}">
        </div>
      </div>
      `
    } else {
      rawHTML += `
      <div class="card-body pt-0 heart-container">
          <img class="heart" src="./pic/empty black heart.png" data-heart="${player.id}">
        </div>
      </div>
      `
    }
    if (numPlayersToRender > 0) {
      numPlayersToRender--;
    }

  })

  panel.innerHTML = rawHTML
}

function divideTeam(players, numMember) {
  let team = 0;
  let playerIndex = 0;

  for (let i = 0; i < players.length; i++) {
    players[i].team = team
    playerIndex++
    if (playerIndex === numMember) {
      team++
      playerIndex = 0
    }
  }
}

function getPlayersByPage(
  page, // 想要取得第幾頁的 players
  offset,
  players,
  length, // players array 的長度
  team) { // 想要取得第幾隊的 players

  const startIndex = (page - 1) * PLAYERS_PER_PAGE + offset
  const endIndex = startIndex + PLAYERS_PER_PAGE

  for (let i = 0; i < PLAYERS_PER_PAGE; i++) {
    if (startIndex + i >= length) {
      return players.slice(startIndex, startIndex + i)
      // 最後一隊，第 17 隊，只有 8 人，會提前從這邊 return
      // 搜尋的結果可能每一隊只搜到 1~2 人，也會提前從這邊 return
    }
    if (players[startIndex + i].team !== team) {
      return players.slice(startIndex, startIndex + i) // 每一隊第 3 頁隊員只有 2 人，會提前從這邊 return
    }
  }

  return players.slice(startIndex, endIndex)
}

function addToFavorite(id) {
  const list = JSON.parse(
    localStorage.getItem('favoriteUsers')
  ) || []

  blackHeartList.splice(id - FIRST_USER_ID, 1, 1)

  renderHeart(id)
  const user = users.find(element => isIdMatched(element, id))
  list.push(user)
  localStorage.setItem('favoriteUsers', JSON.stringify(list))
  favoriteUsers.push(user)
}
function removeFavorite(id) {
  blackHeartList.splice(id - FIRST_USER_ID, 1, 0)
  renderHeart(id)
  const index = favoriteUsers.findIndex(user => user.id === id)
  if (index === -1) return // 傳入的 user id 在最愛清單中不存在
  favoriteUsers.splice(index, 1) // 刪除一個 user
  localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
}
function isIdMatched(element, id) {
  return element.id === id
}

function renderHeart(id) {
  let str = ''
  str += `[data-heart="${id}"]`
  const heartImg = document.querySelector(str)

  if (blackHeartList[id - FIRST_USER_ID] === 1) {
    heartImg.src = "./pic/solid_black_heart-removebg-preview.png"
  } else {
    heartImg.src = "./pic/empty black heart.png"
  }

}

function onDataPanelClick() {
  const target = event.target
  let team = -1

  if (target.matches('#previous-page')) {
    team = findTeam(target)
    const now = nowPage[team]
    if (now === 1) return
    nowPage[team]--

    if (afterSearch === true) { // 搜尋後的 render
      renderMember(
        getPlayersByPage(nowPage[team], 0, playersOfTeam[team], numPlayers[team], team),
        memberContainerPanel[team] // 目前render到第幾隊的 panel
      )
    } else { // 普通 render
      renderMember(
        getPlayersByPage(nowPage[team], team * NUM_MEMBER, users, users.length, team),
        memberContainerPanel[team] // 目前render到第幾隊的 panel
      )
    }

    const page = document.querySelector(`#paginator-${team}`)
    renderTeamPaginator(
      nowPage[team],
      page,
      team)

  } else if (target.matches('#next-page')) {
    team = findTeam(target)
    const now = nowPage[team]
    if (now === 3) return
    nowPage[team]++

    if (afterSearch === true) { // 搜尋後的 render
      renderMember(
        getPlayersByPage(nowPage[team], 0, playersOfTeam[team], numPlayers[team], team),
        memberContainerPanel[team] // 目前render到第幾隊的 panel
      )
    } else { // 普通 render
      renderMember(
        getPlayersByPage(nowPage[team], team * NUM_MEMBER, users, users.length, team),
        memberContainerPanel[team] // 目前render到第幾隊的 panel
      )
    }

    const page = document.querySelector(`#paginator-${team}`)
    renderTeamPaginator(
      nowPage[team],
      page,
      team)
  } else if (target.matches('.heart')) { // 按愛心，檢查之前是否已經被加入過最愛
    const id = Number(target.dataset.heart)
    const result = favoriteUsers.find(element => isIdMatched(element, id))

    if (result) { // 有找到，要把此 user 移出最愛
      removeFavorite(id)
    } else { // undefined，要把此 user 加入最愛
      addToFavorite(id)
    }
  } else if (target.matches(".card-img-top")) { // click avatar, show info modal
    const id = target.dataset.id
    showPlayerInfoModal(Number(id))
  }
}
function findTeam(element) {
  for (let i = 0; i < NUM_TEAM; i++) {
    if (Number(element.dataset.team) === i) {
      return i
    }
  }
  return -1
}
function showPlayerInfoModal(id) {
  modal.style.display = "grid";
  modalBackgroud.style.display = "block";

  const found = users.find(element => element.id === id);

  const team = found.team;
  modal.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),  url('" + teams[team].backgroundImg + "')"

  modal.style.backgroundRepeat = "no-repeat"
  modal.style.backgroundSize = "contain"
  modal.style.backgroundColor = teams[team].backgroundColor

  modalImage.setAttribute("src", found.avatar)

  modalName.innerHTML = `
    <p>${found.name}</p>
    <p>${found.surname}</p>
  `

  picEmail.setAttribute("src", "./pic/email-removebg-preview.png")
  textEmail.textContent = `${found.email}`;

  picGender.setAttribute("src", "./pic/gender-removebg-preview.png")
  textGender.textContent = `${found.gender}`;

  picAge.setAttribute("src", "./pic/age-removebg-preview.png")
  textAge.textContent = `${found.age}`;

  picRegion.setAttribute("src", "./pic/region-removebg-preview.png")
  textRegion.textContent = `${found.region}`;

  picBirthday.setAttribute("src", "./pic/cake.png")
  textBirthday.textContent = `${found.birthday}`;
}
function closeModal() {
  const target = event.target

  if (target.matches('.close-button')) { // close modal
    modalBackgroud.style.display = 'none'
  }
}

dataPanel.addEventListener('click', () => { // 點上一頁、下一頁、大頭照、愛心都會進來
  onDataPanelClick()
})

closeBtn.addEventListener('click', () => { // 按右上角 X 關閉 modal
  closeModal()
})

body.addEventListener('keydown', () => { // 按鍵盤 ESC 關閉 modal
  if (event.key === "Escape") {
    modalBackgroud.style.display = 'none'
  }
})

searchForm.addEventListener('submit', onSearchFormSubmitted)
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onSearchFormSubmitted()
  }
});

function onSearchFormSubmitted() {
  event.preventDefault()
  const keyword = searchInput.value.toLowerCase().trim()

  filteredUsers = users.filter(user => user.name.toLowerCase().includes(keyword))

  if (keyword.length === 0) { // keyword 全空白
    alert('input is empty')
    afterSearch = false;
    dataPanel.innerHTML = '' // 初始化
    for (let i = 0; i < NUM_TEAM; i++) { // 初始化
      nowPage.splice(i, 1, 1) // 每一隊初始頁回到 1
      renderTeam(i, users, users.length) // 每一隊回到最初12人
    }
    return
  } else if (filteredUsers.length === 0) { // 當使用者輸入的關鍵字找不到符合條件的項目時，跳出提示
    return alert('Cannot find any User Name with keyword:【' + keyword + '】')
  }

  renderSearchedTeam();
}

function renderSearchedTeam() {
  numPlayersToRender = filteredUsers.length
  if (numPlayersToRender > 0) { // 有找到，要 render 搜尋後的每隊球員
    dataPanel.innerHTML = '' // 初始化
    for (let i = 0; i < NUM_TEAM; i++) { // 初始化
      nowPage.splice(i, 1, 1)
    }
    afterSearch = true;
  }

  for (let i = 0; i < NUM_TEAM; i++) {
    if (filteredUsers.some(element => isTeamMatched(element, i))) {
      let temp = 0;

      filteredUsers.forEach(element => {
        if (isTeamMatched(element, i)) {
          playersOfTeam[i].splice(temp, 1, element)
          temp++;
        }
      })
      numPlayers[i] = temp;
      renderTeam(i, playersOfTeam[i], numPlayers[i])
    }
  }
}
function isTeamMatched(element, team) {
  return element.team === team
}