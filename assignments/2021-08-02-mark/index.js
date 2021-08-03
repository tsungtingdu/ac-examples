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

const tracks = album.tracks
tracks.forEach( function(track){
  songList.innerHTML += `<li class="nav-item"> <a class="nav-link" href="#">${track}</a> </li>`
})

songList.addEventListener('click', function() {
  const songListCss = document.querySelector('.active')
  if (songListCss !== null) {
    songListCss.classList.remove('active')
  }
  event.target.classList.add('active')
  const songName = event.target.innerText
  axios.get(`https://lyric-api-403c0.firebaseio.com/Adele/${songName}.json`)
  .then(function(responed) {
    lyricsPanel.innerHTML = `
    <h1>${songName}</h1>
    <pre>${responed.data.lyrics}</pre>
    `        
  })
})
