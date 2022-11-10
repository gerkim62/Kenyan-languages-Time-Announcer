export const getAfricanHours = hours => {

  if (hours > 12) hours -= 12

  hours > 6 ? hours -= 6 : hours += 6
  return hours
}

export const getSoundsUrls = ({ sounds: sounds, folder: folder, formart: formart }) => {
  return sounds.map(sound => {
    return `${folder}/${sound}.${formart}`.replace(' ', '').replace("'",'')
  })
}


export const playSounds = ({ soundsUrls: soundsUrls, volume: volume, playbackRate: playbackRate, timeString: timeString }) => {
  timeStringEl.textContent = 'Getting ready, please wait...'
  showSpinner()


  //alert('There was an error, please check your internet connection or reload the page')

  if (typeof Gapless5 === 'undefined') {
    return notie.force({
      type: 3,
      text: 'An error has occured, please reload the page.',
      time: 2,
      buttonText: 'Reload',
      callback: this.location.href = this.location.href
    })
  }
  const player = new Gapless5({
    tracks: soundsUrls,
    crossFade: 0,
    exclusive: true,
    playbackRate: playbackRate,
    useHTML5Audio: true,
    useWebAudio: true,
    crossfadeShape: CrossfadeShape.Linear,
    volume: volume
  })
  showSpeaker()
  player.play()
  player.onplay = () => {
    hideSpinner()
    speakerEl.classList.add('play')
    timeStringEl.textContent = timeString
  }
  player.onpause = () => hideSpeaker()
  player.onfinishedall = () => {
    setTimeout(() => {
      hideSpeaker()
      speakerEl.classList.remove('play')
    }, 340)

  }
  let failCount = 0
  player.onerror = (audio) => {
    hideSpeaker()
    failCount++
    if (failCount <= 1) {
      return notie.force({
        type: 3,
        text: 'An error has occured while trying to start the announcer. Please report this problem using the social links',
        time: 2,
        buttonText: 'Ok',
        
      })

    }

    console.log('Error', failCount + ':', 'An error has occured while trying to play', audio, 'in', soundsUrls)

  }
  
  hideSpinner()

  return player
}

export const getSelectedOptionValueFrom = selectEl => {
  const selectedOption = selectEl.querySelector("option:checked");
  return selectedOption.value
}

export const announceCurrentTime = ({ language: language, volume: volume, playbackRate: playbackRate }) => {

}

export const hideSpeaker = () => {
  speakerEl.classList.add('hidden')
  announcerEl.classList.remove('hidden')
}

export const showSpeaker = () => {
  speakerEl.classList.remove('hidden')
  announcerEl.classList.add('hidden')
}

export const getSelectedOptionFrom = selectEl => {
  const selectedOption = selectEl.querySelector("option:checked");
  return selectedOption
}


export const secondsToTime = seconds =>{
  const SECONDS_IN_HOUR = 3600
  const SECONDS_IN_MINUTE = 60
    const hours = Math.floor(seconds / SECONDS_IN_HOUR).toString().padStart(2,''),
          minutes = Math.floor(seconds % SECONDS_IN_HOUR / SECONDS_IN_MINUTE).toString().padStart(2,'0'),
          remainingSeconds = Math.floor(seconds % SECONDS_IN_MINUTE).toString().padStart(2,'0');
    
    
    return `${hours>0?hours+'h ':''}${minutes>0?minutes+'m ':''}${remainingSeconds}s`;
}

console.log(secondsToTime(6500))

const hideSpinner = ()=>spinnerEl.classList.add('hidden')

const showSpinner = ()=>spinnerEl.classList.remove('hidden')
