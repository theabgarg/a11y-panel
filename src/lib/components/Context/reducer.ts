import initialState, { GlobalState } from "./initialState";

export type Action =
  | { type: "OPEN_WIDGET" }
  | { type: "CLOSE_WIDGET" }
  | { type: "HYDRATE_STATE"; data: Partial<GlobalState> }
  | { type: "SET_FONT_COLOR"; data: string | false }
  | { type: "ADD_FONT_SIZE" }
  | { type: "MINUS_FONT_SIZE" }
  | { type: "ADD_LINE_HEIGHT" }
  | { type: "MINUS_LINE_HEIGHT" }
  | { type: "ADD_LETTER_SPACING" }
  | { type: "MINUS_LETTER_SPACING" }
  | { type: "TOGGLE_BOLD" }
  | { type: "TOGGLE_ITALIC" }
  | {
      type: "SET_TEXT_CASE";
      data: "initial" | "uppercase" | "lowercase" | "capitalize";
    }
  | {
      type: "SET_TEXT_ALIGNMENT";
      data: "initial" | "left" | "right" | "center" | "justify";
    }
  | { type: "SET_TITLE_COLOR"; data: string | false }
  | { type: "SET_TITLE_BACKGROUND_COLOR"; data: string | null }
  | { type: "SET_HIGHLIGHT_TITLES" }
  | { type: "UNSET_HIGHLIGHT_TITLES" }
  | { type: "SET_HIGHLIGHT_LINKS" }
  | { type: "UNSET_HIGHLIGHT_LINKS" }
  | { type: "HIDE_IMAGES" }
  | { type: "UNHIDE_IMAGES" }
  | { type: "SET_MONOCHROME" }
  | { type: "UNSET_MONOCHROME" }
  | { type: "SET_HIGH_CONTRAST" }
  | { type: "UNSET_HIGH_CONTRAST" }
  | { type: "SET_LOW_CONTRAST" }
  | { type: "UNSET_LOW_CONTRAST" }
  | { type: "RESET_SETTINGS" };

export default function reducer(
  state: GlobalState,
  action: Action,
): GlobalState {
  switch (action.type) {
    case "OPEN_WIDGET":
      return { ...state, widgetOpen: true };
    case "CLOSE_WIDGET":
      return { ...state, widgetOpen: false };
    case "HYDRATE_STATE":
      return { ...state, ...action.data, widgetOpen: false };
    case "SET_FONT_COLOR":
      return { ...state, fontColor: action.data };
    case "ADD_FONT_SIZE":
      return { ...state, fontSizeAdjustment: state.fontSizeAdjustment + 10 };
    case "MINUS_FONT_SIZE":
      return { ...state, fontSizeAdjustment: state.fontSizeAdjustment - 10 };
    case "ADD_LINE_HEIGHT":
      return { ...state, lineHeight: state.lineHeight + 5 };
    case "MINUS_LINE_HEIGHT":
      return { ...state, lineHeight: state.lineHeight - 5 };
    case "ADD_LETTER_SPACING":
      return { ...state, letterSpacing: state.letterSpacing + 10 };
    case "MINUS_LETTER_SPACING":
      return { ...state, letterSpacing: state.letterSpacing - 10 };
    case "TOGGLE_BOLD":
      return { ...state, textBold: !state.textBold };
    case "TOGGLE_ITALIC":
      return { ...state, textItalic: !state.textItalic };
    case "SET_TEXT_CASE":
      return { ...state, textCase: action.data };
    case "SET_TEXT_ALIGNMENT":
      return { ...state, textAlignment: action.data };
    case "SET_TITLE_COLOR":
      return { ...state, titleColor: action.data };
    case "SET_TITLE_BACKGROUND_COLOR":
      return { ...state, titleBackgroundColor: action.data };
    case "SET_HIGHLIGHT_TITLES":
      return { ...state, highlightTitles: true };
    case "UNSET_HIGHLIGHT_TITLES":
      return { ...state, highlightTitles: false };
    case "SET_HIGHLIGHT_LINKS":
      return { ...state, highlightLinks: true };
    case "UNSET_HIGHLIGHT_LINKS":
      return { ...state, highlightLinks: false };
    case "HIDE_IMAGES":
      return { ...state, hideImages: true };
    case "UNHIDE_IMAGES":
      return { ...state, hideImages: false };
    case "SET_MONOCHROME":
      return {
        ...state,
        highContrast: false,
        lowContrast: false,
        monochrome: true,
      };
    case "UNSET_MONOCHROME":
      return { ...state, monochrome: false };
    case "SET_HIGH_CONTRAST":
      return {
        ...state,
        monochrome: false,
        lowContrast: false,
        highContrast: true,
      };
    case "UNSET_HIGH_CONTRAST":
      return { ...state, highContrast: false };
    case "SET_LOW_CONTRAST":
      return {
        ...state,
        monochrome: false,
        highContrast: false,
        lowContrast: true,
      };
    case "UNSET_LOW_CONTRAST":
      return { ...state, lowContrast: false };
    case "RESET_SETTINGS":
      return { ...initialState, widgetOpen: true };
    default:
      return state;
  }
}
