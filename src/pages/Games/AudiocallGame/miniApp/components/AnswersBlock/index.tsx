import { Button } from "antd";
import { IWord } from "../../../../../../types/types";

import styles from "./styles.module.scss";

const AnswersBlock = ({
  pageOfWords,
  answers,
  checkAnswer,
  disable,
}: {
  pageOfWords: Array<IWord>;
  answers: Array<any>;
  checkAnswer: any;
  disable: boolean;
}) => {
  return (
    <div className={styles["back"]}>
      {answers.map((answerNum, index) => {
        return (
          <Button
            disabled={disable}
            key={pageOfWords[answerNum]["id"]}
            type="ghost"
            data-id={pageOfWords[answerNum].id}
            data-num={index+1}
            data-w={pageOfWords[answerNum].word}
            onClick={checkAnswer}
            style={{color: 'black'}}
          >
            {`${index + 1}  ${pageOfWords[answerNum]["wordTranslate"]}`}
          </Button>
        );
      })}
    </div>
  );
};
export default AnswersBlock;
