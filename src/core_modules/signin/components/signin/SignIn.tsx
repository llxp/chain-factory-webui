import { Button, Input, TextField } from "@material-ui/core";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { Component } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signInAsync, useReduxDispatch } from './SignInSlice';

export function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useReduxDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  
  const action = key => (
    <Button onClick={() => { closeSnackbar(key) }}>
      Dismiss
    </Button>
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInAsync(username, password))
    .then(
      (success: boolean) => {
        console.log('1');
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
      },
      () => {
        enqueueSnackbar(
          'Error Signing in!',
          {
            variant: 'error',
            autoHideDuration: 3000,
            action
          }
        );
      }
    );
  };

  return (
      <form className="Center" onSubmit={ e => onSubmit(e) }>
      <TextField aria-label="Login Username" label="username" variant="filled" value={username} onChange={e => setUsername(e.target.value)} id="loginUsername"/>
      <br/>
      <br/>
      <TextField aria-label="Login Password" label="password" variant="filled" value={password} onChange={e => setPassword(e.target.value)} id="loginPassword"/>
      <br/>
      <br/>
      <br/>
      <Button type="submit" variant="contained" color="primary">SignIn</Button>
    </form>
  );
}
