// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://api.lyrics.ovh/v1/'
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

// 新增 ul 的 nextElementSibling
const songName = document.createElement('div')
// 抓取 ul 的 parentElement
const songNameContainer = document.querySelector('.col-4')
songNameContainer.append(songName)

// 左欄 songList
// songName 中加入 所有歌名
for (let i = 0; i < album.tracks.length; i++) {
  songName.innerHTML += `
    <a class="song-name nav-link active" href="#">${album.tracks[i]}</a>
  `
}
// 抓取 a element
const song = document.querySelectorAll('.song-name')

// 按下任一歌名, 右欄出現該歌詞
// song (a element) 設置事件監聽器, 點擊後 axios發送請求
// 接收回應後, 調用 getLyrics函式, 將 response 資料 透過參數傳入函式
for (let i = 0; i < album.tracks.length; i++) {
  song[i].addEventListener('click', () => {
    axios.get(`${BASE_URL}${album.artist}/${album.tracks[i]}`)
      .then(response => {
        // console.log(response)
        // console.log(response.data.lyrics) 歌詞內容
        const lyrics = response.data.lyrics
        const lyricsName = album.tracks[i]
        // 調用 getLyrics函式
        getLyrics(lyricsName, lyrics)
      })
      .catch(error => { console.log(error) })
  })
}
// 顯示歌詞內容
function getLyrics (lyricsName, lyrics) {
  lyricsPanel.innerHTML = `
    <h3 class="text-info">${lyricsName}</h3>
    <pre class="text-secondary">${lyrics}</pre>
  `
}
