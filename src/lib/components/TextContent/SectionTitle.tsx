import React, { ReactNode } from "react";
import styled from "styled-components";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.h4`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
`;
