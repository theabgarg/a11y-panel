"use client";
import React from 'react';
import Widget from './Widget';
import { ContextProvider } from './Context/Store';
import { ThemeProvider } from 'styled-components';

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
}

const defaultTheme: Required<WidgetTheme> = {
  primary: '#0e5eb1',
  background: '#ffffff',
  widgetBackground: '#202020',
  text: '#ffffff',
  iconColor: 'white'
};

export default function AccessibilityWidget({ 
  theme, 
  initialPosition, 
  customIcon 
}: AccessibilityWidgetProps = {}) {
  
  const mergedTheme = { ...defaultTheme, ...theme };

  return (
    <ContextProvider>
      <ThemeProvider theme={mergedTheme}>
        <Widget initialPosition={initialPosition} customIcon={customIcon} />
      </ThemeProvider>
    </ContextProvider>
  );
}
