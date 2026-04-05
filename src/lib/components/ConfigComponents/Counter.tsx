import React from "react";
import MinusIcon from "../assets/MinusIcon";
import PlusIcon from "../assets/PlusIcon";

interface CounterProps {
  onMinusChange: () => void;
  onAddChange: () => void;
  value: number;
  minValue: number;
  maxValue: number;
}

export default function Counter({
  onMinusChange,
  onAddChange,
  value,
  minValue,
  maxValue,
}: CounterProps) {
  const isMin = value <= minValue;
  const isMax = value >= maxValue;
  const formattedValue = `${value > 0 ? `+${value}` : value}%`;

  return (
    <div className="a11y-panel-counter">
      <button
        type="button"
        className="a11y-panel-counter__button"
        onClick={onMinusChange}
        disabled={isMin}
        aria-label="Decrease value"
      >
        <MinusIcon />
      </button>
      <span
        className={`a11y-panel-counter__value${value !== 0 ? " is-active" : ""}`}
      >
        {formattedValue}
      </span>
      <button
        type="button"
        className="a11y-panel-counter__button"
        onClick={onAddChange}
        disabled={isMax}
        aria-label="Increase value"
      >
        <PlusIcon />
      </button>
    </div>
  );
}
