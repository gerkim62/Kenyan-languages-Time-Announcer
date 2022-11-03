import { playSounds, getSoundsUrls, getSelectedOptionFrom, getSelectedOptionValueFrom, showSpeaker, hideSpeaker } from './utils.js'
import { getKambaSoundsForTime, getKambaTimeString, KAMBA_AUDIO_FOLDER } from './kamba.js'
import { getKalenjinSoundsForTime, getKalenjinTimeString } from './kalenjin.js'
import Announcer from './Announcer.js'

const updateVolume = (newValue) => {
  volume = newValue / 100
  localStorage.setItem('volume', volume)
  volumeTextEl.innerHTML = Number(newValue).toFixed() + '%'
  volumeInputEl.value = newValue
}

const updatePlaybackRate = (newValue) => {
  playbackRate = newValue
  localStorage.setItem('playbackRate', playbackRate)
  playbackRateTextEl.innerHTML = Number(newValue).toFixed(1)
  playbackRateInputEl.value = newValue
}

const updateTimerCountdown = (remainingTime) => {
  timerCounterEl.innerText = remainingTime;
}


let volume = volumeInputEl.value
let playbackRate = playbackRateInputEl.value
updateVolume(localStorage.getItem('volume') * 100 || 100)
updatePlaybackRate(localStorage.getItem('playbackRate') || 1)

export const AUDIO_FORMART = 'm4a'

//Events
playbackRateInputEl.addEventListener('input', (e) => {

  updatePlaybackRate(e.target.value)
})
volumeInputEl.addEventListener('input', (e) => {

  updateVolume(e.target.value)
})

let timerIsOn = localStorage.getItem('timerIsOn') === 'true' || false

const language = localStorage.getItem('language')
const timerDuration = localStorage.getItem('timerDuration')

languageSelect.querySelectorAll('option').forEach(option => {

  if (option.value === language) option.selected = true
})

timerDurationSelect.querySelectorAll('option').forEach(option => {
  //console.log(option)
  if (option.value === timerDuration) option.selected = true
})

if (timerIsOn) {
  if (localStorage.getItem('timeToAnnounce') > new Date().getTime()) {
    announcerEl.classList.add('hidden')
    resumeDiv.classList.remove('hidden')

    acceptResumeBtn.addEventListener('click', () => {
      const timeRemainingForTimerToAnnounce = localStorage.getItem('timeToAnnounce') - new Date().getTime()
      initTimer(timeRemainingForTimerToAnnounce)
      // console.log(timeRemainingForTimerToAnnounce)
      resumeDiv.classList.add('hidden')
      announcerEl.classList.remove('hidden')
    })
    denyResumeBtn.addEventListener('click', () => {
      resumeDiv.classList.add('hidden')
      announcerEl.classList.remove('hidden')
      localStorage.setItem('timerIsOn', false)
      timerIsOn = false
    })
  }
  else {
    //console.log('time up')
    localStorage.setItem('timerIsOn', false)
    timerIsOn = false
  }

}

timerFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  timerIsOn = localStorage.getItem('timerIsOn') === 'true' || false

  if (timerIsOn) return alert(`Sorry, can't set a new timer because another one is running.`)

  if (!languageFormEl.reportValidity()) return console.log('no language selected')

  const selectedTimerDuration = getSelectedOptionValueFrom(timerDurationSelect)
  localStorage.setItem('timerDuration', selectedTimerDuration);
  initTimer(selectedTimerDuration)
})

languageFormEl.addEventListener('submit', (e) => {
  e.preventDefault()

  announceCurrentTime()
})

function announceCurrentTime() {
  const languageSelected = getSelectedOptionValueFrom(languageSelect)
  localStorage.setItem('language', languageSelected);




  const announcer = new Announcer({ language: languageSelected })
  const player = announcer.announce({ volume: volume, playbackRate: playbackRate })

  return player
}

function announceTime(date) {
  const languageSelected = getSelectedOptionValueFrom(languageSelect)
  localStorage.setItem('language', languageSelected);


  const announcer = new Announcer({ language: languageSelected })
  const player = announcer.announce({ volume: volume, playbackRate: playbackRate, date: date })

  return player
}



function initTimer(timerDuration) {
  const timeToAnnounce = new Date().getTime() + Number(timerDuration)
  localStorage.setItem('timeToAnnounce', timeToAnnounce);
  //console.log(timerDuration)
  const player = announceTime(new Date(timeToAnnounce))
  let playingFirstTime = true

  player.onplay = () => {
    //console.log('onplay')
    if (!playingFirstTime) return

    player.pause()
    playingFirstTime = false
    timerIsOn = true
    localStorage.setItem('timerIsOn', timerIsOn);
    updateTimerCountdown(Math.floor(timerDuration / 1000) + 's')
    timerInstructionEl.classList.add('hidden')
    countdownEl.classList.remove('hidden')

    let interval = setInterval(() => {
      const remainingTime = Math.floor((timeToAnnounce - new Date().getTime()) / 1000) + 1 + 's'
      updateTimerCountdown(remainingTime)
      //console.log('updaring time')
    }, 1000);

    setTimeout(() => {

     // console.log('playing after timer')
      player.play()


      player.onplay = () => speakerEl.classList.add('play')

      timerIsOn = false
      localStorage.setItem('timerIsOn', false)
      showSpeaker()
      clearInterval(interval)
      countdownEl.classList.add('hidden')
      timerInstructionEl.classList.remove('hidden')
    }, Number(timerDuration))
  }
}