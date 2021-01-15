import React from "react";
import { Route, Switch, useLocation } from "react-router";
import { Location } from 'history';
import { routes } from "./routes";
import { SnackbarProvider } from "notistack";

function currentPath(location: Location<unknown>) {
  const splittedPathname = location.pathname.split("/");
  if (splittedPathname.length > 1) {
    return "/" + splittedPathname[1];
  }
  return "/";
}

function RouterRoutesComponent() {
  const location = useLocation();
  const list: Array<JSX.Element> = [];
  for (const route of routes) {
    const path = currentPath(location) + route.path;
    list.push(<Route exact path={path} component={route.element} />);
  }
  return <Switch>{list}</Switch>;
}


export function Core() {
  return (
    <>
      <SnackbarProvider maxSnack={1000}>
        <RouterRoutesComponent/>
      </SnackbarProvider>
    </>
  );
};
