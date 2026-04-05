import React, { useContext } from "react";
import Toggle from "./Toggle";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";

export default function Monochrome() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={"Monochrome"}>
      <Toggle
        onChange={() =>
          dispatch({
            type: globalState.monochrome
              ? "UNSET_MONOCHROME"
              : "SET_MONOCHROME",
          })
        }
        checked={globalState.monochrome}
      />
    </SettingsBox>
  );
}
