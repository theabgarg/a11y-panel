import React, { useContext } from "react";
import Toggle from "./Toggle";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";

export default function HighContrast() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={"High Contrast"}>
      <Toggle
        onChange={() =>
          dispatch({
            type: globalState.highContrast
              ? "UNSET_HIGH_CONTRAST"
              : "SET_HIGH_CONTRAST",
          })
        }
        checked={globalState.highContrast}
      />
    </SettingsBox>
  );
}
