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
for(let i = 0; i < 11; i++) {
  songList.innerHTML += `
     <li>
        <a class="nav-link" data-toggle="pill" href="#" role="tab">${album.tracks[i]}</a>
     </li>
  `
}

songList.addEventListener('click', function(event) {
  let title = event.target.innerText
  axios
    .get(`${BASE_URL}/Adele/${title}`)
    .then(function(response) {
    lyricsPanel.innerHTML = `
      <h3>${title}</h3>
      <pre>${response.data.lyrics}</pre>
    `
  })
})
