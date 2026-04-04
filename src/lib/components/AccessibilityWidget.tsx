"use client";
import React from "react";
import Widget from "./Widget";
import { ContextProvider } from "./Context/Store";
import { ThemeProvider } from "styled-components";

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

  return (
    <ContextProvider storageKey={storageKey}>
      <ThemeProvider theme={mergedTheme}>
        <Widget initialPosition={initialPosition} customIcon={customIcon} />
      </ThemeProvider>
    </ContextProvider>
  );
}
