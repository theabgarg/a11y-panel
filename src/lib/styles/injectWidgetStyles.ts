const STYLE_ID = "a11y-panel-ui-styles";

const widgetStyles = `
.a11y-panel-root,
.a11y-panel-root * {
  box-sizing: border-box;
}

.a11y-panel-root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--a11y-text, #1f2937);
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
  text-size-adjust: 100%;
}

.a11y-panel-root button,
.a11y-panel-root input,
.a11y-panel-root select {
  font: inherit;
}

.a11y-panel-root button {
  appearance: none;
  -webkit-appearance: none;
}

.a11y-panel-root svg {
  display: block;
  flex-shrink: 0;
}

@keyframes a11y-panel-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes a11y-panel-pop-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes a11y-panel-pulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.a11y-panel-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(4px);
  animation: a11y-panel-fade-in 0.18s ease-out;
  z-index: 9997;
}

.a11y-panel-trigger {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 2px solid var(--a11y-icon-color, #ffffff);
  background: var(--a11y-primary, #0e5eb1);
  color: var(--a11y-icon-color, #ffffff);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.26);
  cursor: grab;
  z-index: 9998;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  -webkit-tap-highlight-color: transparent;
}

.a11y-panel-trigger::before {
  content: "";
  position: absolute;
  inset: -5px;
  border-radius: inherit;
  border: 2px solid rgba(14, 94, 177, 0.25);
  animation: a11y-panel-pulse 2.3s ease-out infinite;
}

.a11y-panel-trigger:hover {
  transform: translateY(-1px) scale(1.04);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.3);
}

.a11y-panel-trigger:active,
.a11y-panel-trigger.is-dragging {
  cursor: grabbing;
  transform: scale(0.98);
}

.a11y-panel-trigger:focus-visible,
.a11y-panel-tab:focus-visible,
.a11y-panel-style-button:focus-visible,
.a11y-panel-chip:focus-visible,
.a11y-panel-color-button:focus-visible,
.a11y-panel-counter__button:focus-visible,
.a11y-panel-footer__button:focus-visible,
.a11y-panel-toggle:focus-visible,
.a11y-panel-header__close:focus-visible {
  outline: 2px solid rgba(14, 94, 177, 0.35);
  outline-offset: 2px;
}

.a11y-panel-trigger__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.a11y-panel-trigger__icon svg {
  width: 24px;
  height: 24px;
}

.a11y-panel-dialog {
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: min(380px, calc(100vw - 24px));
  min-width: 280px;
  max-height: min(560px, calc(100vh - 24px));
  display: flex;
  flex-direction: column;
  background: var(--a11y-background, #ffffff);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.2);
  overflow: hidden;
  animation: a11y-panel-pop-in 0.2s ease-out;
  z-index: 9999;
}

@media (max-width: 600px) {
  .a11y-panel-dialog {
    left: 10px !important;
    right: 10px !important;
    bottom: 10px !important;
    top: auto !important;
    width: auto;
    min-width: 0;
    max-height: calc(100vh - 20px);
    border-radius: 20px 20px 16px 16px;
  }
}

.a11y-panel-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--a11y-widget-background, #ffffff);
  color: var(--a11y-text, #1f2937);
}

.a11y-panel-scroll::-webkit-scrollbar {
  width: 8px;
}

.a11y-panel-scroll::-webkit-scrollbar-track {
  background: #eef2f7;
}

.a11y-panel-scroll::-webkit-scrollbar-thumb {
  background: #c7d2de;
  border-radius: 999px;
}

.a11y-panel-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.a11y-panel-header {
  padding: 16px 16px 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.02) 100%), var(--a11y-primary, #0e5eb1);
  color: var(--a11y-icon-color, #ffffff);
}

.a11y-panel-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.a11y-panel-header__info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.a11y-panel-header__icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  flex-shrink: 0;
}

.a11y-panel-header__icon svg {
  width: 20px;
  height: 20px;
}

.a11y-panel-header__text {
  min-width: 0;
}

.a11y-panel-header__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  color: inherit;
}

.a11y-panel-header__subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.35;
  color: inherit;
  opacity: 0.8;
}

.a11y-panel-header__close {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.1);
  color: inherit;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.18s ease, transform 0.18s ease;
}

.a11y-panel-header__close:hover {
  background: rgba(255, 255, 255, 0.24);
  transform: scale(1.04);
}

.a11y-panel-header__close svg {
  width: 16px;
  height: 16px;
}

.a11y-panel-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.a11y-panel-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.a11y-panel-tab {
  border: 0;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  background: #eef2f7;
  color: var(--a11y-text, #1f2937);
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.a11y-panel-tab:hover {
  transform: translateY(-1px);
}

.a11y-panel-tab.is-active {
  background: var(--a11y-primary, #0e5eb1);
  color: var(--a11y-icon-color, #ffffff);
  box-shadow: 0 8px 18px rgba(14, 94, 177, 0.18);
}

.a11y-panel-tabpanel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.a11y-panel-inline-section {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.a11y-panel-section-title {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--a11y-primary, #0e5eb1);
}

.a11y-panel-subsection-title {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
}

.a11y-panel-settings-box {
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
}

.a11y-panel-settings-box__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.a11y-panel-style-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.a11y-panel-style-button {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #d7dee7;
  background: #ffffff;
  color: #64748b;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.a11y-panel-style-button:hover {
  transform: translateY(-1px);
}

.a11y-panel-style-button.is-active {
  border-color: var(--a11y-primary, #0e5eb1);
  background: #eaf3ff;
  color: var(--a11y-primary, #0e5eb1);
}

.a11y-panel-counter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 14px;
  background: #eef4ef;
}

.a11y-panel-counter__button {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  background: #ffffff;
  color: var(--a11y-primary, #0e5eb1);
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.a11y-panel-counter__button:hover:not(:disabled) {
  transform: translateY(-1px);
  background: var(--a11y-primary, #0e5eb1);
  color: var(--a11y-icon-color, #ffffff);
}

.a11y-panel-counter__button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.a11y-panel-counter__button svg {
  width: 14px;
  height: 14px;
}

.a11y-panel-counter__value {
  min-width: 54px;
  padding: 6px 10px;
  border-radius: 999px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  background: #ffffff;
}

.a11y-panel-counter__value.is-active {
  color: var(--a11y-primary, #0e5eb1);
  background: #e8f2ff;
}

.a11y-panel-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.a11y-panel-chip {
  border: 1px solid #d7dee7;
  border-radius: 999px;
  padding: 6px 10px;
  background: #ffffff;
  color: var(--a11y-text, #1f2937);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.a11y-panel-chip:hover {
  transform: translateY(-1px);
}

.a11y-panel-chip.is-active {
  border-color: var(--a11y-primary, #0e5eb1);
  background: var(--a11y-primary, #0e5eb1);
  color: var(--a11y-icon-color, #ffffff);
}

.a11y-panel-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.a11y-panel-color-button {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 2px solid #dbe2ea;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.a11y-panel-color-button:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.16);
}

.a11y-panel-color-button.is-active {
  border-color: var(--a11y-primary, #0e5eb1);
}

.a11y-panel-color-button.is-light {
  box-shadow: inset 0 0 0 1px #cbd5e1, 0 2px 8px rgba(15, 23, 42, 0.12);
}

.a11y-panel-toggle {
  position: relative;
  width: 42px;
  height: 22px;
  border: 0;
  border-radius: 999px;
  background: #cbd5e1;
  cursor: pointer;
  transition: background 0.18s ease, opacity 0.18s ease;
}

.a11y-panel-toggle.is-on {
  background: var(--a11y-primary, #0e5eb1);
}

.a11y-panel-toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.a11y-panel-toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ffffff;
  transition: transform 0.18s ease;
}

.a11y-panel-toggle.is-on .a11y-panel-toggle__thumb {
  transform: translateX(20px);
}

.a11y-panel-footer {
  display: flex;
  gap: 10px;
  padding: 12px 16px 16px;
  background: var(--a11y-background, #ffffff);
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

.a11y-panel-footer__button {
  flex: 1 1 0;
  border-radius: 12px;
  border: 1px solid transparent;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.a11y-panel-footer__button:hover {
  transform: translateY(-1px);
}

.a11y-panel-footer__button--secondary {
  background: transparent;
  color: var(--a11y-primary, #0e5eb1);
  border-color: var(--a11y-primary, #0e5eb1);
}

.a11y-panel-footer__button--primary {
  background: var(--a11y-primary, #0e5eb1);
  color: var(--a11y-icon-color, #ffffff);
  box-shadow: 0 8px 18px rgba(14, 94, 177, 0.25);
}
`;

export function injectWidgetStyles() {
  if (typeof document === "undefined") {
    return;
  }

  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = widgetStyles;
  document.head.appendChild(style);
}
