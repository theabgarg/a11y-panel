import React, { useContext } from 'react';
import { store } from '../Context/Store';
import styled from 'styled-components';
import MinusIcon from '../assets/MinusIcon';
import PlusIcon from '../assets/PlusIcon';
import SettingsBox from './SettingsBox';

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
  const buttonInActiveStyles = {
    opacity: '0.5',
    color: 'red',
  };
  return (
    <CounterContainer>
      <MinusButton
        onClick={onMinusChange}
        style={value >= minValue ? {} : buttonInActiveStyles}
      >
        <MinusIcon />
      </MinusButton>
      <SizeContainer>{value}%</SizeContainer>
      <PlusButton
        style={value <= maxValue ? {} : buttonInActiveStyles}
        onClick={onAddChange}
      >
        <PlusIcon />
      </PlusButton>
    </CounterContainer>
  );
}

const CounterContainer = styled.div`
  border-radius: 50px;
  background: grey;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
`;
const MinusButton = styled.div`
  :hover {
    color: ${({ theme }) => theme.primary};
  }
`;
const PlusButton = styled.div`
  :hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SizeContainer = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 100px;
  box-shadow: 2px 2px 6px black;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  width: 25px;
`;
