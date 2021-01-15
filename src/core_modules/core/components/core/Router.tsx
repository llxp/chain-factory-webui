import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { modules } from "../../../../modules";


interface RouterProps { }
export function RouterWrapper(props: React.PropsWithChildren<RouterProps>) {
  return (
    <BrowserRouter>
    {props.children}
    </BrowserRouter>
  );
}

export function RouterRoutes() {
  const list: Array<JSX.Element> = [];
  for (const route of modules) {
    list.push(<Route path={route.path} component={route.element} />);
  }
  return <Switch>{list}</Switch>;
}

export function BasicRoutes() {
  return (
    <>
      <Route exact path="/">
        <Redirect to="/access" />
      </Route>
    </>
  )
}