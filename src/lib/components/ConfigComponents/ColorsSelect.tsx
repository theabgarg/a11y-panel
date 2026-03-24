import React from 'react';
import styled, { useTheme } from 'styled-components';

interface ColorsSelectProps {
  value: string | false | null;
  onChange: (color: string) => void;
  colors?: string[];
}

export default function ColorsSelect({ value, onChange, colors }: ColorsSelectProps) {
  const theme = useTheme();
  
  const defaultColors = [
    'red',
    'blue',
    'green',
    'yellow',
    'brown',
    'grey',
    'black',
    'white',
  ];

  const selectedColors = colors ? colors : defaultColors;

  const renderColors = () => {
    return (
      <>
        {selectedColors.map((color) => {
          const activeStyles = value === color ? { borderColor: theme.primary } : {};

          return (
            <ColorContainer
              style={{ backgroundColor: color, ...activeStyles }}
              onClick={() => onChange(color)}
            />
          );
        })}
      </>
    );
  };

  return <ColorsContainer>{renderColors()}</ColorsContainer>;
}

const ColorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ColorContainer = styled.div`
  border-radius: 100px;
  width: 20px;
  height: 20px;
  position: relative;
  margin: 6px;
  border: 1px solid white;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);

  ::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: solid 2px;
    border-color: inherit;
    height: 23px;
    width: 23px;
    border-radius: 100px;
  }
  :hover {
    opacity: 0.7;
  }
`;
