import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Component } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signOutAsync, useReduxDispatch } from "../signin/SignInSlice";
import { getUserInformation, selectUserInformation } from "./ProfileSlice";

export function Profile() {
  const reduxDispatch = useReduxDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const action = key => (
    <Button onClick={() => { closeSnackbar(key) }}>
      Dismiss
    </Button>
  );

  useEffect(() => {
    reduxDispatch(getUserInformation());
  });

  const userInformation = useSelector(selectUserInformation);

  const handleClick = () => {
    reduxDispatch(signOutAsync()).then((success: boolean) => {
      enqueueSnackbar(
        success ? 'Signin successful!' : 'Error Signing in!',
        {
          variant: success ? 'success' : 'error',
          autoHideDuration: 3000,
          action
        }
      );
      if (success) {
        setTimeout(() => {
          // forward to default page on success
          history.push('/');
        }, 3000);
      }
    });
  };
  return (
    <div>
      <Button onClick={handleClick}>Signout</Button>
      <p>{userInformation?.username}</p>
    </div>
  );
};
