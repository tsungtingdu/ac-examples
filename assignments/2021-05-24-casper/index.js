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
//產生曲目

const trackName = album.tracks
trackName.forEach(song => {
    songList.innerHTML += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#" >${song}</a>
      </li>
      `;
})

// 點擊對應的按鈕，出現歌詞
// 需要在BASE_URL後加上 'artist'/'song' 

songList.addEventListener('click', event =>{
  // event.target.textContent 為被點選元素的文字內容
  let selectedSong = `${BASE_URL}${album.artist}/${event.target.textContent}`                        
  axios.get(selectedSong).then(response =>{
    // <pre>會依照原本文字的格式顯示出串接的文字內容；可以取代<p>
    lyricsPanel.innerHTML = `
    <h3>${event.target.textContent}</h3><br>
    <pre>${response.data.lyrics}</pre>
    `
  })
  .catch(error => console.log('NOPE'))
})