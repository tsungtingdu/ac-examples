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

// WRITE YOUR CODE ////////////////////////

// Step 1. 設定歌單顯示
function showSongList(album) {
  let navHtml = ''
  for (let song of album.tracks) {
    navHtml += `
      <li>
        <a class="nav-link" data-toggle="pill" href="#" role="tab"> ${song}</a>
      </li>`
  }
  songList.innerHTML = navHtml
}


// Step 2. 設定歌詞顯示
function showLyrics(song, lyrics) {
  lyricsPanel.innerHTML = `
    <h3>${song}</h3>
    <pre>${lyrics}</pre>
  `
}

// Step 3. 掛事件監聽
songList.addEventListener('click', (event) => {
  if (event.target.matches('.nav-link')) {
    let song = event.target.innerText 
    console.log(event.target.innerText)
    axios.get(BASE_URL + 'Adele/' +`${song}.json`).then(response => {
       console.log(response.data)
      let lyrics = response.data.lyrics
       console.log(lyrics)
      showLyrics(song, lyrics)
    })
  }
})

// Step 4. 啟動顯示歌單
showSongList(album)
