import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { modules } from "../../../../modules";


interface IRouterProps { }
export default function RouterWrapper(props: React.PropsWithChildren<IRouterProps>) {
  return (
    <BrowserRouter>
    {props.children}
    </BrowserRouter>
  );
}

export function RouterRoutes() {
  const list: Array<JSX.Element> = modules.map((route) => <Route path={route.path} component={route.element} key={route.path}/>);
  return <Switch>{list}</Switch>;
}

export function BasicRoutes() {
  return (
    <>
      <Route exact path="/">
        <Redirect to="/orchestrator" />
      </Route>
    </>
  )
}