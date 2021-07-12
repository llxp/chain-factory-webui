import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
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

const combinedReducer = combineReducers({
  ...ReducerMapCore,
  ...ReducerMapSite
});

const rootReducer = (state, action) => {
  if (action.type === 'signin/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  preloadedState: peristedState,
  reducer: rootReducer
});

const saveState = (state) => {
  try {
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
