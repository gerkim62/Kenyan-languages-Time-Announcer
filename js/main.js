import { playSounds, getSoundsUrls, getSelectedOptionFrom, getSelectedOptionValueFrom, showSpeaker, hideSpeaker, secondsToTime } from './utils.js'
/*import { getKambaSoundsForTime, getKambaTimeString, KAMBA_AUDIO_FOLDER } from './kamba.js'
import { getKalenjinSoundsForTime, getKalenjinTimeString } from './kalenjin.js'*/
import { Recording, detectClap, isMicrophoneAllowed } from './ClapDetector.js'

import Announcer from './Announcer.js'

let countdownTimeout, countdownInterval;

const updateVolume = (newValue) => {
  volume = newValue / 100
  localStorage.setItem('volume', volume)
  volumeTextEl.innerHTML = Number(newValue).toFixed() + '%'
  volumeInputEl.value = newValue
}


//showSpeaker()

const updatePlaybackRate = (newValue) => {
  playbackRate = newValue
  localStorage.setItem('playbackRate', playbackRate)
  playbackRateTextEl.innerHTML = Number(newValue).toFixed(1)
  playbackRateInputEl.value = newValue
}

const updateTimerCountdown = (remainingSeconds) => {
  timerCounterEl.innerText = secondsToTime(remainingSeconds);
}

const updateSensitivity = newSensitivity =>{
  console.log(sensitivity)
  sensitivity = +newSensitivity
  localStorage.setItem('sensitivity', sensitivity)
  sensitivityInputEl.value = sensitivity
  sensitivityTextEl.innerHTML = Math.floor(sensitivity*100)+'%'
}

let volume = volumeInputEl.value
let playbackRate = playbackRateInputEl.value
let sensitivity = sensitivityInputEl.value
updateSensitivity(localStorage.getItem('sensitivity')|| .50)
updateVolume(localStorage.getItem('volume') * 100 || 100)
updatePlaybackRate(localStorage.getItem('playbackRate') || 1)

export const AUDIO_FORMART = 'm4a'

//Events
sensitivityInputEl.addEventListener('input', e =>{
  updateSensitivity(sensitivityInputEl.value)
})
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
  else option.selected = false
})

timerDurationSelect.querySelectorAll('option').forEach(option => {
  //console.log(option)
  if (option.value === timerDuration) option.selected = true
  else option.selected = false
})

if (timerIsOn) {
  if (localStorage.getItem('timeToAnnounce') > new Date().getTime()) {
    /*announcerEl.classList.add('hidden')
    resumeDiv.classList.remove('hidden')*/



    notie.confirm({
      text: 'Do you want to resume the timer you had set previously?',
      cancelText: 'No',
      submitText: 'Yes',
      submitCallback: () => {

        const timeRemainingForTimerToAnnounce = localStorage.getItem('timeToAnnounce') - new Date().getTime()
        initTimer(timeRemainingForTimerToAnnounce)
        // console.log(timeRemainingForTimerToAnnounce)
        resumeDiv.classList.add('hidden')
        announcerEl.classList.remove('hidden')
        timerIsOn = true
        localStorage.setItem('timerIsOn', true)
      },
      cancelCallback: () => {

        resumeDiv.classList.add('hidden')
        announcerEl.classList.remove('hidden')
        localStorage.setItem('timerIsOn', false)
        timerIsOn = false
      }
    })

    timerIsOn = false
    localStorage.setItem('timerIsOn', false)

    acceptResumeBtn.addEventListener('click', () => {
        const timeRemainingForTimerToAnnounce = localStorage.getItem('timeToAnnounce') - new Date().getTime()
        initTimer(timeRemainingForTimerToAnnounce)
        // console.log(timeRemainingForTimerToAnnounce)
        resumeDiv.classList.add('hidden')
        announcerEl.classList.remove('hidden')
      }

    )
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

  if (timerIsOn) return notie.confirm({
    text: "Andother timer is running. Do you want to replace it?",
    cancelText: 'No',
    submitText: 'Yes',
    submitCallback: () => {
      //stop timeout
      clearTimeout(countdownTimeout)
      clearInterval(countdownInterval)

      initTimer(getSelectedOptionValueFrom(timerDurationSelect))
    },
    cancelCallback: () => {
      return
    }
  })



  if (!languageFormEl.reportValidity()) {

    notie.alert({
      type: 2,
      text: 'Please select a language first!',
      time: 2
    })

    return console.log('no language selected')
  }

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

  const date = new Date()

  const announcer = new Announcer({ language: languageSelected })
  const player = announcer.announce({ volume: volume, playbackRate: playbackRate, date })

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
  //console.log('timer inited: ' + timerDuration)
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
    updateTimerCountdown(Math.floor(timerDuration / 1000))
    timerInstructionEl.classList.add('hidden')
    countdownEl.classList.remove('hidden')

    countdownInterval = setInterval(() => {
      const remainingTime = Math.floor((timeToAnnounce - new Date().getTime()) / 1000) + 1
      updateTimerCountdown(remainingTime)
      if (remainingTime === 0) clearInterval(countdownInterval)
      //console.log('updaring time')
    }, 1000);

    countdownTimeout = setTimeout(() => {

      // console.log('playing after timer')
      player.play()


      player.onplay = () => {
        speakerEl.classList.add('play')
        timeStringEl.innerText = 'Announcing now, listen🔊'

      }

      timerIsOn = false
      localStorage.setItem('timerIsOn', false)
      showSpeaker()
      clearInterval(countdownInterval)
      countdownEl.classList.add('hidden')
      timerInstructionEl.classList.remove('hidden')
    }, Number(timerDuration))
  }
}




if (!isMicrophoneAllowed()) {
          notie.force({
            type: 3,
            text: 'You can control this app by clapping your hands, click the button below to start!',
            buttonText: 'Start Now',
            callback: function() {
              notie.confirm({
                text: 'Please allow permission to use the microphone so that we can detect when you clap. If you deny this permission, the clap detection feature will not work.',
                cancelText: 'Deny',
                submitText: 'Allow',
                submitCallback: () => {
              
                  const rec = new Recording(function(data) {
                    //alert(sensitivity)
                    if (detectClap(data, sensitivity)) {
                      console.log("clap!");
                      announceCurrentTime()
                    }
              
              
              
                  });
                  notie.alert({ type:1,text: ' Permission granted, try clapping your hands to announce!' })
              
                },
                cancelCallback: () => {
              
                  notie.alert({type:3, text: 'Permission denied. You can enable it later in settings.' })
                }
              })
            }
          })
  
}


window.addEventListener('resize', ()=>{
  console.log(innerHeight)
})
