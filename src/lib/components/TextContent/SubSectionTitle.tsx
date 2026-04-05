import React, { ReactNode } from "react";

export default function SubSectionTitle({ children }: { children: ReactNode }) {
  return <h5 className="a11y-panel-subsection-title">{children}</h5>;
}
