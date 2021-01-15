import { FitchCredentialsWrapper } from './../../../../site_modules/access/wrappers/FitchCredentialsWrapper';
import { Fitch, JsonObject } from "@fiizy/fitch";
import { Action, createSlice, PayloadAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { environment } from "../core/environment";
import { AppThunk, RootState } from "../../../../store";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";

const apiService = new FitchCredentialsWrapper(environment.apiEndpoint);

export interface UserInformation {
  login_name: string;
  username: string;
  object_sid: string;
}

interface LoginState {
  userInformation: UserInformation | null;
}

const initialState: LoginState = {
  userInformation: null
};

export const signInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserInformation: (state, action: PayloadAction<UserInformation | null>) => {
      state.userInformation = action.payload;
    },
  },
});

export const { setUserInformation } = signInSlice.actions;

export const getUserInformation = (): ThunkAction<Promise<boolean>, RootState, undefined, any> => {
  return (dispatch, getState) => {
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      return apiService.get<UserInformation>('/api/login/user_profile', token).then(
        (data: UserInformation) => {
          dispatch(setUserInformation(data));
          return true;
        },
        () => {
          console.log('error signing in');
          dispatch(setUserInformation(null));
          return false;
        }
      );
    }
    return new Promise<boolean>(() => false);
  }
};

export const selectUserInformation = (state: RootState) => state.profile.userInformation;

export const ProfileSlice = signInSlice.reducer;