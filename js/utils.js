export const getAfricanHours = hours => {

  if (hours > 12) hours -= 12

  hours > 6 ? hours -= 6 : hours += 6
  return hours
}

export const getSoundsUrls = ({ sounds: sounds, folder: folder, formart: formart }) => {
  return sounds.map(sound => {
    return `${folder}/${sound}.${formart}`.replace(' ', '')
  })
}


export const playSounds = ({ soundsUrls: soundsUrls, volume: volume, playbackRate: playbackRate }) => {
  showSpeaker()
  const player = new Gapless5({
    tracks: soundsUrls,
    crossFade: 50,
    exclusive: true,
    playbackRate: playbackRate,
    useHTML5Audio: true,
    useWebAudio: true,
    crossfadeShape: CrossfadeShape.Linear,
    volume: volume
  })
  player.play()
  player.onplay = () => speakerEl.classList.add('play')
  player.onpause = () => hideSpeaker()
  player.onfinishedall = () => {
    setTimeout(() => {
      hideSpeaker()
      speakerEl.classList.remove('play')
    }, 340)

  }
  player.onerror = () => console.log('An error has occured!')

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
