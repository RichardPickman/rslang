import styles from "./styles.module.scss";

import { useEffect, useState } from "react";
import { IWord } from "../../../types/types";
import Main from "../../../components/Main";

import GameProgress from "./miniApp/components/GameProgress";
import AnswersBlock from "./miniApp/components/AnswersBlock";
import ImageBlock from "./miniApp/components/ImageBlock";
import GameModal from "./miniApp/components/GameModal";

import playFetchedAudio from "./miniApp/helpers/playFetchedAudio";
import fetchImage from "./miniApp/helpers/fetchedImage";
import random from "./miniApp/helpers/random";
import shuffle from "./miniApp/helpers/shuffle";
import playSound from "./miniApp/helpers/platSound";

import { wordsPerPage } from "../../../data/constants";

import { Button, Radio, RadioChangeEvent, Card } from "antd";

import Speaker from "./miniApp/components/Speaker";
//----------outside
import Levels from "./miniApp/components/Levels/LevelsYA";

import { useLocation } from "react-router";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useActions } from "../../../hooks/useActions";
import { GameMode, GamePhase } from "../../../types/types";

const correct = require("./miniApp/assets/sound/correct.mp3");
const wrong = require("./miniApp/assets/sound/wrong.mp3");

const AudioCall = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [currentWordNum, setCurrentWordNum] = useState(0);
  const [playButton, setPlayButton] = useState("Start");
  const [gameStatus, setGameStatus] = useState("pending");
  const [answers, setAnswers] = useState<Array<any>>([]);
  const [correctW, setCorrectW] = useState<Array<IWord>>([]);
  const [wrongW, setWrongW] = useState<Array<IWord>>([]);
  const [disable, setDisable] = useState(false);
  const [correctLine, setCorrectLine] = useState(new Array(wordsPerPage).fill(0));
  const [wordsInGame, setWordsInGame] = useState(wordsPerPage);

  //-------outside
  const { phase, gameWords, fetchedWords, points } = useAppSelector((state) => state.game);
  const { setPhaseAction, setDailyStatistics, setUsedWords } = useActions();
  const { state } = useLocation();
  const { isAuth, user } = useAppSelector((state) => state.auth);

  // console.log( 'isAuth->',isAuth, 'user->', user);
  // console.log("state -> ", state);

  const pageOfWords = fetchedWords.slice(0, wordsPerPage);

  const correctProgress = () => {
    let _correctLine = [...correctLine];
    if (currentWordNum > 0 && _correctLine[currentWordNum - 1] > 0) {
      _correctLine[currentWordNum] = _correctLine[currentWordNum - 1] + 1;
    } else _correctLine[currentWordNum] = 1;
    setCorrectLine(_correctLine);
  };

  const CorrectWord = (element: HTMLElement) => {
    element.style.color = "green";
    playSound(correct);
    setCorrectW([...correctW, pageOfWords[currentWordNum]]);
    correctProgress();
  };

  const WrongWord = (element: HTMLElement) => {
    element.style.color = "red";
    playSound(wrong);
    setWrongW([...wrongW, pageOfWords[currentWordNum]]);
  };

  const formAnswers = () => {
    let answersNum = [currentWordNum];
    while (answersNum.length < 4) {
      const candidate = random(0, wordsInGame - 1);

      if (!answersNum.includes(candidate)) {
        answersNum.push(candidate);
      }
    }

    setAnswers(shuffle(answersNum));
  };

  const getImage = async (word: IWord) => {
    const imageURL = await fetchImage(word);
    if (imageURL) {
      setImageSrc(imageURL);
    }
  };

  const manageButtons = () => {
    const butts = document.querySelectorAll("[data-id]") as NodeListOf<HTMLElement>;
    butts.forEach((el) => (el.style.color = "black"));
  };

  const longLine = () => {
    return correctLine.sort()[correctLine.length - 1];
  };

  useEffect(() => {
    document.addEventListener<"keydown">("keydown", handleKeyDownAnswer);
    return () => {
      document.removeEventListener("keydown", handleKeyDownAnswer);
    };
  }, [pageOfWords, currentWordNum, playButton]);

  const handleKeyDownAnswer = (e: KeyboardEvent) => {
    if (playButton === "Next" || playButton === "Continue") {
      return;
    }

    const element = document.querySelector(`[data-num="${e.key}"]`) as HTMLElement;
    if (element !== null) {
      if (pageOfWords[currentWordNum].id === element.getAttribute("data-id")) {
        CorrectWord(element);
      } else {
        WrongWord(element);
      }
    }
    getImage(pageOfWords[currentWordNum]);
    setPlayButton("Next");
    setDisable(true);
    setGameStatus(() => "pressed");
    setCurrentWordNum(() => currentWordNum + 1);
  };

  const HandleClickAnswer = (e: Event) => {
    getImage(pageOfWords[currentWordNum]);
    setGameStatus("pressed");
    setPlayButton("Next");
    setDisable(true);

    const element = e.currentTarget as HTMLElement;

    if (pageOfWords[currentWordNum].id === element.getAttribute("data-id")) {
      CorrectWord(element);
    } else {
      WrongWord(element);
    }
    setCurrentWordNum(() => currentWordNum + 1);
  };
  const init = () => {};

  const gamePlay = () => {
    if (playButton === `I don't know`) {
      setCurrentWordNum(() => currentWordNum + 1);
      setPlayButton("Continue");
      return;
    }
    init();
    if (currentWordNum >= 3) {
      setPhaseAction(GamePhase.FINISHED);
      return;
    }
    playFetchedAudio(pageOfWords[currentWordNum]);
    setGameStatus("started");
    setImageSrc("");
    if (gameStatus === "pressed") {
      manageButtons();
    }

    setPlayButton(`I don't know`);
    setDisable(false);
    formAnswers();
  };

  return (
    <div className={styles.wrapper}>
      <Main>
        <>
          {phase === GamePhase.INIT && state === GameMode.MENU_GAME && <Levels />}
          {phase === GamePhase.STARTED && (
            <>
              <GameProgress pageOfWords={pageOfWords} currentWordNum={currentWordNum} />

              <div className={styles["field"]}>
                <ImageBlock imageSrc={imageSrc} />
                <Speaker size={gameStatus === "pressed" ? "small" : "big"} word={pageOfWords[currentWordNum - 1]} />
                <AnswersBlock
                  pageOfWords={pageOfWords}
                  answers={answers}
                  checkAnswer={HandleClickAnswer}
                  disable={disable}
                />
                <Button type='default' onClick={gamePlay}>
                  {playButton}
                </Button>
              </div>
            </>
          )}
          {phase === GamePhase.FINISHED && (
            <GameModal correctW={correctW.filter(Boolean)} wrongW={wrongW.filter(Boolean)} correctLine={longLine()} />
          )}
        </>
      </Main>
    </div>
  );
};
export default AudioCall;
