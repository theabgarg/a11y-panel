import React, { useState } from "react";
import HideImages from "./ConfigComponents/HideImages";
import FontColor from "./ConfigComponents/FontColor";
import SectionTitle from "./TextContent/SectionTitle";
import FontSize from "./ConfigComponents/FontSize";
import LineHeight from "./ConfigComponents/LineHeight";
import LetterSpacing from "./ConfigComponents/LetterSpacing";
import HighlightLinks from "./ConfigComponents/HighlightLinks";
import TitleBackgroundColor from "./ConfigComponents/TitleBackgroundColor";
import Monochrome from "./ConfigComponents/Monochrome";
import HighlightTitles from "./ConfigComponents/HighlightTitles";
import TextCase from "./ConfigComponents/TextCase";
import TitleColor from "./ConfigComponents/TitleColor";
import FontButtons from "./ConfigComponents/FontButtons";
import HighContrast from "./ConfigComponents/HighContrast";
import LowContrast from "./ConfigComponents/LowContrast";

type TabKey = "Typography" | "Colors" | "Display";

const tabs: TabKey[] = ["Typography", "Colors", "Display"];

export default function StyleSettings() {
  const [activeTab, setActiveTab] = useState<TabKey>("Typography");

  return (
    <div className="a11y-panel-settings">
      <div className="a11y-panel-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`a11y-tab-${tab.toLowerCase()}`}
            role="tab"
            type="button"
            className={`a11y-panel-tab${activeTab === tab ? " is-active" : ""}`}
            aria-selected={activeTab === tab}
            aria-controls={`a11y-tabpanel-${tab.toLowerCase()}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        id={`a11y-tabpanel-${activeTab.toLowerCase()}`}
        role="tabpanel"
        aria-labelledby={`a11y-tab-${activeTab.toLowerCase()}`}
        className="a11y-panel-tabpanel"
      >
        {activeTab === "Typography" && (
          <>
            <SectionTitle>Type & emphasis</SectionTitle>
            <div className="a11y-panel-inline-section">
              <FontSize />
              <LineHeight />
              <LetterSpacing />
            </div>
            <div className="a11y-panel-inline-section">
              <TextCase />
              <FontButtons />
            </div>
          </>
        )}

        {activeTab === "Colors" && (
          <>
            <SectionTitle>Text & headings</SectionTitle>
            <div className="a11y-panel-inline-section">
              <FontColor />
              <TitleColor />
              <TitleBackgroundColor />
            </div>
          </>
        )}

        {activeTab === "Display" && (
          <>
            <SectionTitle>Focus & visibility</SectionTitle>
            <div className="a11y-panel-inline-section">
              <HighlightTitles />
              <HighlightLinks />
              <HideImages />
              <Monochrome />
              <HighContrast />
              <LowContrast />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
