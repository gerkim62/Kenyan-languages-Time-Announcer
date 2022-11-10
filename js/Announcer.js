import { getEnglishSoundsForTime, getEnglishTimeString, ENGLISH_AUDIO_FOLDER } from './english.js'

import { getMeruSoundsForTime, getMeruTimeString, MERU_AUDIO_FOLDER } from './meru.js'


import { getKambaSoundsForTime, getKambaTimeString, KAMBA_AUDIO_FOLDER } from './kamba.js'

import { getKalenjinSoundsForTime, getKalenjinTimeString, KALENJIN_AUDIO_FOLDER } from './kalenjin.js'

import { getLuoSoundsForTime, getLuoTimeString, LUO_AUDIO_FOLDER } from './luo.js'

import { getGiriamaSoundsForTime, getGiriamaTimeString, GIRIAMA_AUDIO_FOLDER } from './giriama.js'

import { getSoundsUrls, playSounds } from './utils.js'
import { AUDIO_FORMART } from './main.js'

export default class Announcer {
  constructor({ language: language }) {
    this.language = language


  }
  announce({ volume: volume = 1, playbackRate: playbackRate = 1, date: date = new Date() } = {}) {
    let soundsUrls, sounds, timeString
    switch (this.language) {
      case 'kalenjin':
        sounds = getKalenjinSoundsForTime({ date: date })
        soundsUrls = getSoundsUrls({ sounds: sounds, folder: KALENJIN_AUDIO_FOLDER, formart: AUDIO_FORMART })
        timeString = getKalenjinTimeString({ date })
        break
      case 'kamba':
        sounds = getKambaSoundsForTime({ date: date })
        soundsUrls = getSoundsUrls({ sounds: sounds, folder: KAMBA_AUDIO_FOLDER, formart: AUDIO_FORMART })
        timeString = getKambaTimeString({ date })
        break
      case 'english':
        sounds = getEnglishSoundsForTime({ date: date })
        soundsUrls = getSoundsUrls({ sounds: sounds, folder: ENGLISH_AUDIO_FOLDER, formart: AUDIO_FORMART })
        timeString = getEnglishTimeString({ date })
        break;
      case 'luo':
        sounds = getLuoSoundsForTime({ date: date })
        soundsUrls = getSoundsUrls({ sounds: sounds, folder: LUO_AUDIO_FOLDER, formart: AUDIO_FORMART })
        timeString = getLuoTimeString({ date })
        break;
      case 'giriama':
        sounds = getGiriamaSoundsForTime({ date: date })
        soundsUrls = getSoundsUrls({ sounds: sounds, folder: GIRIAMA_AUDIO_FOLDER, formart: AUDIO_FORMART })
        timeString = getGiriamaTimeString({ date })
        break;
      case 'meru':
        sounds = getMeruSoundsForTime({ date: date })
        soundsUrls = getSoundsUrls({ sounds: sounds, folder: MERU_AUDIO_FOLDER, formart: AUDIO_FORMART })
        timeString = getMeruTimeString({ date })
        break;
      default:
        console.log('language not recognized', this.language)

    }
    return playSounds({ soundsUrls: soundsUrls, playbackRate: playbackRate, volume: volume, timeString: timeString })

  }




}
