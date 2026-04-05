import React from "react";

interface ColorsSelectProps {
  value: string | false | null;
  onChange: (color: string) => void;
  colors?: string[];
}

const defaultColors = [
  "#ef4444",
  "#2563eb",
  "#16a34a",
  "#eab308",
  "#8b5e3c",
  "#6b7280",
  "#111827",
  "#ffffff",
];

export default function ColorsSelect({
  value,
  onChange,
  colors,
}: ColorsSelectProps) {
  const selectedColors = colors || defaultColors;

  return (
    <div className="a11y-panel-colors">
      {selectedColors.map((color) => {
        const isActive = value === color;
        const isLight = color === "#ffffff";

        return (
          <button
            key={color}
            type="button"
            className={`a11y-panel-color-button${isActive ? " is-active" : ""}${isLight ? " is-light" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`Select ${color} color`}
            aria-pressed={isActive}
          />
        );
      })}
    </div>
  );
}
