import { IWord } from "../../../../../../types/types";
import styles from './styles.module.scss';

export const GameProgress = ({
  pageOfWords,
  currentWordNum,
}: {
  pageOfWords: Array<IWord>;
  currentWordNum: number;
}) => {
  return (
    <div
      className={styles.progress}
    >{`${currentWordNum} / ${pageOfWords.length}`}</div>
  );
};

export default GameProgress;
