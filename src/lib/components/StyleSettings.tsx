import React, { useState } from "react";
import HideImages from "./ConfigComponents/HideImages";
import FontColor from "./ConfigComponents/FontColor";
import styled from "styled-components";
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
    <Container>
      <TabBar role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            id={`a11y-tab-${tab.toLowerCase()}`}
            role="tab"
            type="button"
            $active={activeTab === tab}
            aria-selected={activeTab === tab}
            aria-controls={`a11y-tabpanel-${tab.toLowerCase()}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabBar>

      <TabPanel
        id={`a11y-tabpanel-${activeTab.toLowerCase()}`}
        role="tabpanel"
        aria-labelledby={`a11y-tab-${activeTab.toLowerCase()}`}
      >
        {activeTab === "Typography" && (
          <>
            <SectionTitle>Type & emphasis</SectionTitle>
            <InlineSection>
              <FontSize />
              <LineHeight />
              <LetterSpacing />
            </InlineSection>
            <InlineSection>
              <TextCase />
              <FontButtons />
            </InlineSection>
          </>
        )}

        {activeTab === "Colors" && (
          <>
            <SectionTitle>Text & headings</SectionTitle>
            <InlineSection>
              <FontColor />
              <TitleColor />
              <TitleBackgroundColor />
            </InlineSection>
          </>
        )}

        {activeTab === "Display" && (
          <>
            <SectionTitle>Focus & visibility</SectionTitle>
            <InlineSection>
              <HighlightTitles />
              <HighlightLinks />
              <HideImages />
              <Monochrome />
              <HighContrast />
              <LowContrast />
            </InlineSection>
          </>
        )}
      </TabPanel>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const TabBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $active, theme }) => ($active ? theme.primary : "#eef2f7")};
  color: ${({ $active, theme }) =>
    $active ? theme.iconColor || "#ffffff" : theme.text};
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InlineSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
