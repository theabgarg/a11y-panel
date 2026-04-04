import React, { ReactNode } from "react";
import styled from "styled-components";

export default function SubSectionTitle({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.h5`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  color: #334155;
`;
