import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import TextbookService from "../../../services/textbookService";
import { IWord } from "../../../types/types";
import { fetchAllAudio } from "../utils/fetchAllAudio";

interface useSelectWordArgs {
  selectedWord: IWord,
}
export const useSelectWord = ({ selectedWord }: useSelectWordArgs) => {
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
      const imageObjectURL = await TextbookService.getImage({ url: selectedWord.image });
      if (isActualFetch) {
        setImageSrc(imageObjectURL);
      }
    }
    const fetchData = () => {
      const imagePromise = fetchImg();
      const audioPromise = fetchAllAudio({
        context: contextRef.current as AudioContext,
        audioWordUrl: selectedWord.audio,
        audioMeaningUrl: selectedWord.audioMeaning,
        audioExampleUrl: selectedWord.audioExample,
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
    setIsLoading(true);
    fetchData();
    return () => {
      isActualFetch = false;
      contextRef.current?.close();
    }
  }, [selectedWord]);

  return {
    context: contextRef.current,
    audioWord, 
    audioExample, 
    audioMeaning, 
    imageSrc,
    isLoading
  } as {
    context: AudioContext | null,
    audioWord: AudioBuffer, 
    audioExample: AudioBuffer, 
    audioMeaning: AudioBuffer, 
    imageSrc: string,
    isLoading: boolean
  };
}