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

//先將歌曲名稱帶入名單中
album.tracks.forEach (function(element) {
  const songName = document.createElement('a')
  songName.className = 'nav-link'
  songName.setAttribute('href','#')
  songName.innerHTML = element
  songList.appendChild(songName)
})

//選取之後亮燈，並串接API，將歌詞帶入右方panel中

songList.addEventListener('click',function(event) {
  //先清除先前的選取效果
  const allSongs = document.querySelectorAll('.nav-link')
  allSongs.forEach (element => element.setAttribute('class','nav-link'))
  //選中的，增加選取效果
  event.target.setAttribute('class','nav-link active')
  
  //串接，先取得使用者是按哪一個歌名
  const targetedSongname = event.target.innerText
  //console.log(targetedSongname)
  
 
  axios.get(BASE_URL + album.artist + '/' + targetedSongname)
  .then(function (response) {
    let rawLyrics = `<pre>${response.data.lyrics}</pre>`
    lyricsPanel.innerHTML = rawLyrics
  })
  
  .catch(function (error) {
    //如果lyricsovh報錯時，找另外一家來救援
    axios.get('https://lyric-api-403c0.firebaseio.com/' + album.artist + '/' + targetedSongname + '.json')
    .then(function (response) {
      let rawLyrics = `<pre>${response.data.lyrics}</pre>`
      lyricsPanel.innerHTML = rawLyrics
    })
    .catch(function (error) {
    })
    .finally(function () {
    })
  })
  .finally(function () {
  })
})

