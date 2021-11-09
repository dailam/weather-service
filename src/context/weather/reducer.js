import { TYPES } from './actions';

export const initialState = {
  locations: [],
  weather: {},
};

window.__ = (text) => text;

const reducer = (state, { type, ...args }) => {
  //TODO Lam: handle broadcast api catch status wrapper
  switch (type) {
    case TYPES.SEARCH_LOCATION: {
      const { locations } = args;
      return {
        ...state,
        locations,
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
