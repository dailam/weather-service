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
    'https://www.metaweather.com',
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
    () =>
      searchLocation().then(({ ...data }) =>
        Promise.resolve(
          dispatch({
            type: TYPES.SEARCH_LOCATION,
            location: data,
          }),
        ),
      ),
    [],
  );

  const onSearchWeather = useCallback(
    () =>
      searchWeather().then(({ ...data }) =>
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
