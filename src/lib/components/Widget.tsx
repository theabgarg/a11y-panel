import React, { useContext, useRef, useState } from "react";
import AccessibilityIcon from "./assets/AccessibilityIcon";
import Header from "./Header";
import StyleSettings from "./StyleSettings";
import Footer from "./Footer";
import "./Widget.css";
import { store } from "./Context/Store";
import styled, { keyframes } from "styled-components";

interface WidgetProps {
  initialPosition?: { x: number; y: number };
  customIcon?: React.ReactNode;
}

export default function Widget({ initialPosition, customIcon }: WidgetProps) {
  const { globalState, dispatch } = useContext(store);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    initialPosition || null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    dragged: false,
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      initialX: position ? position.x : rect.left,
      initialY: position ? position.y : rect.top,
      dragged: false,
    };

    target.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) {
      return;
    }

    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.dragged = true;
    }

    const newX = Math.min(
      Math.max(0, dragRef.current.initialX + dx),
      window.innerWidth - 72,
    );
    const newY = Math.min(
      Math.max(0, dragRef.current.initialY + dy),
      window.innerHeight - 72,
    );

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const getPopupStyle = (): React.CSSProperties => {
    if (!position) {
      return {};
    }

    const { innerWidth, innerHeight } = window;
    const style: React.CSSProperties = { position: "fixed" };

    if (position.x < innerWidth / 2) {
      style.left = `${Math.max(12, position.x)}px`;
      style.right = "auto";
    } else {
      style.right = `${Math.max(12, innerWidth - position.x - 72)}px`;
      style.left = "auto";
    }

    if (position.y < innerHeight / 2) {
      style.top = `${position.y + 78}px`;
      style.bottom = "auto";
    } else {
      style.bottom = `${innerHeight - position.y + 12}px`;
      style.top = "auto";
    }

    return style;
  };

  const buttonStyle: React.CSSProperties = position
    ? {
        left: position.x,
        top: position.y,
        bottom: "auto",
        right: "auto",
        touchAction: "none",
      }
    : { touchAction: "none" };

  return (
    <Container className="a11y-widget">
      <InnerContainer>
        {globalState.widgetOpen && (
          <Backdrop
            className="a11y-widget-backdrop"
            onClick={() => dispatch({ type: "CLOSE_WIDGET" })}
          />
        )}

        <Button
          type="button"
          className="a11y-widget-trigger"
          aria-label="Open accessibility settings"
          aria-expanded={globalState.widgetOpen}
          aria-haspopup="dialog"
          aria-controls="a11y-widget-panel"
          title="Accessibility settings"
          style={buttonStyle}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={() => {
            if (!dragRef.current.dragged) {
              dispatch({ type: "OPEN_WIDGET" });
            }
          }}
        >
          <IconWrapper>
            {customIcon ? customIcon : <AccessibilityIcon />}
          </IconWrapper>
        </Button>

        {globalState.widgetOpen && (
          <WidgetContainer
            id="a11y-widget-panel"
            role="dialog"
            aria-modal
            aria-labelledby="a11y-widget-title"
            className="a11y-widget-panel"
            style={getPopupStyle()}
          >
            <Header onClose={() => dispatch({ type: "CLOSE_WIDGET" })} />
            <WidgetBox>
              <StyleSettings />
            </WidgetBox>
            <Footer onClose={() => dispatch({ type: "CLOSE_WIDGET" })} />
          </WidgetContainer>
        )}
      </InnerContainer>
    </Container>
  );
}

const backdropFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const panelEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulseRing = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const Container = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
`;

const InnerContainer = styled.div`
  font-family: "Roboto", sans-serif;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(4px);
  animation: ${backdropFade} 0.18s ease-out;
  z-index: 9997;
`;

const Button = styled.button`
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 2px solid ${({ theme }) => theme.iconColor || "#ffffff"};
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.iconColor || "#ffffff"};
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.26);
  cursor: grab;
  z-index: 9998;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  appearance: none;

  &::before {
    content: "";
    position: absolute;
    inset: -5px;
    border-radius: inherit;
    border: 2px solid rgba(14, 94, 177, 0.25);
    animation: ${pulseRing} 2.3s ease-out infinite;
  }

  &:hover {
    transform: translateY(-1px) scale(1.04);
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.3);
  }

  &:active {
    cursor: grabbing;
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.9);
    outline-offset: 3px;
  }
`;

const IconWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const WidgetContainer = styled.div`
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: min(380px, calc(100vw - 24px));
  min-width: 280px;
  max-height: min(560px, calc(100vh - 24px));
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.2);
  overflow: hidden;
  animation: ${panelEnter} 0.2s ease-out;
  z-index: 9999;

  @media (max-width: 600px) {
    left: 10px !important;
    right: 10px !important;
    bottom: 10px !important;
    top: auto !important;
    width: auto;
    min-width: 0;
    max-height: calc(100vh - 20px);
    border-radius: 20px 20px 16px 16px;
  }
`;

const WidgetBox = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.widgetBackground};
  color: ${({ theme }) => theme.text};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #eef2f7;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7d2de;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;
