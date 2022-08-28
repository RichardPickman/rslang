import { ErrorsEnum } from "../types/types";

export const baseURL = " https://shark-app-ae5lx.ondigitalocean.app";
export const baseSchoolURL = "https://react-learnwords-example.herokuapp.com";

interface FetchRequest {
  url: string;
  method: string;
  searchParams?: {
    [key: string]: string;
  },
  headers?: {
    [key: string]: string;
  },
  body?: BodyInit,
  withCredentials?: boolean,
}

export const makeURL = (request: FetchRequest): string => {
  const resultURL = new URL(`${baseSchoolURL}/${request.url}`);;
  if (request.searchParams) {
    const entries = Object.entries(request.searchParams);
    entries.forEach((entry) => {
      const [key, value] = entry;
      resultURL.searchParams.append(key, value);
    });
  }
  return resultURL.toString();
}

const handleResponse = (response: Response): Response => {
  if (!response.ok) {
    switch (response.status) {
      case Number(ErrorsEnum.UNAUTHORIZED): {
        throw new Error(ErrorsEnum.UNAUTHORIZED)
      }
      case Number(ErrorsEnum.EMAIL_EXISTS): {
        throw new Error(ErrorsEnum.EMAIL_EXISTS)
      }
      case Number(ErrorsEnum.INCORRECT_VALUES): {
        throw new Error(ErrorsEnum.INCORRECT_VALUES)
      }
      default: {
        throw new Error(`Ooops! ${response.status} ${response.statusText}`);
      }
    }
  };
  return response;
};

export function load<T>(request: FetchRequest): Promise<T> {
  const fetchUrl = makeURL(request);
  return fetch(fetchUrl, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  })
    .then((response) => handleResponse(response))
    .then((res): Promise<T> => res.json())
    .then((data) => data)
    .catch((error: Error) => { 
      throw new Error(error.message); });
}
