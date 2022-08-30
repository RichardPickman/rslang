import styles from "./styles.module.scss";

import icon_speak from "../../assets/img/icon_speak.svg";
import { IWord } from "../../../../types/types";

const Speaker = ({ size, word }: { size: string; word: IWord | null }) => {
  const _wrap = styles[`${size}-speaker`],
    _icon = styles[`${size}-icon-speak`];

  return (
    <div className={styles.wrapper}>
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
