import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import TextbookService from "../../../services/textbookService";
import { DisplayedWord, IWord } from "../../../types/types";
import { fetchAllAudio } from "../utils/fetchAllAudio";

interface useSelectWordArgs {
  selectedWord: DisplayedWord | null,
}

interface useSelectWordReturnValue {
  context: AudioContext | null,
  audioWord: AudioBuffer | null,
  audioExample: AudioBuffer | null,
  audioMeaning: AudioBuffer | null,
  imageSrc: string | null,
  isLoading: boolean | null,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
};
export const useSelectWord = ({ selectedWord }: useSelectWordArgs): useSelectWordReturnValue => {

  const [imageSrc, setImageSrc] = useState() as [string, Dispatch<SetStateAction<string>>];
  const [audioWord, setAudioWord] = useState() as [AudioBuffer, Dispatch<SetStateAction<AudioBuffer>>];
  const [audioMeaning, setAudioMeaning] = useState() as [AudioBuffer, Dispatch<SetStateAction<AudioBuffer>>];
  const [audioExample, setAudioExample] = useState() as [AudioBuffer, Dispatch<SetStateAction<AudioBuffer>>];

  const [isLoading, setIsLoading] = useState(true);
  let contextRef = useRef(null) as MutableRefObject<AudioContext | null>;

  useEffect(() => {
    let isActualFetch = true;
    contextRef.current = new AudioContext();
    const fetchImg = async () => {
      const imageObjectURL = await TextbookService.getImage({ url: (selectedWord as DisplayedWord).word.image });
      if (isActualFetch) {
        setImageSrc(imageObjectURL);
      }
    }
    const fetchData = () => {
      const imagePromise = fetchImg();
      const audioPromise = fetchAllAudio({
        context: contextRef.current as AudioContext,
        audioWordUrl: (selectedWord as DisplayedWord).word.audio,
        audioMeaningUrl: (selectedWord as DisplayedWord).word.audioMeaning,
        audioExampleUrl: (selectedWord as DisplayedWord).word.audioExample,
      })
        .then((audio) => {
          if (isActualFetch) {
            const allAudio = [setAudioWord, setAudioMeaning, setAudioExample];
            for (let key in audio) {
              let index = Number(key);
              allAudio[index](audio[key]);
            }
          }
        });
      Promise.allSettled([imagePromise, audioPromise]).then(() => {
        setIsLoading(false);
      })
    }
    if (selectedWord) {
      setIsLoading(true);
      fetchData();
    }
    return () => {
      isActualFetch = false;
      contextRef.current?.close();
    }
  }, [selectedWord]);
  if (!selectedWord) {
    return {
      context: null,
      audioWord: null,
      audioExample: null,
      audioMeaning: null,
      imageSrc: null,
      isLoading: null,
      setIsLoading,
    }
  } else return {
    context: contextRef.current,
    audioWord,
    audioExample,
    audioMeaning,
    imageSrc,
    isLoading,
    setIsLoading,
  }
}