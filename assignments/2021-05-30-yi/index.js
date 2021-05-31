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
for (i = 0; i < album.tracks.length; i++) {
  songList.innerHTML += `<li class="nav-item">
                          <a class="nav-link" data-toggle="pill" href="#" >${album.tracks[i]}</a>
                         </li>
                        `;
}
songList.addEventListener("click", function (event) {
  let URL = `${BASE_URL}${album.artist}/${event.target.innerText}`;
  axios.get(URL).then(function (response) {
    lyricsPanel.innerHTML = `
                             <h1>${event.target.innerText} </h1>
                             <pre>${response.data.lyrics}</pre>
                            `;
  });
});
