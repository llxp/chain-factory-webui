import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../store";

interface IReduxProviderWrapperProps {}
export default function ReduxProviderWrapper(props: React.PropsWithChildren<IReduxProviderWrapperProps>) {
  return <Provider store={store}>{props.children}</Provider>;
}