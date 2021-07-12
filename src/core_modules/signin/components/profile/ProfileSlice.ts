import { FitchCredentialsWrapper } from './../../../../site_modules/orchestrator/wrappers/FitchCredentialsWrapper';
import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { environment } from "../core/environment";
import { RootState, store } from "../../../../store";
import { signOutAsync } from '../signin/SignInSlice';

// api service to be used inside the async thunks
const redirectCallback: { (): void } = () => {
  store.dispatch(signOutAsync());
};
const apiService = new FitchCredentialsWrapper(environment.apiEndpoint, redirectCallback);

// state type
// --------
export interface UserInformation {
  login_name: string;
  username: string;
  object_sid: string;
}

interface ProfileState {
  userInformation: UserInformation | null;
}
// --------
// state type

// initial state
// --------
const initialState: ProfileState = {
  userInformation: null
};
// --------
// initial state

// slice
// --------
export const signInSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserInformation: (state, action: PayloadAction<UserInformation | null>) => {
      state.userInformation = action.payload;
    },
  },
});
// --------
// slice

// export reducers
// --------
export const { setUserInformation } = signInSlice.actions;
// --------
// export reducers

// async thunks
// --------
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
          dispatch(setUserInformation(null));
          return false;
        }
      );
    }
    return new Promise<boolean>(() => false);
  }
};
// --------
// async thunks

// selectors
// --------
export const selectUserInformation = (state: RootState) => state.profile.userInformation;
// --------
// selectors

// reducer export
export const ProfileSlice = signInSlice.reducer;