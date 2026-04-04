import React from "react";
import styled from "styled-components";
import AccessibilityIcon from "./assets/AccessibilityIcon";
import CloseIcon from "./assets/CloseIcon";

interface HeaderProps {
  onClose?: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  return (
    <Container>
      <TopRow>
        <Info>
          <IconCircle>
            <AccessibilityIcon />
          </IconCircle>
          <TextBlock>
            <Title>Accessibility</Title>
            <Subtitle>Customize your reading experience</Subtitle>
          </TextBlock>
        </Info>

        {onClose && (
          <CloseButton
            type="button"
            onClick={onClose}
            aria-label="Close accessibility settings"
          >
            <CloseIcon />
          </CloseButton>
        )}
      </TopRow>
    </Container>
  );
}

const Container = styled.div`
  padding: 16px 16px 12px;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.14) 0%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.iconColor || "#ffffff"};
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const IconCircle = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TextBlock = styled.div`
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  color: inherit;
`;

const Subtitle = styled.p`
  margin: 2px 0 0;
  font-size: 0.76rem;
  line-height: 1.35;
  color: inherit;
  opacity: 0.8;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.1);
  color: inherit;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
    transform: scale(1.04);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.9);
    outline-offset: 2px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;
