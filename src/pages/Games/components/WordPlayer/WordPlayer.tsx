import speak_icon from '../../assets/img/icon_speak.svg'
import playFetchedAudio from '../../helpers/playFetchedAudio';
import { IWord } from '../../../../types/types';
import styles from './styles.module.scss'

const WordPlayer = ({word}: {word: IWord}) => {
  
  
  const playHandler = ()=> {
    console.log('playHandler');
    playFetchedAudio(word)
    
  }
  return (
    <div className={styles['wrapper']}>
      <div className={styles['round-block']}>
        <img onClick={playHandler} className={styles['icon-speak']} src={speak_icon} alt="speak" />
      </div>
      <span className={styles['english-word']}>{word.word}</span> <span className={styles['english-word']}> {` - `} </span > <span className={styles['russian-word']}>{word.wordTranslate}</span>
    </div>
  )
}
export default WordPlayer