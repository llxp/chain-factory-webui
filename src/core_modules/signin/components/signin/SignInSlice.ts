import { Fitch, JsonObject } from "@fiizy/fitch";
import { Action, createSlice, PayloadAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { environment } from "../core/environment";
import { AppThunk, RootState } from "../../../../store";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";

const apiService = new Fitch({
  baseURL: environment.apiEndpoint,
  headers: { 'accept-encoding': 'gzip' }
});

interface LoginState {
  token: string;
  loggedIn: boolean;
}

const initialState: LoginState = {
  token: '',
  loggedIn: false
};

export const signInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    }
  },
});

export const { setLoggedIn } = signInSlice.actions;

const setToken = signInSlice.actions.setToken;

export const signInAsync = (username: string, password: string): ThunkAction<Promise<boolean>, RootState, undefined, any> => (dispatch) => {
  return apiService.post<string>('/api/login/login', {username, password}).then(
    (data: string) => {
      console.log('token: ' + data);
      dispatch(setToken(data));
      dispatch(setLoggedIn(true));
      return true;
    },
    () => {
      console.log('error signing in');
      dispatch(setLoggedIn(false));
      return false;
    }
  );
};

export const signOutAsync = (): ThunkAction<Promise<boolean>, RootState, undefined, any> => {
  return (dispatch) => {
    dispatch(setToken(''));
    dispatch(setLoggedIn(false));
    return new Promise<boolean>(() => true);
  }
}

export const selectToken = (state: RootState) => state.signin.token;
export const selectLoggedIn = (state: RootState) => state.signin.loggedIn;

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;
export function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}

export const SignInSlice = signInSlice.reducer;