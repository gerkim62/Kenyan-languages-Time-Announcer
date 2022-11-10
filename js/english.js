const ZERO_TO_TWENTY = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty']

const ZERO_TO_FIFTY__TENS = ['zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty']
const IT_IS__PHRASE = 'it is'
const OCLOCK = "O'clock"

export const ENGLISH_AUDIO_FOLDER = 'sounds/english'

const getEnglishSoundsForNumber = ({ number: number, isHours:isHours=false }) => {
   const sounds = []
   if(number === 0 && !isHours) return sounds

  const numberOfTens = Math.floor(number / 10)
  const numberOfOnes = number - numberOfTens * 10
  if (number <= 20) {
    sounds.push(ZERO_TO_TWENTY[number])
    return sounds
  }
  if (numberOfTens > 1) sounds.push(ZERO_TO_FIFTY__TENS[numberOfTens])

  if (numberOfOnes > 0) sounds.push(ZERO_TO_TWENTY[numberOfOnes])
  
  return sounds
}

export const getEnglishTimeString = ({ date: date = new Date } = {}) => {

  return getEnglishSoundsForTime({ date: date = new Date() }).join(' ') + '.'
}

export const getEnglishSoundsForTime = ({ date: date = new Date() } = {}) => {
  let timeSounds = []

  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  
  timeSounds.push(IT_IS__PHRASE)

  const hoursSounds = getEnglishSoundsForNumber({ number: hours })
  timeSounds.push(...hoursSounds)

  

  const minutesSounds = getEnglishSoundsForNumber({ number: minutes })
  timeSounds.push(...minutesSounds)
  
  //timeSounds.push(OCLOCK)
    

  return timeSounds
}

console.log(getEnglishTimeString())