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

// WRITE YOUR CODE //////
//先for循環出歌名
for ( let i = 0; i < album.tracks.length; i++ ) {
        let data = album.tracks[i];
        let div = document.createElement("div");
        let htmlContent = `
        <li>
        <a class="nav-link" href="#" role="tab">${data}</a>
        </li>
        `
        // console.log(htmlContent)測試一下歌名
        div.innerHTML = htmlContent;
        songList.append(div)
}
songList.addEventListener("click", function (event) {
  // 當前點擊目標
  const target = event.target;
  //按鈕反色
  const item = document.querySelector("#song-list .active");
  if (item) {
    item.classList.remove("active");
  }
  target.classList.add("active");
  const song = target.innerText
    axios
      .get(`${BASE_URL}Adele/${song}.json`)
      .then( (response) => {
        const lyrics = response.data.lyrics
          lyricsPanel.innerHTML = `
            <h3>${song}</h3>
            <pre>${lyrics}</pre>
            `
      })
      .catch( (error) => console.log(error));
})
        
