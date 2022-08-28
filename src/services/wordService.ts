import { createUserWordParams, deleteUserWordParams, getAggregatedWordsParams, getAggregatedWordsResponse, IUserWord } from "../types/types";
import { baseSchoolURL, load } from './loader';
import { IWord } from '../types/types';

class WordService {
  static async createUserWord({ userId, wordId, word, token }: createUserWordParams): Promise<IUserWord> {
    return load<IUserWord>({
      url: `users/${userId}/words/${wordId}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word),
    })
  }

  static async deleteUserWord({ userId, wordId, token }: deleteUserWordParams): Promise<Response> {
    return fetch(`${baseSchoolURL}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .catch((error) => { throw new Error(error); });
  }

  static async getUserWords({ userId, token }: { userId: string, token: string }): Promise<IUserWord[]> {
    return load<IUserWord[]>({
      url: `users/${userId}/words`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  static getAggregatedWords({ userId, token, filter, group='', page='' }: getAggregatedWordsParams): Promise<IWord[]> {
    return load<getAggregatedWordsResponse>({
      url: `users/${userId}/aggregatedWords`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      searchParams: {
        filter,
        group,
        page,
      }
    })
      .then((response) => response[0].paginatedResults);
  }
}

export default WordService;
