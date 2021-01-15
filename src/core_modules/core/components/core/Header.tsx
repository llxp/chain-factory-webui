import React from "react";
import { ResponsiveAppBar } from "../toolbar/ResponsiveAppBar";
import { modules } from "../../../../modules";

export function Header() {
  return (
    <header className="App-header">
      <ResponsiveAppBar sites={modules}/>
    </header>
  );
}