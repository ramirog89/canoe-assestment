import { ENV } from '../../constants';

export const useFetch = () => {
  const request = async (
    url: string,
    options: { method: string; headers?: any; body?: any } = { method: 'GET', headers: {} },
  ) => {
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(
        `${ENV.API.BASE_URL}${url}`,
        {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options.headers,
          },
        }
      );

      const parseResponse = await response.json();

      if (parseResponse.error) {
        throw new Error(parseResponse.error);
      }

      if (parseResponse.detail) {
        throw new Error(parseResponse.detail);
      }

      return parseResponse;
    } catch (e: any) {
      throw e;
    }
  };

  return { request };
}
