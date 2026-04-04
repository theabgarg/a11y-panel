import React, { ReactNode } from "react";
import SubSectionTitle from "../TextContent/SubSectionTitle";
import styled from "styled-components";

interface SettingsBoxProps {
  title: string;
  children: ReactNode;
}

export default function SettingsBox({ title, children }: SettingsBoxProps) {
  return (
    <Container>
      <SubSectionTitle>{title}</SubSectionTitle>
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1 1 160px;
  min-width: 140px;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;
