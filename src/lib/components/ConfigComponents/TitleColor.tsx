import React, { useContext } from "react";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";
import ColorsSelect from "./ColorsSelect";

export default function TitleColor() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={"Heading Color"}>
      <ColorsSelect
        value={globalState.titleColor}
        onChange={(color) => dispatch({ type: "SET_TITLE_COLOR", data: color })}
      />
    </SettingsBox>
  );
}
