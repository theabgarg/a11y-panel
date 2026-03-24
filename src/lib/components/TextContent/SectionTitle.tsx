import React, { ReactNode } from 'react';
import styled from 'styled-components';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.h4`
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding: 5px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 13px;
  color: black;
  margin: 0px 0px 16px;
`;
