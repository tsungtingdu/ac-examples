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
function displaysongList(album){
  let songlistHtml = ''
  for (let song of album.tracks){
    songlistHtml += `
      <li class="nav-item">
    <a class="nav-link" data-toggle="pill" href="#" role="tablist">${song}</a>
  </li>
`
  }
  songList.innerHTML = songlistHtml
}
displaysongList(album);

songList.addEventListener('click', (event)=>{
let song = event.target.textContent
axios.get(`${BASE_URL}Adele/${song}`)
  .then(response => {
  let lyrics = response.data.lyrics
  displaysongLyrics(song, lyrics)
  })
})

function displaysongLyrics(song, lyrics){
  let lyricsHtml = `
  <h1>${song}</h1>
  <pre>${lyrics}</pre>
  `
  lyricsPanel.innerHTML = lyricsHtml
}