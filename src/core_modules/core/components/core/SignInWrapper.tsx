import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { store } from "../../../../store";
import { selectLoggedIn } from "../../../signin/components/signin/SignInSlice";
import { Header } from "./Header";

function SignInCheckComponent(history, location) {
  const loggedIn = store.getState().signin.loggedIn;
  if (!loggedIn && location.pathname !== '/signin') {
    history.push('/signin');
  }
  if (loggedIn && location.pathname === '/signin') {
    history.push('/signin/profile');
  }
}

export default function SignInWrapper() {
  const loggedIn = useSelector(selectLoggedIn);
  const history = useHistory();
  history.listen((location) => {
    SignInCheckComponent(history, location);
  });
  if (!loggedIn && history.location.pathname !== '/signin') {
    return (<><Header/><Redirect to="/signin"/></>);
  }
  return <></>;
}