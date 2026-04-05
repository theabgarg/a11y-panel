import React, { useContext } from "react";
import { store } from "../Context/Store";
import SettingsBox from "./SettingsBox";
import BoldIcon from "../assets/BoldIcon";
import TextAlignLeftIcon from "../assets/TextAlignLeftIcon";
import TextAlignCenterIcon from "../assets/TextAlignCenterIcon";
import TextAlignRightIcon from "../assets/TextAlignRightIcon";
import ItalicIcon from "../assets/ItalicIcon";

export default function FontButtons() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title="Font Style">
      <div className="a11y-panel-style-row">
        <button
          type="button"
          className={`a11y-panel-style-button${globalState.textBold ? " is-active" : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_BOLD" })}
          aria-label="Toggle bold text"
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          className={`a11y-panel-style-button${globalState.textItalic ? " is-active" : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_ITALIC" })}
          aria-label="Toggle italic text"
        >
          <ItalicIcon />
        </button>
        <button
          type="button"
          className={`a11y-panel-style-button${globalState.textAlignment === "left" ? " is-active" : ""}`}
          onClick={() => dispatch({ type: "SET_TEXT_ALIGNMENT", data: "left" })}
          aria-label="Align text left"
        >
          <TextAlignLeftIcon />
        </button>
        <button
          type="button"
          className={`a11y-panel-style-button${globalState.textAlignment === "center" ? " is-active" : ""}`}
          onClick={() =>
            dispatch({ type: "SET_TEXT_ALIGNMENT", data: "center" })
          }
          aria-label="Align text center"
        >
          <TextAlignCenterIcon />
        </button>
        <button
          type="button"
          className={`a11y-panel-style-button${globalState.textAlignment === "right" ? " is-active" : ""}`}
          onClick={() =>
            dispatch({ type: "SET_TEXT_ALIGNMENT", data: "right" })
          }
          aria-label="Align text right"
        >
          <TextAlignRightIcon />
        </button>
      </div>
    </SettingsBox>
  );
}
