import React, { useContext, useEffect, useRef, useState } from "react";
import AccessibilityIcon from "./assets/AccessibilityIcon";
import Header from "./Header";
import StyleSettings from "./StyleSettings";
import Footer from "./Footer";
import { store } from "./Context/Store";
import { injectWidgetStyles } from "../styles/injectWidgetStyles";

interface WidgetProps {
  initialPosition?: { x: number; y: number };
  customIcon?: React.ReactNode;
  cssVars?: React.CSSProperties;
}

export default function Widget({
  initialPosition,
  customIcon,
  cssVars,
}: WidgetProps) {
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

  useEffect(() => {
    injectWidgetStyles();
  }, []);

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
    <div data-a11y-panel-root className="a11y-panel-root" style={cssVars}>
      {globalState.widgetOpen && (
        <div
          className="a11y-panel-backdrop"
          onClick={() => dispatch({ type: "CLOSE_WIDGET" })}
        />
      )}

      <button
        type="button"
        className={`a11y-panel-trigger${isDragging ? " is-dragging" : ""}`}
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
        <span className="a11y-panel-trigger__icon">
          {customIcon ? customIcon : <AccessibilityIcon />}
        </span>
      </button>

      {globalState.widgetOpen && (
        <div
          id="a11y-widget-panel"
          role="dialog"
          aria-modal={true}
          aria-labelledby="a11y-widget-title"
          className="a11y-panel-dialog"
          style={getPopupStyle()}
        >
          <Header onClose={() => dispatch({ type: "CLOSE_WIDGET" })} />
          <div className="a11y-panel-scroll">
            <StyleSettings />
          </div>
          <Footer onClose={() => dispatch({ type: "CLOSE_WIDGET" })} />
        </div>
      )}
    </div>
  );
}
