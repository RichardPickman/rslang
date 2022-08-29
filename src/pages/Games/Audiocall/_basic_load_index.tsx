import { useEffect, useState } from "react";
import { IWord } from "../../../types/types";
import Loader from "../services/loader";
import playFetchedAudio from "../helpers/playFetchedAudio";
import { Button } from "antd/lib/radio";

import fetchImage from "../helpers/fetchedImage";

const AudioCall = () => {
  const [pageOFWords, setPageOfWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const page = await Loader.getWords();
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
      playFetchedAudio(pageOFWords[0]);
      getImage(pageOFWords[0]);
    }
  };
  return (
    <>
      <Button type="primary" onClick={startHandler}>
        start
      </Button>
      <img src={imageSrc ? `${imageSrc}` : ""} alt="" />
    </>
  );
};
export default AudioCall;
