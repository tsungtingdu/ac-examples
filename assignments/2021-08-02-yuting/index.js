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

//song list production
songList.innerHTML = `
  <ul class="nav nav-pills">
  </ul>
`
album.tracks.forEach(song => {
  const single = `<li class="nav-item"><a class="nav-link" href="#" data-toggle="pill" role="tab">${song}</a></li>`
  songList.innerHTML += single 
})

//lyrics logic
songList.addEventListener('click', event => {
  const target = event.target
  const song = target.innerText
  axios.get(`${BASE_URL}Adele/${song}.json`)
  .then(function (response) {
    // handle success
    const lyrics = response.data.lyrics
    lyricsPanel.innerHTML = `
    <h3>${song}</h3>
    <hr>
    <pre>${lyrics}</pre>` 
   ;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
})

// for(let track of album.tracks) {  axios.get(`${BASE_URL}Adele/${track}.json`)
//   .then(function (response) {
//     // handle success
//     const lyrics = response.data.lyrics
//     lyricsPanel.innerHTML += `
//     <h3>${track}</h3>
//     <pre>
//       ${lyrics}
//     </pre>` 
//    ;
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
// }