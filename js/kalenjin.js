import {getAfricanHours} from './utils.js'

const ZERO_TO_TEN__ONES = ['poch', 'agenge', 'oeng', 'somok', 'angwan', 'muut', 'lo', 'tisap', 'sisit', 'sogol', 'taman']
const AND__PHRASE = 'ak'
const ZERO_TO_FIFTY__TENS = ['poch', 'taman', 'tiptem', 'sosom', 'artam', 'konom']
const IT_IS__PHRASE = 'sait'

export const KALENJIN_AUDIO_FOLDER = 'sounds/kalenjin'

const getKalenjinSoundsForNumber = ({number:number}) => {
  const sounds = []

  const numberOfTens = Math.floor(number / 10)
  const numberOfOnes = number - numberOfTens * 10

  if (numberOfTens > 0) sounds.push(ZERO_TO_FIFTY__TENS[numberOfTens])

  if (numberOfOnes > 0) {
    if (numberOfTens > 0) sounds.push(AND__PHRASE)
    sounds.push(ZERO_TO_TEN__ONES[numberOfOnes])
  }
  return sounds
}

export const getKalenjinTimeString = ({date:date=new Date}={}) => {

  return getKalenjinSoundsForTime({date:date=new Date()}).join(' ') + '.'
}

export const getKalenjinSoundsForTime = ({date:date=new Date()}={}) => {
  let timeSounds = []

  const africanHours = getAfricanHours(date.getHours())
  const minutes = date.getMinutes()
  
  timeSounds.push(IT_IS__PHRASE)

  const hoursSounds = getKalenjinSoundsForNumber({number:africanHours})
  timeSounds.push(...hoursSounds)

  timeSounds.push(AND__PHRASE)

  const minutesSounds = getKalenjinSoundsForNumber({number:minutes})
  timeSounds.push(...minutesSounds)

  return timeSounds
}

