// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://lyric-api-403c0.firebaseio.com/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const video = document.querySelector('#video')
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

// embed video
const videoLink = {
  'Hello': 'YQHsXMglC9A',
  'Send My Love (To Your New Lover)': 'fk4BbF7B29w',
  'I Miss You': 'z7NEG3SGZ_g',
  'When We Were Young': 'a1IuJLebHgM',
  'Remedy': '-fsCc7Be1H0',
  'Water Under the Bridge': 'l8djdhhFuxo',
  'River Lea': 'Qiu59lZShC',
  'Love in the Dark': '-hzFTJDJGkQ',
  'Million Years Ago': 'Db9ciJPIaEU',
  'All I Ask': 'jb5g4UFHmfQ', 
  'Sweetest Devotion': '1kZsaRkVEUY',
}

// WRITE YOUR CODE ////////////////////////

// create song lists
album['tracks'].forEach(item => {
  let li = document.createElement('li')
  li.innerHTML = `
     <a class="nav-link" href="#">${item}</a>
  `
  songList.appendChild(li)
})

// 顯示歌詞 
songList.addEventListener('click', event => {
  //去除前一次的active樣式
  if (document.querySelector('.active') !== null){
    document.querySelector('.active').classList.remove('active') 
  }
  const target = event.target
  target.classList.add('active')
   
  //導入歌詞 
  axios.get(`${BASE_URL}Adele/${target.innerText}.json`).then((response) => {
      lyricsPanel.innerHTML = `
        <h3>${target.innerText}</h3>
        <hr/>
        <pre>${response.data.lyrics}</pre>
      `
    })
    .catch((error) => console.log(error)); 
  
  //換對應到的歌曲影片
  video.innerHTML = `
      <iframe width="100%" hight="auto" 
         src="https://www.youtube.com/embed/${videoLink[target.innerText]}">
      </iframe>
    `
})
