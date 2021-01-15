import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { ReducerMap as ReducerMapSite } from './site_modules';
import { ReducerMap as ReducerMapCore } from './core_modules';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const peristedState = loadState();

export const store = configureStore({
  preloadedState: peristedState,
  reducer: {
    ...ReducerMapCore,
    ...ReducerMapSite
  },
});

const saveState = (state) => {
  try {
    console.log('saveState');
    console.log(state);
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
