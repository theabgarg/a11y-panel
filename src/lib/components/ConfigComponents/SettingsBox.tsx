import React, { ReactNode } from "react";
import SubSectionTitle from "../TextContent/SubSectionTitle";

interface SettingsBoxProps {
  title: string;
  children: ReactNode;
}

export default function SettingsBox({ title, children }: SettingsBoxProps) {
  return (
    <div className="a11y-panel-settings-box">
      <SubSectionTitle>{title}</SubSectionTitle>
      <div className="a11y-panel-settings-box__content">{children}</div>
    </div>
  );
}
