// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://lyric-api-403c0.firebaseio.com/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

// WRITE YOUR CODE /////////////

//建立歌曲清單
album['tracks'].forEach(item => {
 let li = document.createElement('li')
 li.innerHTML = `
    <a class="nav-link" href="#">${item}</a>
 `
 songList.appendChild(li)
})

//儲存上次點擊區塊
let previousSong = []

//點擊歌曲顯示歌詞
songList.addEventListener('click', event => {
   //改變前一次點擊區塊的樣式
  if (previousSong.length > 0 ) {
    previousSong[0].classList.remove('active')
    previousSong.pop()    
  } 
  const target = event.target
  target.classList.add('active')
  previousSong.push(target)
   
  //axios傳入歌詞
  axios
    .get(`${BASE_URL}Adele/${target.innerText}.json`) 
    .then((response) => {
    lyricsPanel.innerHTML = `
    <h3>${target.innerText}</h3>
    <hr/>
    <pre>${response.data.lyrics}</pre>
    `
  })
    .catch((error) => console.log(error)); 
})


