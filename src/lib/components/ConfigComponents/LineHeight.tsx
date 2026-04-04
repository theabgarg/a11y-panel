import React, { useContext } from "react";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";
import Counter from "./Counter";

export default function LineHeight() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={"Line Height"}>
      <Counter
        onMinusChange={
          globalState.lineHeight > -100
            ? () => dispatch({ type: "MINUS_LINE_HEIGHT" })
            : () => undefined
        }
        onAddChange={
          globalState.lineHeight < 100
            ? () => dispatch({ type: "ADD_LINE_HEIGHT" })
            : () => undefined
        }
        value={globalState.lineHeight}
        minValue={-100}
        maxValue={100}
      />
    </SettingsBox>
  );
}
