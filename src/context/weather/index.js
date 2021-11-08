import React from 'react';
import PropTypes from 'prop-types';

import reducer, { initialState } from './reducer';
import { useActionCreator } from './actions';

const Context = React.createContext();

let cachedState = initialState;
const ContextProvider = ({ children, isCached }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    isCached ? cachedState : initialState,
  );
  if (isCached) {
    cachedState = state;
  }
  const actions = useActionCreator(dispatch);

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
ContextProvider.propTypes = {
  children: PropTypes.any,
  isCached: PropTypes.bool,
};

const withContextProvider = (Component, { isCached }) => {
  const Wrapper = (props) => (
    <ContextProvider isCached={isCached}>
      <Component {...props} />
    </ContextProvider>
  );
  return Wrapper;
};

const useContext = () => React.useContext(Context);

export const withWeatherContextProvider = withContextProvider;
export const useWeatherContext = useContext;
