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
// import MiniStatistics from "../components/MiniStatistics";
import GameModal from "../components/GameModal";

import playFetchedAudio from "../helpers/playFetchedAudio";
import fetchImage from "../helpers/fetchedImage";
import random from "../helpers/random";
import shuffle from "../helpers/shuffle";
import playSound from "../helpers/platSound";

import { Button } from "antd";
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
  // const [speaks, setSpeaks] = useState("");
  const [answers, setAnswers] = useState<Array<any>>([]);
  const [correctW, setCorrectW] = useState<Array<IWord>>([]);
  const [wrongW, setWrongW] = useState<Array<IWord>>([]);
  const [disable, setDisable] = useState(false);

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

  const formAnswers = () => {
    let answersNum = [currentWordNum];
    while (answersNum.length < 4) {
      const candidate = random(0, 20 - 1);

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

  const checkAnswer = (e: Event) => {
    getImage(pageOfWords[currentWordNum - 1]);
    setGameStatus("pressed");
    setPlayButton("Next");
    setGameStatus("pressed");
    setDisable(true);

    const element = e.currentTarget as HTMLElement;

    if (
      pageOfWords[currentWordNum - 1].id === element.getAttribute("data-id")
    ) {
      element.style.color = "green";
      playSound(correct);
      setCorrectW([...correctW, pageOfWords[currentWordNum]]);
    } else {
      element.style.color = "red";
      playSound(wrong);
      setWrongW([...wrongW, pageOfWords[currentWordNum]]);
    }
  };

  const gamePlay = () => {
    if (currentWordNum === 20) {
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
    setCurrentWordNum(() => currentWordNum + 1);
  };

  const mock = () => {};

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      <Header />
      <Main>
        <>
          <GameProgress
            pageOfWords={pageOfWords}
            currentWordNum={currentWordNum}
          />
          <div className={styles["field"]}>
            <ImageBlock imageSrc={imageSrc} />
            <Speaker
              size={gameStatus === "pressed" ? "small" : "big"}
              word={pageOfWords ? pageOfWords[currentWordNum - 1] : null}
            />
            <AnswersBlock
              pageOfWords={pageOfWords}
              answers={answers}
              checkAnswer={checkAnswer}
              disable={disable}
            />
            <Button type="default" onClick={!isLoading ? gamePlay : mock}>
              {playButton}
            </Button>
          </div>
          {}
          {gameStatus === "end" &&  <GameModal correctW={correctW} wrongW={wrongW} />}
        </>
      </Main>
    </div>
  );
};
export default AudioCall;
