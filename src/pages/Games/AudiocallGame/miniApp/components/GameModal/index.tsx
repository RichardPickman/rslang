// import PlayAgainButton from '../PlayAgainButton/PlayAgainButton'
import styles from "./styles.module.scss";
import WordPlayer from "../WordPlayer/WordPlayer";
import { IWord } from "../../../../../../types/types";
import { GameMode, GamePhase } from "../../../../../../types/types";
import { useActions } from "../../../../../../hooks/useActions";
import { RouteNames } from "../../../../../../router";
import { useNavigate } from "react-router-dom";

const GameModal = (props: any) => {
  const { correctW, wrongW, correctLine } = props;
  const { setPhaseAction, setDailyStatistics, setUsedWords } = useActions();
  const navigate = useNavigate();
  const closeHandler = () => {
    console.log("click");
    setPhaseAction(GamePhase.INIT);
    navigate(`${RouteNames.GAMES}`);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles["flex-block-around"]}>
          <div className={styles.header}>Результаты</div>
          {/* <PlayAgainButton link="/audiocall" /> */}
        </div>
        <div>{`Правильно: ${correctW.length}`}</div>
        <div>{`Ошибок: ${wrongW.length}`}</div>
        <div>{`Пропущено: ${20 - correctW.length - wrongW.length}`}</div>
        <div>Вы повторили {correctW.length + wrongW.length}</div>

        <div className={styles.close} onClick={closeHandler}>
          X
        </div>

        <div className={styles["sub-header"]}>Верно</div>
        <div>
          {correctW.map((el: IWord) => (
            <WordPlayer key={el.id} word={el} />
          ))}
        </div>
        <div className={styles["sub-header"]}>Не верно</div>
        <div>
          {wrongW.map((el: IWord) => (
            <WordPlayer key={el.id} word={el} />
          ))}
        </div>
        <div>Cерия ответов: {correctLine}</div>
      </div>
    </div>
  );
};
export default GameModal;
