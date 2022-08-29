import { base_url } from '../config/config'
import { IWord } from '../../../types/types'

const playAudio = (word: IWord) => {
  
  const audio = new Audio(`${base_url}${word.audio}`)

  setTimeout(() => {
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          audio.currentTime = 0
          audio.play()
        })
        .catch((error) => {
          console.log('sound load error', error)
        })
    }
  }, 1000)
}

export default playAudio