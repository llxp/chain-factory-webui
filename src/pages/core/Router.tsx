import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Dashboard from "../dashboard";
import New from "../new";
import Workflows from "../workflows";
import SignIn from "../signin";

export function Routes() {
  return (
    <>
      <Route exact path="/">
        <Redirect to="/orchestrator" />
      </Route>
      <Route exact path="/orchestrator">
        <Redirect to="/orchestrator/dashboard" />
      </Route>
      <Switch>
        <Route path="/signin" component={SignIn} key="/signin"/>
        <Route path="/orchestrator/new" component={New} key="/orchestrator/new"/>
        <Route path="/orchestrator/dashboard" component={Dashboard} key="/orchestrator/dashboard"/>
        <Route path="/orchestrator/workflows" component={Workflows} key="/orchestrator/workflows"/>
      </Switch>
    </>
  )
}