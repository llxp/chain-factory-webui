import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../store";

interface ProviderProps {}
export function ProviderWrapper(props: React.PropsWithChildren<ProviderProps>) {
  return <Provider store={store}>{props.children}</Provider>;
}