const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const tittle = document.querySelector('#tittle')
const cover = document.querySelector('#cover')
const progressContainer = document.querySelector(".progress-container");
const volBtn = document.querySelector("#volume")


// Song titles
const songs = ['yamyam', 'trigun', 'missyou'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
  audio.volume = 1;
}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong() {
  songIndex--

  if(songIndex <0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
}

function nextSong() {
  songIndex++

  if(songIndex > songs.length -1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX  = e.offsetX
    const duration = audio.duration 

    audio.currentTime = (clickX / width) * duration
}

function muteSong() {
  volBtn.querySelector('i.fas').classList.remove('fa-volume-up')
  volBtn.querySelector('i.fas').classList.add('fa-volume-mute')
  audio.volume = 0;
}

function unMuteSong() {
  volBtn.querySelector('i.fas').classList.add('fa-volume-up')
  volBtn.querySelector('i.fas').classList.remove('fa-volume-mute')
  audio.volume = 1;
}

// Event listeners 
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying) {
    pauseSong()
  } else {
    playSong()
    unMuteSong()
  }
})

volBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying) {
    muteSong()
    pauseSong()
  } else {
    unMuteSong()
    playSong()
  }
 
})




// Change song events 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

