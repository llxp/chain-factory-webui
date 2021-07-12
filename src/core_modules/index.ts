import { ReducerMap as ReducerMapSignIn } from "./signin";

import { MenuItem } from "../models/MenuItem";
import { SignIn, routes as signInRoutes } from "./signin";

export const ReducerMap = {
  ...ReducerMapSignIn,
};

export const modules: Array<MenuItem> = [
  {
    text: "",
    path: "/signin",
    element: SignIn,
    menuItems: signInRoutes
  }

  // core will be not in the list,
  // because core is the module
  // to load all other modules
];
