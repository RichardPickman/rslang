import styles from "./styles.module.scss";

import { useEffect, useState } from "react";

import { IWord } from "../../../types/types";
import DataLoader from "../services/loader";

import Header from "../../../components/Header";
import Main from "../../../components/Main";
import Loader from "../components/Loader";
import GameProgress from "../components/GameProgress";
import AnswersBlock from "../components/AnswersBlock";
import ImageBlock from "../components/ImageBlock";
import GameModal from "../components/GameModal";

import playFetchedAudio from "../helpers/playFetchedAudio";
import fetchImage from "../helpers/fetchedImage";
import random from "../helpers/random";
import shuffle from "../helpers/shuffle";
import playSound from "../helpers/platSound";

import { wordsPerPage } from "../../../data/constants";

import { Button, Radio, RadioChangeEvent, Card } from "antd";

import Speaker from "../components/Speaker";

const correct = require("../assets/sound/correct.mp3");
const wrong = require("../assets/sound/wrong.mp3");

const AudioCall = () => {
  const [pageOfWords, setPageOfWords] = useState<Array<IWord>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");
  const [currentWordNum, setCurrentWordNum] = useState(0);
  const [playButton, setPlayButton] = useState("hello");
  const [gameStatus, setGameStatus] = useState("pending");
  const [answers, setAnswers] = useState<Array<any>>([]);
  const [correctW, setCorrectW] = useState<Array<IWord>>([]);
  const [wrongW, setWrongW] = useState<Array<IWord>>([]);
  const [disable, setDisable] = useState(false);
  const [correctLine, setCorrectLine] = useState(
    new Array(wordsPerPage).fill(0)
  );
  const [wordsInGame, setWordsInGame] = useState(wordsPerPage);
  const [setting, setSetting] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const page = await DataLoader.getWords();
        setPageOfWords(page);
      } catch (error) {
        throw new Error("Error");
      } finally {
        setIsLoading(false);
        setPlayButton("Start");
      }
    }
    fetchData();
  }, []);

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
    const butts = document.querySelectorAll(
      "[data-id]"
    ) as NodeListOf<HTMLElement>;
    butts.forEach((el) => (el.style.color = "black"));
  };

  const longLine = () => {
    return correctLine.sort()[correctLine.length - 1];
  };

  // Events handlers

  useEffect(() => {
    document.addEventListener<"keydown">("keydown", handleKeyDownAnswer);
    return () => {
      document.removeEventListener("keydown", handleKeyDownAnswer);
    };
  }, [pageOfWords, currentWordNum, playButton]);

  const handleKeyDownAnswer = (e: KeyboardEvent) => {
    if (playButton === "Next") {
      return;
    }

    const element = document.querySelector(
      `[data-num="${e.key}"]`
    ) as HTMLElement;
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
  const init = () => {
    if (!isLoading && wordsPerPage !== pageOfWords.length) {
      setCorrectLine(new Array(pageOfWords.length).fill(0));
      setWordsInGame(pageOfWords.length);
    }
  };

  const gamePlay = () => {
    init();
    if (currentWordNum >= 3) {
      setGameStatus(() => "end");
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
    // setCurrentWordNum(() => currentWordNum + 1);
  };
  const mock = () => {};

  const [group, setGroup] = useState(1);
  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio checked", value);
    setGroup(value);
    setSetting(false);
  };

  const options = [
    { label: "Group1", value: 1 },
    { label: "Group2", value: 2 },
    { label: "Group3", value: 3 },
    { label: "Group4", value: 4 },
    { label: "Group5", value: 5 },
    { label: "Group6", value: 6 },
  ];

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      <Header />
      <Main>
        <>
          {setting && (
            <div className={styles.field}>
              <Card style={{ width: 300 }}>
                <Radio.Group
                  options={options}
                  onChange={onChange3}
                  value={group}
                  optionType="button"
                />
              </Card>
            </div>
          )}
          {gameStatus !== "end" && !setting && (
            <>
              <GameProgress
                pageOfWords={pageOfWords}
                currentWordNum={currentWordNum}
              />

              <div className={styles["field"]}>
                <ImageBlock imageSrc={imageSrc} />
                <Speaker
                  size={gameStatus === "pressed" ? "small" : "big"}
                  word={pageOfWords[currentWordNum - 1]}
                />
                <AnswersBlock
                  pageOfWords={pageOfWords}
                  answers={answers}
                  checkAnswer={HandleClickAnswer}
                  disable={disable}
                />
                <Button type="default" onClick={!isLoading ? gamePlay : mock}>
                  {playButton}
                </Button>
              </div>
            </>
          )}
          {gameStatus === "end" && (
            <GameModal
              correctW={correctW.filter(Boolean)}
              wrongW={wrongW.filter(Boolean)}
              correctLine={longLine()}
            />
          )}
        </>
      </Main>
    </div>
  );
};
export default AudioCall;
