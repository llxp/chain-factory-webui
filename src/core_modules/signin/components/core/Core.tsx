import React from "react";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import { SignIn } from "../signin/SignIn";
import { selectLoggedIn } from "../signin/SignInSlice";
import { Profile } from "../profile/Profile";

function DisplaySignInOrSignOut() {
  const loggedIn = useSelector(selectLoggedIn);
  return !loggedIn ? <SignIn/> : <Profile/>;
}

export function CoreComponent() {
  return (
    <SnackbarProvider maxSnack={3}>
      <DisplaySignInOrSignOut/>
    </SnackbarProvider>
  );
}
