import React from "react";
import { ResponsiveAppBar } from "../toolbar/ResponsiveAppBar";
import { modules } from "../../../../modules";

export function Header() {
  return (
    <header style={{ height: 60 }}>
      <ResponsiveAppBar sites={modules}/>
    </header>
  );
}