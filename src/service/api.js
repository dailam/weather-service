import { makeHttpClient } from './factory';

const ApiPath = 'api/web/v1/';

const useAPI = (dispatcher, rootPath = ApiPath) => {
  const { getJSON } = makeHttpClient({
    baseUrl: rootPath,
    csrfToken: null,
    dispatcher,
  });

  const searchLocation = (query) => getJSON(`api/location/search`, { query });
  const searchWeather = (woeid) => getJSON(`api/location/${woeid}`);
  return {
    searchWeather,
    searchLocation,
  };
};

export default useAPI;
