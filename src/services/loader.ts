export const baseURL = "https://goldfish-app-cuxjk.ondigitalocean.app";

interface FetchRequest {
  url: string;
  method: string;
  searchParams?: {
    [key: string]: string;
  }
}

export const makeURL = (request: FetchRequest): string => {
  const resultURL = new URL(`${baseURL}/${request.url}`);;
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
  if (!response.ok) throw new Error(`Ooops! ${response.status} ${response.statusText}`);
  return response;
};

export function load <T>(request: FetchRequest): Promise<T> {
  const fetchUrl = makeURL(request);
  return fetch(fetchUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: request.method,
    // body: request.dataParams ? JSON.stringify(request.dataParams) : null,
  })
    .then((response) => handleResponse(response))
    .then((res): Promise<T> => res.json())
    .then((data) => data)
    .catch((error: Error) => { throw new Error(error.message); });
}
