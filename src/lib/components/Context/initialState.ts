export interface GlobalState {
  widgetOpen: boolean;
  fontColor: string | false;
  fontSizeAdjustment: number;
  lineHeight: number;
  letterSpacing: number;
  textBold: boolean;
  textCase: 'initial' | 'uppercase' | 'lowercase' | 'capitalize';
  textAlignment: 'initial' | 'left' | 'right' | 'center' | 'justify';
  textItalic: boolean;
  titleColor: string | false;
  titleBackgroundColor: string | null;
  highlightTitles: boolean;
  highlightLinks: boolean;
  hideImages: boolean;
  monochrome: boolean;
  highContrast: boolean;
  lowContrast: boolean;
}

const initialState: GlobalState = {
  widgetOpen: false,
  // == text ==
  fontColor: false,
  fontSizeAdjustment: 0,
  lineHeight: 0,
  letterSpacing: 0,
  textBold: false,
  textCase: 'initial',
  textAlignment: 'initial',
  textItalic: false,
  // == titles ==
  titleColor: false,
  titleBackgroundColor: null,
  highlightTitles: false,
  // == other settings ==
  highlightLinks: false,
  hideImages: false,
  monochrome: false,
  highContrast: false,
  lowContrast: false,
};

export default initialState;
