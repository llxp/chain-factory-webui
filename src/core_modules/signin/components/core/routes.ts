import { MenuItem } from "../../../../models/MenuItem";
import React from "react";
import { SignIn } from "../signin/SignIn";

export const routes: Array<MenuItem> = [
  {
    text: "",
    path: "/",
    element: SignIn
  }
];
