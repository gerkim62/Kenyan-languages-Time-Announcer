import {getAfricanHours} from './utils.js'

const ZERO_TO_TEN__ONES = ['kamili', 'mwenga', 'mbiri', 'tahu', 'ne', 'tsano', 'tandahu', 'fungahe', 'nane', 'chenda', 'kumi']
const AND__PHRASE = 'na'
const ZERO_TO_FIFTY__TENS = ['kamili', 'kumi', 'miri', 'mihahu', 'mine', 'mitsano']
const IT_IS__PHRASE = 'ni saa'
const TENS__PHRASE = 'mirongo'
const MINUTES__PHRASE = 'dakika'

export const GIRIAMA_AUDIO_FOLDER = 'sounds/giriama'

const getGiriamaSoundsForNumber = ({number:number}) => {
  const sounds = []

if(number <= 10){
  sounds.push(ZERO_TO_TEN__ONES[number])
  return sounds
}

  const numberOfTens = Math.floor(number / 10)
  const numberOfOnes = number - numberOfTens * 10
  
  if(number>=20)sounds.push(TENS__PHRASE)
  sounds.push(ZERO_TO_FIFTY__TENS[numberOfTens])

  if (numberOfOnes > 0) {
     sounds.push(AND__PHRASE)
     sounds.push(ZERO_TO_TEN__ONES[numberOfOnes])
  }
  return sounds
}

export const getGiriamaTimeString = ({date:date=new Date}={}) => {

  return getGiriamaSoundsForTime({date:date}).join(' ') + '.'
}

export const getGiriamaSoundsForTime = ({date:date=new Date()}={}) => {
  let timeSounds = []

  const africanHours = getAfricanHours(date.getHours())
  const minutes = date.getMinutes()
  
  timeSounds.push(IT_IS__PHRASE)

  const hoursSounds = getGiriamaSoundsForNumber({number:africanHours})
  timeSounds.push(...hoursSounds)
if(!minutes == 0){
  timeSounds.push(AND__PHRASE)
  timeSounds.push(MINUTES__PHRASE)
}
  const minutesSounds = getGiriamaSoundsForNumber({number:minutes})
  timeSounds.push(...minutesSounds)

  return timeSounds
}


var d = new Date("1970-01-01 12:59:00");
const currentDate =new Date()
console.log(getGiriamaTimeString({date:currentDate}))

