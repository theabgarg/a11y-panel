import React, { useContext } from "react";
import { store } from "./Context/Store";

interface FooterProps {
  onClose?: () => void;
}

export default function Footer({ onClose }: FooterProps) {
  const { dispatch } = useContext(store);

  return (
    <div className="a11y-panel-footer">
      <button
        type="button"
        className="a11y-panel-footer__button a11y-panel-footer__button--secondary"
        onClick={() => dispatch({ type: "RESET_SETTINGS" })}
      >
        Reset
      </button>
      {onClose && (
        <button
          type="button"
          className="a11y-panel-footer__button a11y-panel-footer__button--primary"
          onClick={onClose}
        >
          Done
        </button>
      )}
    </div>
  );
}
