"use client";
import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
} from "react";
import reducer, { Action } from "./reducer";
import initialState, { GlobalState } from "./initialState";
import createStyles from "../helpers/createStyles";

interface ContextProps {
  globalState: GlobalState;
  dispatch: Dispatch<Action>;
}

const STORAGE_KEY = "a11y-panel-settings";

const store = createContext<ContextProps>({
  globalState: initialState,
  dispatch: () => undefined,
});

const { Provider } = store;

interface ContextProviderProps {
  children: ReactNode;
  storageKey?: string;
}

function getPersistedState(storageKey: string): Partial<GlobalState> {
  if (typeof window === "undefined") {
    return {};
  }

  const rawState = window.localStorage.getItem(storageKey);

  if (!rawState) {
    return {};
  }

  try {
    return JSON.parse(rawState) as Partial<GlobalState>;
  } catch {
    return {};
  }
}

const ContextProvider = ({
  children,
  storageKey = STORAGE_KEY,
}: ContextProviderProps) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const existingStyle = document.getElementById(
        "react-accessibility-styles",
      );
      if (!existingStyle) {
        document.head.insertAdjacentHTML(
          "beforeend",
          `<style id="react-accessibility-styles"></style>`,
        );
      }
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "HYDRATE_STATE", data: getPersistedState(storageKey) });
    setIsHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const styleEl = document.getElementById("react-accessibility-styles");
      if (styleEl) {
        styleEl.innerHTML = createStyles(globalState);
      }
    }
  }, [globalState]);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    const { widgetOpen, ...persistedState } = globalState;
    window.localStorage.setItem(storageKey, JSON.stringify(persistedState));
  }, [globalState, isHydrated, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return;
      }

      dispatch({ type: "HYDRATE_STATE", data: getPersistedState(storageKey) });
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [storageKey]);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

export { store, ContextProvider };
