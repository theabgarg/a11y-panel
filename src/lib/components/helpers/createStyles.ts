import { GlobalState } from "../Context/initialState";

const widgetExclusion = ":not(.a11y-widget):not(.a11y-widget *)";
const textSelectors = `body${widgetExclusion}, body *${widgetExclusion}`;
const headingSelectors = ["h1", "h2", "h3", "h4", "h5", "h6"]
  .map((selector) => `${selector}${widgetExclusion}`)
  .join(", ");
const contentSelectors = [
  "p",
  "span",
  "a",
  "button",
  "li",
  "ol",
  "ul",
  "label",
  "input",
  "textarea",
  "select",
  "blockquote",
  "figcaption",
  "td",
  "th",
]
  .map((selector) => `${selector}${widgetExclusion}`)
  .join(", ");
const filterSelectors = `${headingSelectors}, ${contentSelectors}, img${widgetExclusion}`;

export default function createStyles(globalState: GlobalState) {
  const {
    fontColor,
    fontSizeAdjustment,
    lineHeight,
    titleColor,
    textItalic,
    letterSpacing,
    textBold,
    textCase,
    titleBackgroundColor,
    highlightTitles,
    highlightLinks,
    hideImages,
    textAlignment,
    monochrome,
    highContrast,
    lowContrast,
  } = globalState;

  const contrastFilter = monochrome
    ? "grayscale(1)"
    : highContrast
      ? "contrast(1.4)"
      : lowContrast
        ? "contrast(0.75)"
        : "";

  const fontScale = Math.max(0.1, 1 + fontSizeAdjustment / 100);
  const contentLineHeight = lineHeight ? 1.5 + lineHeight / 100 : 0;
  const headingLineHeight = lineHeight ? 1.3 + lineHeight / 100 : 0;
  const spacingAmount = letterSpacing ? `${letterSpacing / 20}px` : "";

  return `
    ${textSelectors} {
      ${fontColor ? `color: ${fontColor} !important;` : ""}
      ${textAlignment !== "initial" ? `text-align: ${textAlignment} !important;` : ""}
      ${textBold ? "font-weight: 700 !important;" : ""}
      ${textItalic ? "font-style: italic !important;" : ""}
      ${textCase !== "initial" ? `text-transform: ${textCase} !important;` : ""}
    }

    img${widgetExclusion} {
      ${hideImages ? "display: none !important;" : ""}
    }

    a${widgetExclusion} {
      ${
        highlightLinks
          ? "background-color: #fff59d !important; color: #111827 !important; border-radius: 4px !important; box-shadow: 0 0 0 2px #111827 inset !important; padding: 2px 4px !important;"
          : ""
      }
    }

    ${headingSelectors} {
      ${
        highlightTitles
          ? `box-shadow: 0 0 0 2px #111827 inset !important; background-color: ${titleBackgroundColor || "#fff59d"} !important; color: ${titleColor || fontColor || "#111827"} !important; padding: 4px 8px !important; border-radius: 6px !important;`
          : ""
      }
      ${titleColor ? `color: ${titleColor} !important;` : ""}
      ${titleBackgroundColor ? `background-color: ${titleBackgroundColor} !important; padding: 4px 8px !important; border-radius: 6px !important;` : ""}
      ${fontSizeAdjustment !== 0 ? `font-size: calc(1em * ${fontScale}) !important;` : ""}
      ${headingLineHeight ? `line-height: ${headingLineHeight} !important;` : ""}
      ${spacingAmount ? `letter-spacing: ${spacingAmount} !important;` : ""}
    }

    ${contentSelectors} {
      ${fontSizeAdjustment !== 0 ? `font-size: calc(1em * ${fontScale}) !important;` : ""}
      ${contentLineHeight ? `line-height: ${contentLineHeight} !important;` : ""}
      ${spacingAmount ? `letter-spacing: ${spacingAmount} !important;` : ""}
    }

    ${filterSelectors} {
      ${contrastFilter ? `filter: ${contrastFilter} !important;` : ""}
    }
  `;
}
