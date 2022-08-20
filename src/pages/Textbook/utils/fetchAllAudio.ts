import TextbookService from "../../../services/textbookService";

type IAudio = { [key: number]: AudioBuffer }
interface fetchAllAudioParams {
  context: AudioContext,
  audioWordUrl: string,
  audioExampleUrl: string,
  audioMeaningUrl: string,
}
export const fetchAllAudio = async ({ context, audioWordUrl, audioExampleUrl, audioMeaningUrl}:fetchAllAudioParams): Promise<IAudio> => {
  const decodedAudioWord = TextbookService.getAudio({ url: audioWordUrl, context });

  const decodedAudioMeaning =  TextbookService.getAudio({ url: audioMeaningUrl, context });

  const decodedAudioExample = TextbookService.getAudio({ url: audioExampleUrl, context });

  const result = await Promise.allSettled([decodedAudioWord, decodedAudioMeaning, decodedAudioExample ]);
  const audio: IAudio = {};
  result.forEach((r, index) => {
    if(r.status === 'fulfilled') {
      audio[index] = r.value;
    }
  });
 return audio;
}
