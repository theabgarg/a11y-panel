import React, { useContext } from "react";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";

type TextCaseValue = "uppercase" | "lowercase" | "capitalize" | "initial";

const options: Array<{ label: string; value: TextCaseValue }> = [
  { label: "Default", value: "initial" },
  { label: "UPPERCASE", value: "uppercase" },
  { label: "lowercase", value: "lowercase" },
  { label: "Capitalize", value: "capitalize" },
];

export default function TextCase() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title="Text Case">
      <div className="a11y-panel-chip-group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`a11y-panel-chip${globalState.textCase === option.value ? " is-active" : ""}`}
            onClick={() =>
              dispatch({ type: "SET_TEXT_CASE", data: option.value })
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </SettingsBox>
  );
}
