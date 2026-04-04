import React from "react";
import styled from "styled-components";

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
    <ColorsContainer>
      {selectedColors.map((color) => (
        <ColorButton
          key={color}
          type="button"
          $active={value === color}
          $swatch={color}
          onClick={() => onChange(color)}
          aria-label={`Select ${color} color`}
          aria-pressed={value === color}
        />
      ))}
    </ColorsContainer>
  );
}

const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ColorButton = styled.button<{ $active: boolean; $swatch: string }>`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 2px solid
    ${({ $active, theme }) => ($active ? theme.primary : "#dbe2ea")};
  background: ${({ $swatch }) => $swatch};
  box-shadow: ${({ $swatch }) =>
      $swatch === "#ffffff" ? "inset 0 0 0 1px #cbd5e1," : ""}
    0 2px 8px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.16);
  }
`;
