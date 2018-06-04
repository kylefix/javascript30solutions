const $video = document.querySelector('video')
const $playButtons = document.querySelectorAll('.player__button')
const $volume = document.querySelector('.player__slider[name="volume"]')
const $playbackRate = document.querySelector('.player__slider[name="playbackRate"]')
const $progressBar = document.querySelector('.progress')
const $progress = document.querySelector('.progress__filled')

$video.load()
$volume.value = $video.volume
$playbackRate.value = $video.playbackRate

const toggleFullscreen = () => {
  $video.webkitSupportsFullscreen && $video.webkitRequestFullScreen()
}

const play = () => {
  $playButtons[0].innerText = '||'
  $video.play()
}

const pause = () => {
  $playButtons[0].innerText = '►'
  $video.pause()
}

const togglePlay = () =>
  $video.paused
    ? play()
    : pause()

const handlePlay = (e) => {
  if (!e.target.dataset.skip) {
    togglePlay()
  } else {
    $video.currentTime += +e.target.dataset.skip
  }
}

const setVolume = () => {
  $video.volume = $volume.value
}

const setPlaybackRate = () => {
  $video.playbackRate = $playbackRate.value
}

const handleKeyPress = (e) => {
  e.keyCode === 32 && togglePlay()
  e.key === 'f' && toggleFullscreen()
}

const updateTime = () => {
  const percentagePlayed = ~~(($video.currentTime / $video.duration) * 100)
  $progress.style.setProperty('flex-basis', `${percentagePlayed}%`)
}

const setTime = e => {
  $video.currentTime = ~~((e.offsetX / $progressBar.offsetWidth) * $video.duration)
}

document.addEventListener('keypress', handleKeyPress)

$video.addEventListener('timeupdate', updateTime)
$video.addEventListener('click', togglePlay)

$playButtons.forEach($playButton => $playButton.addEventListener('click', handlePlay))

$volume.addEventListener('input', setVolume)

$playbackRate.addEventListener('input', setPlaybackRate)

$progressBar.addEventListener('click', setTime)
