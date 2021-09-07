// DEFAULT CODE ////////////////////////
const BASE_URL = "https://lyric-api-403c0.firebaseio.com/";
const songList = document.querySelector("#song-list");
const lyricsPanel = document.querySelector("#lyrics-panel");
const album = {
  artist: "Adele",
  album: "25",
  tracks: [
    "Hello",
    "Send My Love (To Your New Lover)",
    "I Miss You",
    "When We Were Young",
    "Remedy",
    "Water Under the Bridge",
    "River Lea",
    "Love in the Dark",
    "Million Years Ago",
    "All I Ask",
    "Sweetest Devotion"
  ]
};

// WRITE YOUR CODE ////////////////////////
//歌單列表
function displaySongList(album) {
  let navHtml = "";
  for (let song of album.tracks) {
    navHtml += `
    <li>
        <a class="nav-link" data-toggle="pill" href="#" role="tab"> ${song}</a>
      </li>`;
  }
  songList.innerHTML = navHtml;
}
//歌詞
function displayLyrics(song, lyrics) {
  lyricsPanel.innerHTML = `
  <h3>${song}</h3>
  <p>${lyrics}</p>
  `;
}
//點擊監控
songList.addEventListener("click", (e) => {
  if (e.target.matches(".nav-link")) {
    let song = e.target.innerText;
    axios.get(BASE_URL + `Adele/${song}.json`).then((response) => {
      let lyrics = response.data.lyrics;
      displayLyrics(song, lyrics);
    });
  }
});
displaySongList(album);
