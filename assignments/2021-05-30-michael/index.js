// DEFAULT CODE ////////////////////////
const BASE_URL = "https://api.lyrics.ovh/v1/";
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
function displayTitle(album) {
  let songTitle = "";
  for (let song of album.tracks) {
    songTitle += `
       <li>
        <a class="nav-link" data-toggle="pill" href="#" role="tab"> ${song}</a>
      </li>`;
  }
  songList.innerHTML = songTitle;
}

displayTitle(album);

function displayLyrics(title, lyrics) {
  lyricsPanel.innerHTML = `
    <h1>${title}</h1>
    <pre>${lyrics}</pre>
  `;
}

//增加一個監聽器
songList.addEventListener("click", function (event) {
  let title = event.target.innerHTML;
  if (event.target.matches(".nav-link")) {
    axios.get(BASE_URL + `Adele/${title}`).then(function (response) {
      let lyrics = response.data.lyrics;
      showLyrics(title, lyrics);
    });
  }
});
