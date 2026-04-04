import React, { useContext } from "react";
import Toggle from "./Toggle";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";

export default function LowContrast() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={"Low Contrast"}>
      <Toggle
        onChange={() =>
          dispatch({
            type: globalState.lowContrast
              ? "UNSET_LOW_CONTRAST"
              : "SET_LOW_CONTRAST",
          })
        }
        checked={globalState.lowContrast}
      />
    </SettingsBox>
  );
}
