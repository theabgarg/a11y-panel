import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "./Context/Store";

interface FooterProps {
  onClose?: () => void;
}

export default function Footer({ onClose }: FooterProps) {
  const { dispatch } = useContext(store);

  return (
    <Container>
      <ResetButton
        type="button"
        onClick={() => dispatch({ type: "RESET_SETTINGS" })}
      >
        Reset
      </ResetButton>
      {onClose && (
        <DoneButton type="button" onClick={onClose}>
          Done
        </DoneButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 16px 16px;
  background: ${({ theme }) => theme.background};
  border-top: 1px solid rgba(148, 163, 184, 0.18);
`;

const BaseButton = styled.button`
  flex: 1 1 0;
  border-radius: 12px;
  border: none;
  padding: 10px 14px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 94, 177, 0.35);
    outline-offset: 2px;
  }
`;

const ResetButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
`;

const DoneButton = styled(BaseButton)`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.iconColor || "#ffffff"};
  box-shadow: 0 8px 18px rgba(14, 94, 177, 0.25);
`;
