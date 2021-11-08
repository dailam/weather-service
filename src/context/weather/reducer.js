import { TYPES } from './actions';

export const initialState = {
  location: {},
  weather: {},
};

window.__ = (text) => text;

const reducer = (state, { type, ...args }) => {
  switch (type) {
    case TYPES.SEARCH_LOCATION: {
      const { location } = args;
      return {
        ...state,
        location,
      };
    }
    case TYPES.SEARCH_WEATHER: {
      const { weather } = args;
      return {
        ...state,
        weather,
      };
    }
    default:
      return state;
  }
};

export default reducer;
