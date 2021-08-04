// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://lyric-api-403c0.firebaseio.com/'
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
ini();
let str='';
let btn=document.querySelectorAll('#song-list li');
//列出歌單;
function ini(){
  songList.innerHTML="";
  for(let i=0; i<album.tracks.length; i++){
    songList.innerHTML+=`
      <li class="nav-item">
      <a class="nav-link" href="#" data-toggle="pill">${album.tracks[i]}</a>
      </li>`;    
  }
}
//請求歌詞資料並呈現
for(let j=0; j<btn.length; j++){
  btn[j].addEventListener('click',(e)=>{
    e.preventDefault();
    // 以下三行code
    // 我嚐試不用BS提供的data-toggle="pill"去啟動click藍底效果, 想在click時單獨加入.active去啟動它
    // 加入class='active'是成功的, 但預先把歌單初始化卻失敗
    // 在此初始化是為了清空所有歌單的.actvie, 以達到按A時, B的click效果移除的目的
    // songList.innerHTML=""; <-----先清空歌單
    // ini(); <-----再把沒有任何.active的歌單重新運算進來, 但為何此法無作用?
    // btn[j].classList.add('active'); <------各自在click時加上active
    str=BASE_URL+`${album.artist}/${album.tracks[j]}.json`
    // console.log(str)
    axios.get(str)
    .then(res=>{
      // console.log(res)
      lyricsPanel.innerHTML=
      ` <h3>${album.tracks[j]}</h3>
        <pre>${res.data.lyrics}</pre>`
    })
    .catch(res=>{
      console.log('res.error')
    })
  });
}
