import styles from "./styles.module.scss";

import { useEffect, useState } from "react";

import { IWord } from "../../../types/types";
import DataLoader from "../services/loader";
import playFetchedAudio from "../helpers/playFetchedAudio";
import fetchImage from "../helpers/fetchedImage";

import Header from "../../../components/Header";
import Main from "../../../components/Main";
import Loader from "../components/Loader";
import GameProgress from "../components/GameProgress";
import GameField from "../components/_GameField";

import { Button } from "antd/lib/radio";
import Speaker from "../components/Speaker";

const AudioCall = () => {
  const [pageOfWords, setPageOfWords] = useState<Array<IWord>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");
  const [currentWordNum, setCurrentWordNum] = useState(0);

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
      }
    }
    fetchData();
  }, []);

  const getImage = async (word: IWord) => {
    const imageURL = await fetchImage(word);
    if (imageURL) {
      setImageSrc(imageURL);
    }
  };

  const startHandler = () => {
    if (!isLoading && imageSrc === "") {
      playFetchedAudio(pageOfWords[0]);
      getImage(pageOfWords[0]);
    }
  };

  return (
    // <>
    //   <Button type="primary" onClick={startHandler}>
    //     start
    //   </Button>
    //   <img src={imageSrc ? `${imageSrc}` : ""} alt="" />
    // </>

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
            <Speaker size={"big"} />
          </div>
        </>
      </Main>
    </div>
  );
};
export default AudioCall;
