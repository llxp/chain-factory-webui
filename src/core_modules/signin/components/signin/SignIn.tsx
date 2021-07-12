import { Button, createStyles, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, TextField, Theme } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { signInAsync, useReduxDispatch } from './SignInSlice';
import clsx from 'clsx';

export function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
          }, 1000);
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

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: '25ch',
      },
      center: {
        left: 'auto',
        right: 'auto'
      }
    }),
  );

  const classes = useStyles();

  return (
    <Grid container className={classes.root} justifyContent="center" alignItems="center">
      <form className={classes.center} onSubmit={ e => onSubmit(e) }>
      <TextField
        aria-label="Login Username"
        label="username"
        variant="filled"
        value={username}
        onChange={handleUsernameChange}
      />
      <br/>
      <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      <br/>
      <br/>
      <br/>
      <Button type="submit" variant="contained" color="primary">SignIn</Button>
    </form>
    </Grid>
  );
}
