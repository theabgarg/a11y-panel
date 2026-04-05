import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Toggle({
  onChange,
  checked,
  disabled = false,
  ariaLabel,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`a11y-panel-toggle${checked ? " is-on" : ""}`}
      onClick={onChange}
    >
      <span className="a11y-panel-toggle__thumb" />
    </button>
  );
}
