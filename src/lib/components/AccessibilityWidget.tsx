"use client";
import React from "react";
import Widget from "./Widget";
import { ContextProvider } from "./Context/Store";

export interface WidgetTheme {
  primary?: string;
  background?: string;
  widgetBackground?: string;
  text?: string;
  iconColor?: string;
}

export interface AccessibilityWidgetProps {
  theme?: WidgetTheme;
  initialPosition?: { x: number; y: number };
  customIcon?: React.ReactNode;
  storageKey?: string;
}

interface WidgetCssVariables extends React.CSSProperties {
  "--a11y-primary"?: string;
  "--a11y-background"?: string;
  "--a11y-widget-background"?: string;
  "--a11y-text"?: string;
  "--a11y-icon-color"?: string;
}

const defaultTheme: Required<WidgetTheme> = {
  primary: "#0e5eb1",
  background: "#ffffff",
  widgetBackground: "#ffffff",
  text: "#1f2937",
  iconColor: "#ffffff",
};

export default function AccessibilityWidget({
  theme,
  initialPosition,
  customIcon,
  storageKey,
}: AccessibilityWidgetProps = {}) {
  const mergedTheme = { ...defaultTheme, ...theme };

  const cssVars: WidgetCssVariables = {
    "--a11y-primary": mergedTheme.primary,
    "--a11y-background": mergedTheme.background,
    "--a11y-widget-background": mergedTheme.widgetBackground,
    "--a11y-text": mergedTheme.text,
    "--a11y-icon-color": mergedTheme.iconColor,
  };

  return (
    <ContextProvider storageKey={storageKey}>
      <Widget
        initialPosition={initialPosition}
        customIcon={customIcon}
        cssVars={cssVars}
      />
    </ContextProvider>
  );
}
