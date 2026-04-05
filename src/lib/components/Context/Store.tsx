"use client";
import React, {
  createContext,
  useReducer,
  useEffect,
  useRef,
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

  try {
    const rawState = window.localStorage.getItem(storageKey);

    if (!rawState) {
      return {};
    }

    return JSON.parse(rawState) as Partial<GlobalState>;
  } catch {
    return {};
  }
}

const ContextProvider = ({
  children,
  storageKey = STORAGE_KEY,
}: ContextProviderProps) => {
  // Initialize from persisted state via lazy initializer to avoid a race
  // condition where isHydrated could become true before globalState reflects
  // the stored preferences.
  const [globalState, dispatch] = useReducer(reducer, undefined, () => {
    const persisted = getPersistedState(storageKey);
    return { ...initialState, ...persisted, widgetOpen: false };
  });

  // Track the previous storageKey so we can re-hydrate only when it changes
  // at runtime (the lazy initializer already handles the initial load).
  const prevStorageKeyRef = useRef(storageKey);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const existingStyle = document.getElementById("a11y-panel-page-styles");
      if (!existingStyle) {
        document.head.insertAdjacentHTML(
          "beforeend",
          `<style id="a11y-panel-page-styles"></style>`,
        );
      }
    }
  }, []);

  // Re-hydrate only when storageKey changes after mount.
  useEffect(() => {
    if (prevStorageKeyRef.current === storageKey) {
      return;
    }
    prevStorageKeyRef.current = storageKey;
    dispatch({ type: "HYDRATE_STATE", data: getPersistedState(storageKey) });
  }, [storageKey]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const styleEl = document.getElementById("a11y-panel-page-styles");
      if (styleEl) {
        styleEl.textContent = createStyles(globalState);
      }
    }
  }, [globalState]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { widgetOpen, ...persistedState } = globalState;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(persistedState));
    } catch {
      // Ignore persistence failures (e.g., quota exceeded or storage disabled).
    }
  }, [globalState, storageKey]);

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
