import {getAfricanHours} from './utils.js'

const ZERO_TO_TEN__ONES = ['nono', 'achiel', 'ariyo', 'adek', 'angwen', 'abich', 'auchiel', 'abiriyo', 'aboro', 'ochiko', 'apar']
const AND__PHRASE = 'gi'
const ZERO_TO_FIFTY__TENS = ['nono', 'apar', 'ariyo', 'adek', 'angwen', 'abich']
const IT_IS__PHRASE = 'en saa'
const TENS__PHRASE = 'piero'

export const LUO_AUDIO_FOLDER = 'sounds/luo'

const getLuoSoundsForNumber = ({number:number}) => {
  const sounds = []

if(number <= 10){
  sounds.push(ZERO_TO_TEN__ONES[number])
  return sounds
}

  const numberOfTens = Math.floor(number / 10)
  const numberOfOnes = number - numberOfTens * 10
  
  sounds.push(TENS__PHRASE)
  sounds.push(ZERO_TO_TEN__ONES[numberOfTens])

  if (numberOfOnes > 0) {
     sounds.push(AND__PHRASE)
     sounds.push(ZERO_TO_TEN__ONES[numberOfOnes])
  }
  return sounds
}

export const getLuoTimeString = ({date:date=new Date}={}) => {

  return getLuoSoundsForTime({date:date=new Date()}).join(' ') + '.'
}

export const getLuoSoundsForTime = ({date:date=new Date()}={}) => {
  let timeSounds = []

  const africanHours = getAfricanHours(date.getHours())
  const minutes = date.getMinutes()
  
  timeSounds.push(IT_IS__PHRASE)

  const hoursSounds = getLuoSoundsForNumber({number:africanHours})
  timeSounds.push(...hoursSounds)

  timeSounds.push(AND__PHRASE)

  const minutesSounds = getLuoSoundsForNumber({number:minutes})
  timeSounds.push(...minutesSounds)

  return timeSounds
}

