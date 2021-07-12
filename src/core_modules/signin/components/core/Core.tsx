import React from "react";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import { SignIn } from "../signin/SignIn";
import { selectLoggedIn } from "../signin/SignInSlice";
import { ProfileOverview } from "../profile/ProfileOverview";

function DisplaySignInOrSignOut() {
  const loggedIn = useSelector(selectLoggedIn);
  return !loggedIn ? <SignIn/> : <ProfileOverview/>;
}

export function CoreComponent() {
  return (
    <SnackbarProvider maxSnack={3}>
      <DisplaySignInOrSignOut/>
    </SnackbarProvider>
  );
}
