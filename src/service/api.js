import { makeHttpClient } from './factory';

const ApiPath = 'api/web/v1/';

const useAPI = (dispatcher, rootPath = ApiPath) => {
  const { getJSON } = makeHttpClient({
    baseUrl: rootPath,
    csrfToken: null,
    dispatcher,
  });

  const searchLocation = (query) =>
    getJSON(`location/search`, { query }, { crossDomain: true });
  const searchWeather = (woeid) =>
    getJSON(`location/${woeid}`, { crossDomain: true });
  return {
    searchWeather,
    searchLocation,
  };
};

export default useAPI;
