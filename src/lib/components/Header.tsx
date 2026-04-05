import React from "react";
import AccessibilityIcon from "./assets/AccessibilityIcon";
import CloseIcon from "./assets/CloseIcon";

interface HeaderProps {
  onClose?: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  return (
    <div className="a11y-panel-header">
      <div className="a11y-panel-header__top">
        <div className="a11y-panel-header__info">
          <div className="a11y-panel-header__icon">
            <AccessibilityIcon />
          </div>
          <div className="a11y-panel-header__text">
            <h3 id="a11y-widget-title" className="a11y-panel-header__title">
              Accessibility
            </h3>
            <p className="a11y-panel-header__subtitle">
              Customize your reading experience
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            className="a11y-panel-header__close"
            onClick={onClose}
            aria-label="Close accessibility settings"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
}
