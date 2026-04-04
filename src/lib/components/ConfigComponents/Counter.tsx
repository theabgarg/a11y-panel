import React from "react";
import styled from "styled-components";
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
    <CounterContainer>
      <IconButton
        type="button"
        onClick={onMinusChange}
        disabled={isMin}
        aria-label="Decrease value"
      >
        <MinusIcon />
      </IconButton>
      <SizeContainer $active={value !== 0}>{formattedValue}</SizeContainer>
      <IconButton
        type="button"
        onClick={onAddChange}
        disabled={isMax}
        aria-label="Increase value"
      >
        <PlusIcon />
      </IconButton>
    </CounterContainer>
  );
}

const CounterContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 14px;
  background: #eef4ef;
`;

const IconButton = styled.button`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.iconColor || "#ffffff"};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const SizeContainer = styled.span<{ $active: boolean }>`
  min-width: 54px;
  padding: 6px 10px;
  border-radius: 999px;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: ${({ $active, theme }) => ($active ? theme.primary : "#64748b")};
  background: ${({ $active }) => ($active ? "#e8f2ff" : "#ffffff")};
`;
