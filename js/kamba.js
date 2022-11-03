import {getAfricanHours, getSoundsUrls} from './utils.js'

const ZERO_TO_TEN__ONES = ['ki', 'imwe', 'ili', 'itatu', 'inya', 'itano', 'thanzatu', 'mwonza', 'nyanya', 'kenda', 'ikumi']
const AND__PHRASE = 'na'
const TENS__PHRASE = 'miongo'

const IT_IS__PHRASE = 'ni saa'

const TWO__FOR_TENS = 'ili_withMiongoTone'
const ONE__FOR_HOURS = 'umwe'
const SIX__FOR_HOURS = 'sita'
const TEN__FOR_HOURS = 'kumi'
const FOUR__FOR_TENS = 'ina'

const MINUTE_PHRASE = 'datika'

export const KAMBA_AUDIO_FOLDER = 'sounds/kamba'

const ALL_SOUNDS = [...ZERO_TO_TEN__ONES, AND__PHRASE, TENS__PHRASE, IT_IS__PHRASE, TWO__FOR_TENS, ONE__FOR_HOURS, SIX__FOR_HOURS, TEN__FOR_HOURS, FOUR__FOR_TENS, MINUTE_PHRASE]

const getKambaSoundsForNumber = ({number:number=0, isHours:isHours=false}={}) => {
  
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

  if (numberOfTens === 4) {
    sounds.push(FOUR__FOR_TENS)
  }

  if (numberOfTens > 1 && numberOfTens !== 4 && numberOfTens !== 2) {
    sounds.push(ZERO_TO_TEN__ONES[numberOfTens])
  }

  if (number > 10 && numberOfOnes > 0 && number) {
    sounds.push(AND__PHRASE)
    if (numberOfOnes === 1 && isHours) sounds.push(ONE__FOR_HOURS)

    else sounds.push(ZERO_TO_TEN__ONES[numberOfOnes])
  }

  return sounds
}

export const getKambaTimeString = ({date:date=new Date()}={})=>{
  
  let sounds = getKambaSoundsForTime({date:date})
  
  sounds = sounds.map(sound =>{
    if(sound.indexOf('_')>-1) return sound.slice(0, sound.indexOf("_"));
    else return sound
  })
  
  return sounds.join(' ')+'.'
}

export const getKambaSoundsForTime = ({date:date=new Date()}={}) =>{
  const minutes = date.getMinutes()
  const hours = getAfricanHours(date.getHours())
  
  if(!minutes)return [IT_IS__PHRASE, ...getKambaSoundsForNumber({number:hours, isHours:true}), ...getKambaSoundsForNumber({number:minutes})]
  
  return [IT_IS__PHRASE, ...getKambaSoundsForNumber({number:hours, isHours:true}),AND__PHRASE, MINUTE_PHRASE, ...getKambaSoundsForNumber({number:minutes})]
}

