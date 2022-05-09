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
//存取 album 的 tracks 陣列 (所有曲目) 
const tracks = album.tracks
//為 tracks 陣列中的每個曲目一一做出 HTML 清單 
let htmlContent = ''
tracks.forEach(function(track) {
    htmlContent += `
    <li class="nav-item"><a class="nav-link" href="#" style="text-decoration:none">${track}</a></li>
`
  } 
)
//曲目清單加進 songList
songList.innerHTML = htmlContent

//
songList.addEventListener('click', function(event) {
  let songs = document.querySelectorAll('a')
  
  //所有 a 的 class 設定為 nav-link
  songs.forEach(function(song) {
     song.setAttribute("class", "nav-link")
    }
  )
  
  //被點擊的歌曲標題
  let title = event.target.innerHTML
  //console.log(title)
  let URL = BASE_URL.concat(`${album.artist}/${title}.json`)
  //console.log(URL)
        
  event.target.setAttribute("class", "nav-link active")
  event.target.setAttribute("aria-current", "page")    
  

axios.get(URL)
  .then(function (response) {
    //console.log(response.data.lyrics)
    lyricsPanel.innerHTML = `
    <h3>${title}</h3>
    <pre>${response.data.lyrics}</pre>`
  })
  .catch(function (error) {
    console.log(error)
  })
})