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
// 先建立出專輯的歌曲清單
for (let i = 0; i < album.tracks.length; i++) {
  let li = document.createElement("li");
  let htmlContent = `
<a class="nav-link active" id="pills-home-tab" data-toggle="pill"  href="#pills-home" role="tab" aria-controls="pills-home" aria- selected="true">${album.tracks[i]}</a>
  `;
  li.innerHTML = htmlContent;
  songList.append(li);
}

// 在透過事件監聽設定點選歌曲時出現歌詞
songList.addEventListener("click", (event) => {
  if (event.target.matches(".nav-link")) {
    let song = event.target.innerText;
    console.log(song);
    axios.get(BASE_URL + `adele/${song}`).then((response) => {
      let lyrics = response.data.lyrics;
      console.log(lyrics);
      lyricsPanel.innerHTML = `
          <h3>${song}</h3>
          <pre>${lyrics}</pre>
        `;
    });
  }
});
