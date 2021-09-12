album.tracks.forEach((songName) => {
  songList.innerHTML += `
    <li class="nav-item">
      <a>${songName}</a>
    </li>
  `;
});

songList.addEventListener("click", (event) => {
  const fakeSite = "lyric-api-403c0.firebaseio.com";
  const artist = album.artist;
  let title = event.target.innerText;
  let getURL = `https://${fakeSite}/${artist}/${title}.json`;

  axios
    .get(getURL)
    .then((response) => {
      lyricsPanel.innerHTML = `
      <p>${event.target.innerText}</p>
      <pre>${response.data.lyrics}</pre>
    `;
    })
    .catch((error) => {
      console.log(error);
    });
});
