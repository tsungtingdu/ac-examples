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

album.tracks.forEach((item) => {
  songList.innerHTML += `
    <li>
      <a class="nav-link" data-toggle="pill" href="#" role="tab"> ${item}</a>
    </li>`;
});

songList.addEventListener("click", (event) => {
  let song = event.target.innerText;
  axios.get(BASE_URL + `Adele/${song}.json`).then((response) => {
    let lyrics = response.data.lyrics;
    lyricsPanel.innerHTML = `
    <h1>${song}</h1>
    <pre>${lyrics}</pre>`;
  }).catch(error => console.log(error))
});
