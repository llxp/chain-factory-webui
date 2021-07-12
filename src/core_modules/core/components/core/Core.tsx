import React from "react";

import "./Core.css";
import ReduxProviderWrapper from './ReduxProviderWrapper';
import RouterWrapper from "./Router";
import Content from "./Content";
import QueryWrapper from "./Query";
import SignInWrapper from "./SignInWrapper";

export function Core() {
  return (
    <ReduxProviderWrapper>
      <RouterWrapper>
        <QueryWrapper>
          <SignInWrapper/>
          <Content/>
        </QueryWrapper>
      </RouterWrapper>
    </ReduxProviderWrapper>
  );
}
