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
//建置專輯歌曲清單
function showTrackList(album){
  const trackArray = album.tracks
  trackArray.forEach(track =>songList.innerHTML+=`
    <li>
      <a class="nav-link" data-toggle="pill" href="#" role="tab"> ${track}</a>
    </li>`
  )}
showTrackList(album)

//設置監聽器取得歌曲並顯示歌詞
songList.addEventListener('click' , function(){
  $('html, body').scrollTop(0);
  const currentTrack = event.target.innerText;
  const requerst_URL = `${BASE_URL}Adele/${currentTrack}.json`
  const lyricsTitle = document.querySelector('h3')
  //當初始歌詞欄是空的或請求不同歌詞時才Request
  if(lyricsTitle!== null && currentTrack !== lyricsTitle.innerText || lyricsPanel.innerText ===""){
    lyricsPanel.innerHTML = ` Loading Lyrics...<img src = "https://i.stack.imgur.com/kOnzy.gif" style = "height:35px">`
    getLyrics(requerst_URL , currentTrack)
  }
})

function getLyrics(requerst_URL , currentTrack){
  axios.get(requerst_URL).then(function(response){
    lyricsPanel.innerHTML = ` 
      <h3>${currentTrack}</h3><br/>
      <pre>${response.data.lyrics}</pre> 
    ` 
  }).catch(function(error){
    console.log(error)
     lyricsPanel.innerHTML = ` 
      <h3>Loading Failed...!</h3>
    ` 
  })
}