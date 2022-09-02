import styles from "./styles.module.scss";

import icon_speak from "../../assets/img/icon_speak.svg";
import { IWord } from "../../../../../../types/types";
import playFetchedAudio from "../../helpers/playFetchedAudio";

const Speaker = ({ size, word }: { size: string; word: IWord }) => {
  const _wrap = styles[`${size}-speaker`],
    _icon = styles[`${size}-icon-speak`];
const sayWord = () => {
 if (!word) {
  return
 }
  playFetchedAudio(word)
}

  return (
    <div className={styles.wrapper} onClick={sayWord}>
      <div className={`${_wrap}`}>
        <img className={_icon} src={icon_speak} alt="speak" />
      </div >
      <div className={styles['english-word']}>
      {word && size === 'small' ? word.word : ''}

      </div>
    </div>
  );
};
export default Speaker;
