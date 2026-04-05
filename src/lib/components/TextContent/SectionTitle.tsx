import React, { ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return <h4 className="a11y-panel-section-title">{children}</h4>;
}
