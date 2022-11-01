export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

interface IEndpointObj {
  url: string;
  auth: boolean;
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return {};
  }

  return response ? response.json().then(res => res) : {};
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response);
  }

  const error = new ResponseError(response);
  error.response = response;
  console.error(error);
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
async function request(
  endpointObj: IEndpointObj,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  options?: RequestInit,
): Promise<{} | { error: ResponseError }> {
  const API_HOST = 'https://myfakeapi.com';
  const { url } = endpointObj;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const fetchResponse = await fetch(API_HOST + url, {
    ...options,
    method: method,
    headers: { ...options?.headers, ...headers },
  });

  const response = checkStatus(fetchResponse) || {};
  return response;
}

const requestObject = {
  get: (endpointObj: IEndpointObj, options?: any) =>
    request(endpointObj, 'GET', options),
  post: (endpointObj: IEndpointObj, options: any) =>
    request(endpointObj, 'POST', {
      ...options,
      body: options?.body ? JSON.stringify(options.body) : null,
    }),
  put: (endpointObj: IEndpointObj, options: any) =>
    request(endpointObj, 'PUT', {
      ...options,
      body: options?.body ? JSON.stringify(options.body) : null,
    }),
  delete: (endpointObj: IEndpointObj, options?: any) =>
    request(endpointObj, 'DELETE', options),
};

export default requestObject;
