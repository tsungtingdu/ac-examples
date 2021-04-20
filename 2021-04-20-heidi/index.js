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
    "Sweetest Devotion",
  ],
};

// WRITE YOUR CODE ////////////////////////

//generate albumList
album.tracks.forEach((track) => {
  songList.appendChild(addTrack(track));
});

function addTrack(trackName) {
  let li = document.createElement("li");
  li.className = "nav-item";
  li.innerHTML = `<a class="nav-link" href="#">${trackName}</a>`;
  return li;
}

songList.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-link")) {
    
    let trackList = document.querySelectorAll(".nav-link");
    let track = e.target.innerText;

    //remove current active one
    trackList.forEach((track) => {
      track.classList.contains("active") && track.classList.remove("active");
    });
    //active the one been selected
    e.target.classList.add("active")

    //get lyrics and append it to lyrics panel
    axios
      .get(`${BASE_URL}${album.artist}/${track}`)
      .then((response) => {
        let lyrics = response.data.lyrics;
        lyricsPanel.innerHTML = `<pre>${lyrics}</pre>`;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
