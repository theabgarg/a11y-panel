import React, { useContext, useState, useRef } from 'react';
import AccessibilityIcon from './assets/AccessibilityIcon';
import CloseIcon from './assets/CloseIcon';
import Header from './Header';
import StyleSettings from './StyleSettings';
import Footer from './Footer';
import './Widget.css';
import { store } from './Context/Store';
import styled from 'styled-components';

interface WidgetProps {
  initialPosition?: { x: number; y: number };
  customIcon?: React.ReactNode;
}

export default function Widget({ initialPosition, customIcon }: WidgetProps) {
  const { globalState, dispatch } = useContext(store);

  const [position, setPosition] = useState<{ x: number; y: number } | null>(initialPosition || null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, dragged: false });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    const startX = position ? position.x : rect.left;
    const startY = position ? position.y : rect.top;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: startX,
      initialY: startY,
      dragged: false,
    };
    
    target.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.dragged = true;
    }
    
    const newX = Math.min(Math.max(0, dragRef.current.initialX + dx), window.innerWidth - 65);
    const newY = Math.min(Math.max(0, dragRef.current.initialY + dy), window.innerHeight - 65);
    
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const getPopupStyle = (): React.CSSProperties => {
    if (!position) return {};

    const { innerWidth, innerHeight } = window;
    const style: React.CSSProperties = { position: 'fixed' };

    if (position.x < innerWidth / 2) {
      style.left = `${Math.max(10, position.x)}px`;
      style.right = 'auto';
    } else {
      style.right = `${Math.max(10, innerWidth - position.x - 65)}px`;
      style.left = 'auto';
    }

    if (position.y < innerHeight / 2) {
      style.top = `${position.y + 75}px`;
      style.bottom = 'auto';
    } else {
      style.bottom = `${innerHeight - position.y + 10}px`;
      style.top = 'auto';
    }

    return style;
  };

  const buttonStyle: React.CSSProperties = position 
    ? { left: position.x, top: position.y, bottom: 'auto', right: 'auto', touchAction: 'none' } 
    : { touchAction: 'none' };

  return (
    <Container>
      <InnerContainer>
        <Button 
          style={buttonStyle}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={() => {
            if (!dragRef.current.dragged) {
              dispatch({ type: 'OPEN_WIDGET' });
            }
          }}
        >
          {customIcon ? customIcon : <AccessibilityIcon />}
        </Button>
        {globalState.widgetOpen && (
          <WidgetContainer style={getPopupStyle()}>
            <CloseButton onClick={() => dispatch({ type: 'CLOSE_WIDGET' })} />
            <Header />
            <WidgetBox>
              <StyleSettings />
            </WidgetBox>
            <Footer />
          </WidgetContainer>
        )}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const InnerContainer = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Button = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.iconColor || theme.text};
  padding: 10px;
  border-radius: 500px;
  border: solid 2px ${({ theme }) => theme.iconColor || theme.text};
  z-index: 9998;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  img {
    max-width: 60px;
  }
`;

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: calc(100% - 25px);
  max-height: 450px;
  max-width: 380px;
  min-height: 300px;
  min-width: 280px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 10px;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primary};
  border-radius: 100px;
  height: 30px;
  width: 30px;
  /* transform: translate(-50%, -50%); */
`;

const WidgetBox = styled.div`
  background-color: ${({ theme }) => theme.widgetBackground};
  width: 100%;
  height: 420px;
  overflow-y: scroll;
  overflow-x: hidden;
  color: ${({ theme }) => theme.text};
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #2b2a2a;
    border-radius: 0px 10px 10px 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
