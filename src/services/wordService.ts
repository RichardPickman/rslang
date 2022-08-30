import { AggregatedWord, createUserWordParams, deleteUserWordParams, getAggregatedWordsParams, getAggregatedWordsResponse, IUserWord, updateUserWordParams } from "../types/types";
import { baseURL, load } from './loader';
import { IWord } from '../types/types';

interface getAggregatedWordParams { 
  userId: string, 
  token: string, 
  wordId: string,
 }

class WordService {
  static async createUserWord({ userId, wordId, body, token }: createUserWordParams): Promise<IUserWord> {
    return load<IUserWord>({
      url: `users/${userId}/words/${wordId}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
  }

  static async deleteUserWord({ userId, wordId, token }: deleteUserWordParams): Promise<Response> {
    return fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
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

  static async getUserWord({ userId, wordId, token }: { userId: string, wordId: string, token: string }): Promise<IUserWord> {
    return load<IUserWord>({
      url: `users/${userId}/words/${wordId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  static getAggregatedWords({ userId, token, filter, group='', page='' }: getAggregatedWordsParams): Promise<AggregatedWord[]> {
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

  static getAggregatedWord({ userId, token, wordId }: getAggregatedWordParams): Promise<AggregatedWord> {
    return load<AggregatedWord>({
      url: `users/${userId}/aggregatedWords/${wordId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response);
  }

  static async updateUserWord({ userId, wordId, body, token }: updateUserWordParams): Promise<IUserWord> {
    return load<IUserWord>({
      url: `users/${userId}/words/${wordId}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
  }
}

export default WordService;
