import { base_url } from "../config/config";
import { IWord } from "../../../../../types/types";

const playFetchedAudio = async (word: IWord) => {
    const options = {
    method: "GET",
  };

  const ctx = new AudioContext();
  
   try {
      const response = await fetch(`${base_url}${word.audio}`, options);
      const buffer = await response.arrayBuffer();
      const decodedAudio = await ctx.decodeAudioData(buffer);
     
     const playSound = ctx.createBufferSource();
      playSound.buffer = decodedAudio;
      playSound.connect(ctx.destination)
      playSound.start(ctx.currentTime)
      } 

  catch (error) {
  }
}

export default playFetchedAudio