for (let i = 0; i < album.tracks.length; i++) {
  let li = document.createElement("li");
  let htmlContent = ` <a class="nav-link" data-toggle="pill" href="#" role="tab">${album.tracks[i]}</a>`;
  li.innerHTML = htmlContent;
  songList.append(li);
}

songList.addEventListener("click", function (event) {
let albumTitle = event.target.innerText 

axios.get(`https://api.lyrics.ovh/v1/${album.artist}/${albumTitle}`).then(function(response){
  let albumLyrics = response.data.lyrics

  lyricsPanel.innerText = `${albumLyrics}`
})

})