import React, { ReactNode } from 'react';
import styled from 'styled-components';

export default function SubSectionTitle({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.h5`
  width: fit-content;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  color: black;
  margin: 0px 5px 8px;
  box-sizing: border-box;
`;
