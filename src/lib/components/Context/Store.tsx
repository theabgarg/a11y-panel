"use client";
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import reducer, { Action } from './reducer';
import initialState, { GlobalState } from './initialState';
import createStyles from '../helpers/createStyles';

interface ContextProps {
  globalState: GlobalState;
  dispatch: Dispatch<Action>;
}

const store = createContext<ContextProps>({
  globalState: initialState,
  dispatch: () => undefined,
});

const { Provider } = store;

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const existingStyle = document.getElementById('react-accessibility-styles');
      if (!existingStyle) {
        document.head.insertAdjacentHTML(
          'beforeend',
          `<style id="react-accessibility-styles"></style>`
        );
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleEl = document.getElementById('react-accessibility-styles');
      if (styleEl) {
        styleEl.innerHTML = createStyles(globalState);
      }
    }
  }, [globalState]);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

export { store, ContextProvider };
