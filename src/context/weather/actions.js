import { useCallback } from 'react';
import useAPI from '../../service/api';

export const TYPES = {
  SEARCH_WEATHER: 'SEARCH_WEATHER',
  SEARCH_LOCATION: 'SEARCH_LOCATION',
  I18N: 'I18N',
};

export function useActionCreator(dispatch) {
  const { searchWeather, searchLocation } = useAPI(
    dispatch,
    'https://www.metaweather.com/api',
  );

  const onTrans = useCallback(
    (trans) =>
      Promise.resolve(
        dispatch({
          type: TYPES.I18N,
          trans,
        }),
      ),
    [],
  );

  const onSearchLocation = useCallback(
    (query) =>
      !query
        ? Promise.resolve(
            dispatch({
              type: TYPES.SEARCH_LOCATION,
              locations: [],
            }),
          )
        : searchLocation(query).then((data) =>
            Promise.resolve(
              dispatch({
                type: TYPES.SEARCH_LOCATION,
                locations: data,
              }),
            ),
          ),
    [],
  );

  const onSearchWeather = useCallback(
    (woeid) =>
      searchWeather(woeid).then((data) =>
        Promise.resolve(
          dispatch({
            type: TYPES.SEARCH_WEATHER,
            weather: data,
          }),
        ),
      ),
    [],
  );

  return {
    onTrans,
    onSearchLocation,
    onSearchWeather,
  };
}
