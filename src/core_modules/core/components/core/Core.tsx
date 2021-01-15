import React from "react";

import "./style/Core.css";
import { ProviderWrapper } from './Redux';
import { RouterWrapper } from "./Router";
import { Content } from "./Content";

export function Core() {
  return (
    <RouterWrapper>
      <ProviderWrapper>
        <Content/>
      </ProviderWrapper>
    </RouterWrapper>
  );
}
