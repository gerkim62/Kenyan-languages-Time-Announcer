import {getKambaSoundsForTime, getKambaTimeString, KAMBA_AUDIO_FOLDER} from './kamba.js'
import { getKalenjinSoundsForTime, getKalenjinTimeString, KALENJIN_AUDIO_FOLDER } from './kalenjin.js'
import {getSoundsUrls, playSounds} from './utils.js'
import {AUDIO_FORMART} from './main.js'

export default class Announcer{
  constructor({language:language}){
    this.language = language
    
   
  }
  announce({volume:volume=1, playbackRate:playbackRate=1, date:date=new Date()}={}){
    let soundsUrls, sounds
    switch(this.language){
      case 'kamba':
         sounds = getKambaSoundsForTime({date:date})
        soundsUrls = getSoundsUrls({sounds:sounds,folder:KAMBA_AUDIO_FOLDER,formart:AUDIO_FORMART})
        break
      case 'kalenjin':
         sounds = getKalenjinSoundsForTime({ date: date })
        soundsUrls = getSoundsUrls({ sounds: sounds, folder: KALENJIN_AUDIO_FOLDER, formart: AUDIO_FORMART })
        break;
      default:
      
    }
  return playSounds({soundsUrls:soundsUrls,playbackRate:playbackRate, volume:volume})
  
  }
  
  
  
  
}
