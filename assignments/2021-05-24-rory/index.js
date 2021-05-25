// DEFAULT CODE ////////////////////////
const BASE_URL = "https://api.lyrics.ovh/v1/"
const songList = document.querySelector("#song-list")
const lyricsPanel = document.querySelector("#lyrics-panel")
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

album.tracks.forEach((track) => {
  songList.innerHTML += `
    <li>
    <a class="nav-link" data-toggle="pill" href="#" role="tab">${track}</a>
    </li>
  `
})

songList.addEventListener("click", function () {
  let songName = event.target.innerHTML
  axios
    .get(`${BASE_URL}adele/${songName}`)
    .then(response => {
      lyricsPanel.innerHTML = `
        <h1>${songName}</h1>
        <pre>${response.data.lyrics}</pre>`
    })
    .catch(error => console.log(error))
});
