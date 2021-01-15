import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Header } from "./Header";
import { BasicRoutes, RouterRoutes } from "./Router";
import { selectLoggedIn } from "../../../signin/components/signin/SignInSlice";

function RedirectOnSignout() {
  const loggedIn = useSelector(selectLoggedIn);
  const history = useHistory();
  if (!loggedIn) {
    history.push('/signin');
  }
  return <></>;
}

export function Content() {
  return (
    <>
    <Header/>
    <RedirectOnSignout/>
    <BasicRoutes/>
    <RouterRoutes/>
    </>
  );
}
