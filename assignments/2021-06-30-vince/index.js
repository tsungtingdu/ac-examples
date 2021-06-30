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

//function for song display
function getSongList (album) {
  let htmlContent = ''

  for (let songs of album.tracks) {
    htmlContent +=`
    <li class="nav-item">
      <a class="nav-link" id="pills" data-toggle="pill" href="#" role="tab" aria-controls="pills-home" aria-selected="true">${songs}</a>
    </li>`
  
  }
  
  songList.innerHTML = htmlContent
 
}

//triggers lyrics display

songList.addEventListener('click', (event) => {
  
  if (event.target.matches('.nav-link')) {
    let song = event.target.innerText
    
    //API get lyrics
    axios.get(BASE_URL + `Adele/${song}.json`)
    .then(response => {
      
      //lyrics display
      let lyricsHTML = `
        <h2>${song}</h2>
        <pre>${response.data.lyrics}</pre>   
      `
      
      lyricsPanel.innerHTML = lyricsHTML
       
      })
    }      
  })
 

getSongList(album)

  


  
  
  
  
  
