import { IWord } from '../types/types';
import { load, baseURL } from './loader';

interface getWordsParams {
  group: string,
  page?: string,
}

interface getAudioParams {
  url: string,
  context: AudioContext,
}

interface getImgParams {
  url: string,
}

class TextbookService {
  static async getWords({group, page}: getWordsParams): Promise<IWord[]> {
    return load<IWord[]>({
      url: 'words',
      method: 'GET',
      searchParams: {
        group,
        page: page || ''
      }
    });
  }

  static async getAudio({url, context}: getAudioParams): Promise<AudioBuffer>{
    return fetch(`${baseURL}/${url}`)
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
  }

  static async getImage({url}: getImgParams): Promise<string>{
    return fetch(`${baseURL}/${url}`)
    .then((data) => {
      return data.blob();
    })
    .then((imageBlob) =>  URL.createObjectURL(imageBlob))
  }
}

export default TextbookService;