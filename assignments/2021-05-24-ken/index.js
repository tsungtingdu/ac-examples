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

//用for...of
for(let song of album.tracks ){
  
  songList.innerHTML += `
    <li class ="nav-item">
          <a class="nav-link" data-toggle="pill" href="#">${song}</a>
          
    </li>      
    
  `
}
  

  songList.addEventListener("click", function (event) {
  axios
    .get(`${BASE_URL}/${album.artist}/${event.target.textContent}`)
    .then(function (response) {
      //<pre></pre>可以有換行效果
      lyricsPanel.innerHTML =` 
        <div style="font-size:50px ">${event.target.textContent}</div>
        <br>
        <pre style="font-size:20px ">${response.data.lyrics}</pre>
      
      `
    })
    .catch(function (error) {
      console.log(error);
    });
});
  
