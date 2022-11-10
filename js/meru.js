import { getAfricanHours, getSoundsUrls } from './utils.js'

const ZERO_TO_TEN__ONES = ['ciongwa', 'imwe', 'iyili', 'ithatu', 'inya', 'ithano', 'ithanthatu', 'muanja', 'inyanya', 'kenda', 'ikumi']
const AND__PHRASE = 'na'
const TENS__PHRASE = 'mirongo'

const IT_IS__PHRASE = 'i thaa'
const TWO__FOR_TENS = 'ili_withMirongoTone'

const THREE__FOR_TENS = 'ithatu_withMirongoTone'

const ONE__FOR_HOURS = 'imwe'

const SIX__FOR_HOURS = 'thita'
const TEN__FOR_HOURS = 'kumi'
const FOUR__FOR_TENS = 'ina'

const FIVE__FOR_TENS = 'itano'

const MINUTE_PHRASE = 'ndaika'

export const MERU_AUDIO_FOLDER = 'sounds/meru'

const getMeruSoundsForNumber = ({ number: number = 0, isHours: isHours = false } = {}) => {

  const sounds = []

  const numberOfTens = Math.floor(number / 10)
  const numberOfOnes = number - numberOfTens * 10
  if (number <= 10 && number !== 1 && number !== 6 && number !== 10) {
    sounds.push(ZERO_TO_TEN__ONES[number])

  }

  if (number === 1 && isHours) sounds.push(ONE__FOR_HOURS)

  if (number === 1 && !isHours) sounds.push(ZERO_TO_TEN__ONES[number])



  if (number === 10 && isHours) sounds.push(TEN__FOR_HOURS)
  if (number === 10 && !isHours) sounds.push(ZERO_TO_TEN__ONES[number])

  if (number === 6 && isHours) sounds.push(SIX__FOR_HOURS)
  if (number === 6 && !isHours) sounds.push(ZERO_TO_TEN__ONES[number])

  if (number < 20 && number > 12) {
    sounds.push(ZERO_TO_TEN__ONES[10])
  }

  if (number <= 12 && number > 10 && !isHours) sounds.push(ZERO_TO_TEN__ONES[10])

  if (number <= 12 && number > 10 && isHours) sounds.push(TEN__FOR_HOURS)



  if (number >= 20) {
    sounds.push(TENS__PHRASE)
  }

  if (numberOfTens === 2) {
    sounds.push(TWO__FOR_TENS)

  }
  
  if (numberOfTens === 3) {
    sounds.push(THREE__FOR_TENS)
  
  }

  if (numberOfTens === 4) {
    sounds.push(FOUR__FOR_TENS)
  }
  
    if (numberOfTens === 5) {
      sounds.push(FIVE__FOR_TENS)
    }

  if (numberOfTens > 1 && numberOfTens !== 3 && numberOfTens !==5 && numberOfTens !== 4 && numberOfTens !== 2) {
    sounds.push(ZERO_TO_TEN__ONES[numberOfTens])
  }

  if (number > 10 && numberOfOnes > 0 && number) {
    sounds.push(AND__PHRASE)
    if (numberOfOnes === 1 && isHours) sounds.push(ONE__FOR_HOURS)

    else sounds.push(ZERO_TO_TEN__ONES[numberOfOnes])
  }

  return sounds
}

export const getMeruTimeString = ({ date: date = new Date() } = {}) => {

  let sounds = getMeruSoundsForTime({ date: date })

  sounds = sounds.map(sound => {
    if (sound.indexOf('_') > -1) return sound.slice(0, sound.indexOf("_"));
    else return sound
  })

  return sounds.join(' ') + '.'
}

export const getMeruSoundsForTime = ({ date: date = new Date() } = {}) => {
  const minutes = date.getMinutes()
  const hours = getAfricanHours(date.getHours())

  if (!minutes) return [IT_IS__PHRASE, ...getMeruSoundsForNumber({ number: hours, isHours: true }), ...getMeruSoundsForNumber({ number: minutes })]

  return [IT_IS__PHRASE, ...getMeruSoundsForNumber({ number: hours, isHours: true }), AND__PHRASE, MINUTE_PHRASE, ...getMeruSoundsForNumber({ number: minutes })]
}
